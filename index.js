let http = require("http");
let fs = require("fs");

http.createServer(function (req, res) {

    let reqUrl = req.url.slice(1);

    if (
        reqUrl == "" ||
        reqUrl == "about" ||
        reqUrl == "contact-me" ||
        reqUrl == "style.css"
    ) {
        if (reqUrl == "style.css") {

            const cssFile = fs.readFileSync("./style.css", "utf8");
             res.setHeader("Content-Type", "text/css");
            res.end(cssFile);

        } else {
            if (reqUrl === "") {
                fs.readFile(`index.html`, function (err, data) {
                    if (err) throw err;
                    res.write(data);
                    return res.end();
                });
            } else {
                fs.readFile(`${reqUrl}.html`, function (err, data) {
                    if (err) throw err;
                    res.write(data);
                    return res.end();
                });
            }
        }
    } else {
        const file = fs.readFileSync("./404.html", "utf8");
        res.end(file);
    }
}).listen(8080);
