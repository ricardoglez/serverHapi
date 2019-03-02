const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mockSauceType = { 
  isRed: true, 
  isGreen: true, 
  isHabanero: true, 
  isMorita:true,  
  isFrijol:true, 
  isCustom: 'My custom sauce'
 }

 const mockComplements = {
   coriander: true,
   onion: true,
   fries: false,
   nopal: true,
   beans: false,
   meat: true,
   chicken: true,
   egg: true
 }



/*
  notice there is no ID. That's because Mongoose will assign
  an ID by default to all schemas
*/

const PlaceSchema = new Schema({
	name               : String,
	location           : String,
  points             : Number,
  sauceType          : Object,
  complements        : Object,
  price              : Number,
  lastTime           : Number,
});

module.exports = mongoose.model( 'Place', PlaceSchema );
