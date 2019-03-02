const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString , GraphQLNumber, GraphQLObject } = graphql;

const PlaceType = new GraphQLObjectType({
    name: 'Place',
    fields: () => ({
        id          : { type: GraphQLString },
        name        : { type: GraphQLString },
        location    : { type: GraphQLString },
        points      : { type: GraphQLNumber },
        sauceType   : { type: GraphQLObject },
        complements : { type: GraphQLObject },
        price       : { type: GraphQLNumber },
        lastTime    : { type: GraphQLNumber },
    })
});

module.exports = PlaceType;
