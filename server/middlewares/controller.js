import koaRouter from 'koa-router'
const fs = require('fs');
const path = require('path');

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
  let readDir = path.resolve(__dirname, dir)
  fs.readdirSync(readDir).filter(f => f.endsWith('.js') && !f.endsWith('.no.js'))
  .forEach(f => {
    console.log(`process controller: ${f}...`);
    let mapping = require(path.resolve(readDir, f))
    addMapping(router, mapping)
  })
}

export default function (dir = '../controllers') {
    let router = koaRouter();
    addControllers(router, dir);
    return router.routes();
};
