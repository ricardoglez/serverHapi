const Joi = require('joi');
const Place = require('./models/Place');

const API = require('./api.js');
module.exports = [
  {
    method: 'GET',
    path: '/api/v1/places',
    config: {
      description: 'Get all the places',
      tags: ['api', 'v1', 'chilaquiles','food','cdmx']
    },
    handler: API.all.handler
  },
  {
    method: 'POST',
    path: '/api/v1/places',
    options: { 
      validate: {
          payload: {
            name               : Joi.string().required() ,
            location           : Joi.string().required() ,
            points             : Joi.number().required(),
            sauceType          : Joi.object().required(),
            complements        : Joi.object().required(),
            price              : Joi.number().required(),
            lastTime           : Joi.number().required(),
            service            : Joi.number().required(),
            notes              : Joi.string(),
          },
          failAction: (request, h, error) => {
            console.log(request.payload )
              return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
          }
      }
    },
    handler: API.create.handler
  },
  {
    method: 'PUT',
    path: '/api/v1/places/{id}',
    options: {
      validate:{
        payload: {
          name               : Joi.string().required() ,
          location           : Joi.string().required() ,
          points             : Joi.number().required(),
          sauceType          : Joi.object().required(),
          complements        : Joi.object().required(),
          price              : Joi.number().required(),
          lastTime           : Joi.number().required(),
          service            : Joi.number().required(),
          notes              : Joi.string(),
        }
      },
      handler: API.update.handler
    }
  },
  {
    method: 'DELETE',
    path: '/api/v1/places',
    config: {
      description: 'Delete a specific place by ID.',
      tags: ['api', 'v1', 'place']
    },
    handler: API.remove.handler
  }
];