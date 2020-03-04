const mongoose = require('mongoose');

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
        }
      }
})

module.exports = mongoose.model('Store', StoreSchema);