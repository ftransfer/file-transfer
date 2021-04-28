const fs = require("fs");
const PATH = require("path");

const constants = {
  DIRECTORY: "directory",
  FILE: "file",
};

function createFileItem(path, type, modified, size, extension) {
  return {
    name: PATH.basename(path),
    path,
    size,
    type,
    extension,
    modified,
  };
}

function hasDirChild(path) {
  try {
    return fs.readdirSync(path).find((v) => {
      const stats = fs.statSync(PATH.join(path, v));
      return stats.isDirectory();
    })
      ? true
      : false;
  } catch (error) {
    return false;
  }
}

function directoryTree(path, options, curDeph = 0, cFile) {
  let stats;
  try {
    stats = fs.statSync(path);
  } catch (error) {
    return [];
  }

  const withFiles = options && options.opts && options.opts.viewFiles;

  if (stats.isFile() && withFiles) {
    const ext = PATH.extname(path).toLowerCase();
    return [
      createFileItem(
        path,
        constants.FILE,
        stats.mtime,
        stats.size,
        ext || ".file"
      ),
    ];
  } else if (stats.isDirectory()) {
    const fileNames = fs.readdirSync(path);
    const files = [];

    fileNames.forEach((name) => {
      const cPath = PATH.join(path, name);
      try {
        const cStats = fs.statSync(cPath);

        if (cStats.isFile() && withFiles) {
          const cExt = PATH.extname(cPath).toLowerCase();
          files.push(
            createFileItem(
              cPath,
              constants.FILE,
              cStats.mtime,
              cStats.size,
              cExt || ".file"
            )
          );
        } else if (cStats.isDirectory()) {
          if (cFile) cFile.hasDirChild = true;
          const file = createFileItem(
            cPath,
            constants.DIRECTORY,
            cStats.mtime,
            "",
            ""
          );

          file.hasDirChild = false;

          if (curDeph < options.depth)
            file.children = directoryTree(cPath, options, curDeph + 1, file);
          else file.hasDirChild = hasDirChild(cPath);

          files.push(file);
        }
      } catch (error) {
        console.log(error);
      }
    });
    return files;
  }

  return [];
}

export default function readDirTree(path, options) {
  if (options && !options.depth) options.depth = 0;
  else options = { ...options, depth: 0 };

  return directoryTree(path, options);
}
