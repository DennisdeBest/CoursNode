const http = require('http');
const qs = require('querystring');
const db = require('sqlite');

const FORM_PAGE = `
    <html>
    <body>
    <h1>Coucou</h1>
    <form method="POST" action="">
    <label for="name">Name :</label>
    <input id="name" name="name" type="text">
    <label for="message">Message : </label>
    <textarea id="message" name="message"></textarea>
    <input type="submit" value="Envoyer" />
</form>
    </body>
    </html>
`

http.createServer((req, res) => {
    console.log(req.method);

    res.writeHead(200, {'Content-Type': 'text/html'});

    res.write(FORM_PAGE);

    if(req.method === 'POST'){
            getPostData(req);
        }
res.end();
}).listen(8080);

function getPostData(req) {
    let body = "";
    req.on('data', (data) => {
        body += data
        });

    req.on('end', () => {
        let params = qs.parse(body);
    console.log(params.name);
    console.log(params.message);
}
)
}
