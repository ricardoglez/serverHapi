const  Place  = require('./models/Place');
const Boom = require('boom');

const PlaceApi = {
  all: {
     async handler ( req, h ){
      try {
        return await Place.find({}).sort({ lastTime: 'desc' });
      } catch (err) {
        Boom.badImplementation(err);
      }
    }
  },
  create: {
     async handler( req, h ) {
      console.log( 'Create a Place...' );
      
      try{
        const { name, location, points, sauceType, complements, price, lastTime, service, notes } = req.payload;

        const place = new Place( {
          name,
          location,
          points,
          sauceType,
          complements,
          price,
          lastTime,
          service,
          notes
        } );
        console.log( ' try to save this place', place );
        const result = await place.save(); 
        
        return h.response(result ) 
      }
      catch(error) {
        console.log(error)
        Boom.badImplementation(error)
      }
    }
  },
  get: {
    async handler (request, h){
      try {
        const place = request.params.place;
        return await Place.findOne({
            _id: place.id
        });
      } catch (err) {
          Boom.badImplementation(err);
      }
    }
  },
  update: {
    async handler(request, h) {
      console.log( 'Updating a Place...')
      try {
        const place = request.params.place;
        const placeId = request.params.id;
        
        console.log( placeId );

        const result = await Place.findOneAndUpdate( placeId, request.payload, { new: true } ); 
        console.log( result );
       return h.response( result )
      } catch ( err ) {
        console.error( err );
          Boom.badImplementation( err );
      }
    }
  },
  remove: {
    async handler(request, h){
        try {
            const place = await  Place.findById(request.params.place).remove();
            return { success: true, message: 'Successfully removed place!' };
        } catch (err) {
            Boom.badImplementation(err);
        }
    }
  }
};


module.exports = PlaceApi;