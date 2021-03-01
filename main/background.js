import { app } from "electron";
import serve from "electron-serve";
import { createWindow, MainEvent } from "./helpers";

import { ClientService } from "./client";

const isProd = process.env.NODE_ENV === "production";
let clientService = new ClientService(isProd);

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

process.on("unhandledRejection", (err) => {
  //   process.exit(1);
});

let mainWindow;

(async () => {
  await app.whenReady();

  await clientService.createClient();

  new MainEvent(clientService);

  clientService.registerListener();
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

app.on("window-all-closed", () => {
  app.quit();
});
