const Hapi = require("@hapi/hapi");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "client" });

const server = Hapi.server({
  port: 3000,
  host: "0.0.0.0",
});

app.prepare().then(async () => {
  server.route({
    method: "GET",
    path: "/{param*}",
    handler: async (request, h) => {
      return h.response(
        await app.render(
          request.raw.req,
          request.raw.res,
          `/${request.params.param}`,
          request.query
        )
      );
    },
  });
  await server.start();
  console.log("started");
});

process.on("unhandledRejection", (err) => {
  //   process.exit(1);
});
