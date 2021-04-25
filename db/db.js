import Store from "electron-store";
import { app } from "electron";
import fs from "fs";

export default class Db {
  constructor() {
    this.store = new Store();
  }

  saveSourceDir(dir) {
    this.store.set("sourceDir", dir);
  }

  getSourceDir() {
    let sourceDir = this.store.get("sourceDir");

    if (fs.existsSync(sourceDir)) return sourceDir;
    return app.getPath("documents");
  }
}
