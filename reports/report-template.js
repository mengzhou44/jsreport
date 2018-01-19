const fs = require("fs");
const path = require("path");


function fetchReportTemplate(templateName) {
    const file = path.join(__dirname, `${templateName}.html`);
    const content = fs.readFileSync(file, "utf8");
    return content;
}

module.exports = { fetchReportTemplate }