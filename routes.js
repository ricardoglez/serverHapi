const Joi = require('joi');
const Place = require('./models/Place');

module.exports = [
  {
    method: 'GET',
    path: '/api/v1/places',
    config: {
      description: 'Get all the places',
      tags: ['api', 'v1', 'chilaquiles','food','cdmx']
    },
    handler: (req, reply) => {
        return Place.find();	
      }
  },
  {
    method: 'POST',
    path: '/api/v1/places',
    options: { 
      validate: {
          payload: {
              name: Joi.string().required(),
              lastname: Joi.string().required()
          },
          failAction: (request, h, error) => {
              return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
          }
      }
    },
    handler: async ( req, h ) => {
      // console.log( req.payload, reply );
      try{
      
        const { name, location, points, sauceType, complements, price, lastTime } = req.payload;
        const place = new Place({
          name,
          location,
          points,
          sauceType,
          complements,
          price,
          lastTime
        });
        console.log( ' try to save this place', place );
        const result = await place.save(); 
        
        return h.response(result ) 
      }
      catch(error) {
        return h.response(error).code(500)
      }

    }
  },
  {
    method: 'DELETE',
    path: '/api/v1/places',
    config: {
      description: 'Delete a specific place by ID.',
      tags: ['api', 'v1', 'place']
    },
    handler: async ( req, h ) => {
      try{
        const result = place.delete();
        return h.response( result )
      }
      catch(error){
        return h.response(error).code(500)
      }
    }
  }
];