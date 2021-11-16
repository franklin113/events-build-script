const tools = require("./tools.js");
const args = tools.processArgs(process.argv);

tools.formatHtml(args);
