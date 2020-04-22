const ping = require('server/controllers/ping');

const router = require('express').Router();

module.exports = (app, server) => {
    router
        .route('/ping')
        .get(ping.index);

    server.use('/api', router);
};
