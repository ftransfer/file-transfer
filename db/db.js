import Store from "electron-store";
import { app } from "electron";
import fs from "fs";

export default class Db {
  constructor() {
    this.store = new Store();
  }

  saveSourceDir(dir) {
    console.log("saved", dir, app.getPath("userData"));
    this.store.set("sourceDir", dir);
    console.log("saved", this.store.get("asd"));
  }

  getSourceDir() {
    let sourceDir = this.store.get("sourceDir");

    if (fs.existsSync(sourceDir)) return sourceDir;
    return app.getPath("documents");
  }
}
