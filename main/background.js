import { app, ipcMain, dialog } from "electron";
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
let isServerRunning = false;
let addresses = [];
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
          { ...request.query, sourceDir: arg.sourceDir }
        )
      );
    },
  });

  await server.start();

  isServerRunning = true;
  let interfaces = os.networkInterfaces();
  addresses = [];
  addresses.push("localhost:" + arg.port);
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family === "IPv4" && !address.internal) {
        addresses.push(address.address + ":" + arg.port);
      }
    }
  }
  event.reply("server-created", addresses);
};

const stop = async (event) => {
  if (!server) {
    isServerRunning = false;
    event.reply("server-stoped");
    return;
  }

  await server.stop();
  isServerRunning = false;
  event.reply("server-stoped");
};

let mainWindow;

(async () => {
  await app.whenReady();

  clientApp = await client(!isProd);
  mainWindow = createWindow("main", {
    width: 1024,
    height: 768,
    backgroundColor: "#303030",
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    // mainWindow.webContents.openDevTools();
  }
})();

ipcMain.on("start-server", (event, arg) => {
  start(event, arg);
});

ipcMain.on("stop-server", (event) => {
  stop(event);
});

ipcMain.on("select-dir", (event, arg) => {
  let options = { properties: ["openDirectory"] };

  dialog.showOpenDialog(options).then((result) => {
    if (result.filePaths.length > 0)
      event.reply("dir-selected", {
        ...{ path: result.filePaths[0] },
        arg,
      });
  });
});

ipcMain.on("request-default-directory", (event, arg) => {
  let docUserDir = app.getPath("documents");
  let downloadUserDir = app.getPath("downloads");
  event.reply("on-default-directory", {
    sourceDir: docUserDir,
    uploadDir: downloadUserDir,
    isServerRunning,
    addresses,
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
