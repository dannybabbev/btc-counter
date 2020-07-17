const Hapi = require('@hapi/hapi');
const axios = require('axios');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: async (r, h) => {
            const response = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");
            const data = response.data;
            console.log(data);

            return  {
                number: Math.ceil(data.bpi.USD.rate_float)
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