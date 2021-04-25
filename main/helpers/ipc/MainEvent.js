import { app, ipcMain, dialog } from "electron";
import Namming from "./Namming";
import Db from "../../../db/db";

export default class MainEvent {
  constructor(clientService) {
    this.clientService = clientService;
    this.db = new Db();
    this.registerListener();
  }

  registerListener() {
    ipcMain.on(Namming.SELECT_DIR, (event, arg) => {
      let options = { properties: ["openDirectory"] };
      dialog.showOpenDialog(options).then((result) => {
        if (result.filePaths.length > 0) {
          this.db.saveSourceDir(result.filePaths[0]);
          event.reply(Namming.DIR_SELECTED, {
            ...{ path: result.filePaths[0] },
            arg,
          });
        }
      });
    });

    ipcMain.on(Namming.REQ_DEFAULT_DIR, (event, arg) => {
      let docUserDir = this.db.getSourceDir();
      let downloadUserDir = app.getPath("downloads");
      event.reply(Namming.ON_DEFAULT_DIR, {
        sourceDir: docUserDir,
        uploadDir: downloadUserDir,
        isServerRunning: this.clientService.isServerRunning,
        addresses: this.clientService.addresses,
      });
    });
  }
}
