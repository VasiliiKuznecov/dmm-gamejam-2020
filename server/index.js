const express = require('express');
const apiRoute = require('server/routers/api');
const appRoute = require('server/routers/app');

const port = parseInt(process.env.PORT, 10) || 3000;

module.exports = app => {
    const server = express();

    apiRoute(app, server);
    appRoute(app, server);

    server.listen(port, error => {
        if (error) {
            throw error;
        }

        console.log(`> Ready on http://localhost:${port}`);
    });
};
