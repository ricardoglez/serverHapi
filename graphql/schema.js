const graphql = require('graphql');
const PlaceType = require('./PlaceType');
const Place = require('./../models/Place');

const {
		GraphQLObjectType,
		GraphQLString,
		GraphQLSchema
} = graphql;

const RootQuery = new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
				painting: {
						type: PlaceType,
						args: { id: { type: GraphQLString } },
						resolve(parent, args){
								return Place.findById(args.id)
						}
				}
		}
});

module.exports = new GraphQLSchema({
		query: RootQuery
});
