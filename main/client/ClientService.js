import { ipcMain } from "electron";
import Hapi from "@hapi/hapi";
import os from "os";
import log from "electron-log";

import Client from "./Client";
import { Namming } from "../helpers/ipc";

import fs from "fs";
import path from "path";

import { readDirTree, readChildren } from "../../lib/tree-directory";

class ClientService {
  constructor(isProd) {
    this.isProd = isProd;
    this.clientApp;
    this.server;
    this.isServerRunning = false;
    this.addresses = [];
  }

  async createClient() {
    try {
      this.clientApp = await Client(!this.isProd);
    } catch (error) {
      log.error("failure to reate client: " + error);
    }
  }

  async start(event, arg) {
    if (!this.clientApp) await this.createClient();

    if (!this.clientApp) {
      log.error("clientApp not initialize");
      return;
    }

    this.server = Hapi.server({
      port: arg.port,
      host: "0.0.0.0",
      routes: {
        files: {
          relativeTo: arg.sourceDir,
        },
      },
    });

    this.server.route({
      method: "GET",
      path: "/__api__/__",
      handler: async (request, h) => {
        return readDirTree(fs, path, arg.sourceDir);
      },
    });

    this.server.route({
      method: "GET",
      path: "/__api__/__/files/{param*}",
      handler: async (request, h) => {
        let dirPath = [];

        if (request.params.param) dirPath = request.params.param.split("/");
        const finalpath = arg.sourceDir + "\\" + dirPath.join("\\");
        const files = readChildren(fs, path, finalpath, { ...arg, depth: 1 });

        return files;
      },
    });

    this.server.route({
      method: "GET",
      path: "/__api__/__/file/{param*}",
      handler: async (request, h) => {
        return h.file(request.params.param);
      },
    });

    this.server.route({
      method: "GET",
      path: "/__api__/__/download/{param*}",
      handler: async (request, h) => {
        return h
          .file(request.params.param)
          .header("Content-Type", "application/octet-stream")
          .header("Content-disposition", "attachment");
      },
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

    this.server.route({
      method: "POST",
      path: "/__api__/__/dir/{param*}",
      handler: async (request, h) => {
        let dirPath = [];

        if (request.params.param) dirPath = request.params.param.split("/");
        const finalpath = arg.sourceDir + "\\" + dirPath.join("\\");
        if (!fs.existsSync(finalpath)) fs.mkdirSync(finalpath);
        return "OK";
      },
    });

    this.server.route({
      method: "POST",
      path: "/__api__/__/upload/{param*}",
      handler: (request, h) => {
        const data = request.payload;

        if (data.file) {
          let name = data.file.hapi.filename;
          let dirPath = [];

          if (request.params.param) dirPath = request.params.param.split("/");
          let finalpath =
            arg.sourceDir + "\\" + dirPath.join("\\") + "\\" + name;

          if (fs.existsSync(finalpath)) {
            const ext = path.extname(finalpath);
            name = name.slice(0, -1 * ext.length) + "(1)" + ext;
            finalpath = arg.sourceDir + "\\" + dirPath.join("\\") + "\\" + name;
          }

          const file = fs.createWriteStream(finalpath);

          file.on("error", (err) => console.error(err));

          data.file.pipe(file);

          data.file.on("end", (err) => {
            const ret = {
              filename: data.file.hapi.filename,
              headers: data.file.hapi.headers,
            };
            return JSON.stringify(ret);
          });
        }
        return "ok";
      },
      config: {
        payload: {
          maxBytes: 10000 * 1024 * 1024, // 10GB
          timeout: false,
          output: "stream",
          parse: true,
          multipart: true,
        },
      },
    });

    await this.server.register(require("@hapi/inert"));

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
