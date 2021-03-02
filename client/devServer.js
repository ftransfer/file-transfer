const next = require("next");
const Path = require("path");
const Hapi = require("@hapi/hapi");
const homedir = require("os").homedir();

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
