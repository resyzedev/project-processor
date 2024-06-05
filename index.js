const fs = require("fs");
const path = require("path");

class ProjectProcessor {
  constructor(projectDir, additionalIgnores = []) {
    this.projectDir = projectDir;
    this.additionalIgnores = additionalIgnores;
    this.validExtensions = [".js", ".ts", ".jsx", ".tsx"];
    this.defaultIgnores = [
      "node_modules",
      "package-lock.json",
      ".gitignore",
      ".git",
      "logs",
      path.basename(__filename),
    ];
  }

  readFilesRecursively(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);

      if (this.shouldIgnore(file)) {
        return;
      }

      if (fs.statSync(filePath).isDirectory()) {
        fileList = this.readFilesRecursively(filePath, fileList);
      } else if (this.validExtensions.includes(path.extname(file))) {
        fileList.push(filePath);
      }
    });
    return fileList;
  }

  shouldIgnore(file) {
    return (
      this.defaultIgnores.includes(file) ||
      this.additionalIgnores.includes(file)
    );
  }

  formatFileContent(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");
    return `.\\${filePath}:\n\n${content}\n`;
  }

  generateOutput() {
    const fileList = this.readFilesRecursively(this.projectDir);
    const formattedContent = fileList
      .map((filePath) => this.formatFileContent(filePath))
      .join("\n");
    fs.writeFileSync("ProjectProcessor.log", formattedContent);
    console.log(
      "[ProjectProcessor] Project extracted to -> ProjectProcessor.log"
    );
  }
}

module.exports = ProjectProcessor;