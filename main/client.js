// const Hapi = require("@hapi/hapi");
const next = require("next");
const Path = require("path");
import { app } from "electron";

function devClient() {
  console.log("building client");
  const clientProject = Path.join(__dirname, "../", "client");

  const nextApp = next({
    dev: true,
    dir: clientProject,
    conf: { distDir: "_client" },
  });

  return new Promise((resolve, reject) => {
    nextApp.prepare().then(() => {
      console.log("client created");
      resolve(nextApp);
    });
  });
}

function prodClient() {
  const clientProject = Path.join(app.getAppPath(), "");
  const nextApp = next({
    dev: false,
    dir: clientProject,
    conf: { distDir: "_client" },
  });

  return new Promise((resolve, reject) => {
    // resolve(null);
    nextApp.prepare().then(() => {
      resolve(nextApp);
    });
  });
}

export default function client(dev) {
  return dev ? devClient() : prodClient();
}
