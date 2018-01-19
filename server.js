const express = require("express");
const cors = require('cors');
const jsreport = require("jsreport-core")();
const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});


const { fetchReportTemplate } = require("./reports/report-template");

app.get("/reports/hello", (req, res) => {
    jsreport.init().then(() => {
        return jsreport.render({
            template: {
                content: fetchReportTemplate("hello"),
                engine: "jsrender",
                recipe: "phantom-pdf"
            },
            data: {
                foo: "world"
            }
        }).then(function (resp) {
            const data = resp.content;
            res.writeHead(200, {
                "Content-Type": "application/pdf",
                "Content-disposition": "attachment;filename=" + "hello",
                "Content-Length": data.length
            });
            res.end(new Buffer(data, "binary"));
        });
    }).catch(function (e) {
        console.log(e)
    })

});

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
    console.log("Server is running on PORT ", PORT);
});
