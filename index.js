const http = require(http);
const fs = require('fs');
var requests = require('requests');

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceval = (tempval , orgval) => {
     let temperature = tempval.replace("{%tempval%}", orgval.main.temp);
}

const server = http.createServer((req, res) => {
     if (req.url == "/") {
          requests('https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=430b57ee9885d1da59b0fe7e94e65ed0', )
               .on('data', function (chunk) {
                    const objdata = JSON.parse(chunk);
                    const arrdata = [objdata];
                    // console.log(arrdata[0].main.temp);
                    const realTimeData = arrdata.map((val) => {
                         replaceval(homeFile, val);
                    })
               })
               .on('end', function (err) {
                    if (err) return console.log('connection closed due to errors', err);

                    console.log('end');
               });
     }
})
server.listen(8000,"127.0.0.1");