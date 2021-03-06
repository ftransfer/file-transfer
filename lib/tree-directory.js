const constants = {
  DIRECTORY: "directory",
  FILE: "file",
};

function safeReadDirSync(FS, path) {
  let dirData = {};
  try {
    dirData = FS.readdirSync(path);
  } catch (ex) {
    if (ex.code == "EACCES" || ex.code == "EPERM") {
      //User does not have permissions, ignore directory
      return null;
    } else throw ex;
  }
  return dirData;
}

function normalizePath(path) {
  return path.replace(/\\/g, "/");
}

function isRegExp(regExp) {
  return typeof regExp === "object" && regExp.constructor == RegExp;
}

function directoryTree(
  FS,
  PATH,
  path,
  options,
  onEachFile,
  onEachDirectory,
  curDepth = 0
) {
  const name = PATH.basename(path);
  path = options && options.normalizePath ? normalizePath(path) : path;
  const item = { path, name };
  let stats;

  try {
    stats = FS.statSync(path);
  } catch (e) {
    return null;
  }

  // Skip if it matches the exclude regex
  if (options && options.exclude) {
    const excludes = isRegExp(options.exclude)
      ? [options.exclude]
      : options.exclude;
    if (excludes.some((exclusion) => exclusion.test(path))) {
      return null;
    }
  }

  if (stats.isFile()) {
    const ext = PATH.extname(path).toLowerCase();
    // Skip if it does not match the extension regex
    if (options && options.extensions && !options.extensions.test(ext))
      return null;
    item.size = stats.size; // File size in bytes
    item.extension = ext;
    item.type = constants.FILE;
    if (options && options.attributes) {
      options.attributes.forEach((attribute) => {
        item[attribute] = stats[attribute];
      });
    }
    if (onEachFile) {
      onEachFile(item, path, stats);
    }
  } else if (stats.isDirectory()) {
    let dirData = safeReadDirSync(FS, path);
    if (dirData === null) return null;

    if (options && options.attributes) {
      options.attributes.forEach((attribute) => {
        item[attribute] = stats[attribute];
      });
    }

    if (curDepth < options.depth) {
      item.children = dirData
        .map((child) =>
          directoryTree(
            FS,
            PATH,
            PATH.join(path, child),
            options,
            onEachFile,
            onEachDirectory,
            curDepth + 1
          )
        )
        .filter((e) => !!e);
    }
    // item.size = item.children.reduce((prev, cur) => prev + cur.size, 0);
    item.size = "";
    item.type = constants.DIRECTORY;
    if (onEachDirectory) {
      onEachDirectory(item, path, stats);
    }
  } else {
    return null; // Or set item.size = 0 for devices, FIFO and sockets ?
  }
  return item;
}

function removeFiles(children) {
  return children.filter((child) => {
    if (child.children) child.children = removeFiles(child.children);
    return child.type == constants.DIRECTORY;
  });
}

function readDirTree(FS, PATH, path, options, onEachFile, onEachDirectory) {
  if (options && !options.depth) options.depth = 10;
  else options = { depth: 10 };

  let tree = directoryTree(
    FS,
    PATH,
    path,
    options,
    onEachFile,
    onEachDirectory
  );
  //   console.log(tree);
  if (tree.children) tree.children = removeFiles(tree.children);
  return tree;
}

export default directoryTree;
export { readDirTree };
