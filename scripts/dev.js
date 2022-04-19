const readline = require("readline");
const TscWatchClient = require("tsc-watch/client");

const path = require("path");

const tsConfigPath = path.resolve(__dirname, "../tsconfig.json");
const serverPath = path.resolve(__dirname, "../dist/server.js");
const PORT = 5000;

const client = new TscWatchClient();

client.on("started", () => {
  console.log("Compilation started");
});

client.on("first_success", () => {
  console.log("Interactive mode");
  console.log('  Press "r" to re-run the onSuccess command, esc to exit.\n');
});

client.on("success", () => {
    console.log("Compiled successfully!");
});

client.on("compile_errors", () => {
    console.log("Compilation Error");
});

client.start(
  "--onSuccess",
  `cross-env PORT=${PORT} node ${serverPath}`,
  "--noClear",
  "--project",
  tsConfigPath,
);

readline.emitKeypressEvents(process.stdin);
process.stdin.on("keypress", (str, key) => {
  if (key.name == "escape" || (key && key.ctrl && key.name == "c")) {
    client.kill();
    process.stdin.pause();
  } else {
    if (str && str.toLowerCase() === "r") {
      client.runOnSuccessCommand();
    }
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();
