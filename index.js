const hapi = require('hapi');
const mongoose = require('mongoose');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('./graphql/schema');
require('dotenv').config();
/* swagger section */
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const ROUTES = require('./routes');

const server = hapi.server({
	port: 4000,
	host: process.env.DB_HOST
});

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds157762.mlab.com:57762/experiments`,
 { useNewUrlParser: true}, ( err ) => { if( err ) throw err; }
 );

mongoose.connection.once('open', () => {
	console.log('connected to database', this);
});

/**
 * This part initialize the server
 * Adds the plugins 
 */
const init = async () => {

	await server.register([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options: {
				info: {
					title: 'Chilaquiles Rank API Documentation [Beta]',
					version: Pack.version
				}
			}
		}
	]);
	await server.register({
		plugin: graphiqlHapi,
		options: {
			path: '/graphiql',
			graphiqlOptions: {
				endpointURL: '/graphql'
			},
			route: {
				cors: true
			}
		}
	});

	await server.register({
		plugin: graphqlHapi,
		options: {
			path: '/graphql',
			graphqlOptions: {
				schema
			},
			route: {
				cors: true
			}
		}
	});


	server.route( ROUTES );

	await server.start();
	console.log(`Server running at: ${server.info.uri}`);
};

process.on('unHandledRejection', (err) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
});

init();
