import { ipcMain } from "electron";
import Hapi from "@hapi/hapi";
import os from "os";
import log from "electron-log";

import Client from "./Client";
import { Namming } from "../helpers/ipc";

class ClientService {
  constructor(isProd) {
    this.isProd = isProd;
    this.clientApp;
    this.server;
    this.isServerRunning = false;
    this.addresses = [];
  }

  async createClient() {
    this.clientApp = await Client(!this.isProd);
    return this.clientApp;
  }

  async start(event, arg) {
    if (!this.clientApp) {
      log.error("clientApp not initialize");
      return;
    }

    this.server = Hapi.server({
      port: arg.port,
      host: "0.0.0.0",
    });

    this.server.route({
      method: "GET",
      path: "/{param*}",
      handler: async (request, h) => {
        try {
          return h.response(
            await this.clientApp.render(
              request.raw.req,
              request.raw.res,
              `/${request.params.param}`,
              { ...request.query, sourceDir: arg.sourceDir }
            )
          );
        } catch (error) {
          log.info("error building page: " + error);
          return h.response("Internal Server Error");
        }
      },
    });

    await this.server.start();

    this.isServerRunning = true;
    let interfaces = os.networkInterfaces();
    this.addresses = [];
    this.addresses.push("localhost:" + arg.port);
    for (var k in interfaces) {
      for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === "IPv4" && !address.internal) {
          this.addresses.push(address.address + ":" + arg.port);
        }
      }
    }
    event.reply(Namming.SERVER_CREATED, this.addresses);
  }

  async stop(event) {
    if (!this.server) {
      this.isServerRunning = false;
      event.reply(Namming.SERVER_STOPED);
      return;
    }

    await this.server.stop();
    this.isServerRunning = false;
    event.reply(Namming.SERVER_STOPED);
  }

  registerListener() {
    ipcMain.on(Namming.START_SERVER, (event, arg) => {
      this.start(event, arg);
    });

    ipcMain.on(Namming.STOP_SERVER, (event) => {
      this.stop(event);
    });
  }
}

export default ClientService;
