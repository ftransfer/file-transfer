const next = require("next");
const Path = require("path");
const Hapi = require("@hapi/hapi");
const homedir = require("os").homedir();

const fs = require("fs");
const path = require("path");

const { readDirTree, readChildren } = require("../lib/tree-directory");

const clientProject = Path.join(__dirname);

const nextApp = next({
  dev: true,
  dir: clientProject,
  conf: { distDir: "_client" },
});

process.on("unhandledRejection", (err) => {
  //   process.exit(1);
});

nextApp.prepare().then(async () => {
  const server = Hapi.server({
    port: 3000,
    host: "0.0.0.0",
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
      console.log(finalpath);
      // const files = fs.readdirSync(finalpath);
      const files = readChildren(fs, path, finalpath, { depth: 1 });

      return files;
    },
  });

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: async (request, h) => {
      return h.response(
        await nextApp.render(
          request.raw.req,
          request.raw.res,
          `/${request.params.param}`,
          { ...request.query, sourceDir: homedir + "\\Documents" }
        )
      );
    },
  });
  await server.start();
  console.log("Running on: http://localhost:3000");
});
