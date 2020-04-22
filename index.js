const next = require('next');

const initServer = require('server');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app
    .prepare()
    .then(() => initServer(app));
