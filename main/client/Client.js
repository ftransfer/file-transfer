const next = require("next");
const Path = require("path");
import { app } from "electron";
const log = require("electron-log");

function devClient() {
  const clientProject = Path.join(__dirname, "../", "client");

  const nextApp = next({
    dev: true,
    dir: clientProject,
    conf: { distDir: "_client" },
  });

  return new Promise((resolve, reject) => {
    nextApp.prepare().then(() => {
      resolve(nextApp);
    });
  });
}

function prodClient(event) {
  const clientProject = Path.join(app.getAppPath(), "");
  const nextApp = next({
    dev: false,
    dir: clientProject,
    conf: { distDir: "_client" },
  });

  return new Promise((resolve, reject) => {
    nextApp
      .prepare()
      .then(() => {
        resolve(nextApp);
      })
      .catch((err) => {
        log.error("failed to create client: " + err);
      });
  });
}

export default function Client(dev, event) {
  return dev ? devClient() : prodClient(event);
}
