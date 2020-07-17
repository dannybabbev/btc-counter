const Hapi = require('@hapi/hapi');
const axios = require('axios');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: async (r, h) => {
            const response = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");

            return  {
                number: Math.ceil(response.data.bpi.USD.rate_float)
            };
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();