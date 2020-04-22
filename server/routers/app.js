const router = require('express').Router();

module.exports = (app, server) => {
    const handle = app.getRequestHandler();

    router
        .route('*')
        .get((req, res) => {
            return handle(req, res);
        });

    server.use('/', router);
};
