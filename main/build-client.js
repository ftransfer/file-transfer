const copydir = require("copy-dir");
const Path = require("path");
const clientProject = Path.join(__dirname, "../", "client", "_client");
const dest = Path.join(__dirname, "../", "app", "_client");
console.log(clientProject);
console.log(dest);
copydir.sync(clientProject, dest, {});
