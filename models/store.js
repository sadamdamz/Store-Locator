const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder')

const StoreSchema = new mongoose.Schema({
    storeId:{
        type:String,
        unique:true,
        trim:true,
        maxlength:[10, 'store ID must be less than 10']
    },
    adress:{
        type:String,
        required:[true, 'add store adress']
    },
    location:{
        type: {
          type: String, 
          enum: ['Point'], 
        },
        coordinates: {
          type: [Number],
          index:'2dsphere'
        },
        formattedAddress:String
      },
      createdAt:{
        type:Date,
        default:Date.now
      }
})

StoreSchema.pre('save', async function(next){
  const loc = await geocoder.geocode(this.adress);
  console.log(`before ${loc[0]}`);
  this.location = {
    type:'Point',
    coordinates:[loc[0].longitude, loc[0].latitude],
    formattedAddress:loc[0].formattedAddress
  }
  console.log(`after ${StoreSchema}`)
  this.address = undefined;
  next();
})

module.exports = mongoose.model('Store', StoreSchema);