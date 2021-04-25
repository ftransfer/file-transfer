export default function LanguageCode(ext) {
  console.log(ext);
  switch (ext.toLowerCase()) {
    case "abnf":
      return "abnf";
    case "js":
    case "jsx":
      return "javascript";
    case "ts":
    case "tsx":
      return "typescript";
    case "kt":
      return "kotlin";
    case "md":
      return "markdown";
    case "txt":
    case "env":
      return "plaintext";
    case "sh":
      return "shell";
    case "jsh":
      return "java";
    default:
      return ext;
  }
}
