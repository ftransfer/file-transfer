import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

import client from "./client";

const Hapi = require("@hapi/hapi");
const next = require("next");

const Path = require("path");
const os = require("os");

const isProd = process.env.NODE_ENV === "production";
let clientApp;

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

process.on("unhandledRejection", (err) => {
  //   process.exit(1);
});

let server;
const start = async (event, arg) => {
  if (!clientApp) {
    console.log("clientApp not initialize");
    return;
  }

  server = Hapi.server({
    port: arg.port,
    host: "0.0.0.0",
  });

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: async (request, h) => {
      return h.response(
        await clientApp.render(
          request.raw.req,
          request.raw.res,
          `/${request.params.param}`,
          request.query
        )
      );
    },
  });
  await server.start();

  var interfaces = os.networkInterfaces();
  var addresses = [];
  addresses.push("localhost:" + arg.port);
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family === "IPv4" && !address.internal) {
        addresses.push(address.address + ":" + arg.port);
      }
    }
  }
  event.reply("server-created", `Server running at: ${addresses}`);
  console.log("Server running at:", server.info.uri);
  console.log("Server running at:", addresses);
};

const stop = async (event) => {
  if (!server) {
    event.reply("server-stoped");
    return;
  }

  await server.stop();
  event.reply("server-stoped");
};

(async () => {
  await app.whenReady();

  clientApp = await client(!isProd);

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

ipcMain.on("start-server", (event, arg) => {
  start(event, arg);
});

ipcMain.on("stop-server", (event) => {
  stop(event);
});

app.on("window-all-closed", () => {
  app.quit();
});
