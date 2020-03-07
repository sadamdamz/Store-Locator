const Store = require('../models/Store')
// const geocode = require('../utils/geocoder')

exports.getstores = async (req, res, next) => {
    try {
         const stores = await Store.find();
         return res.status(200).json({
             success:true,
             count:stores.length,
             data:stores
         })
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'server error'})
    }
}

exports.addstores = async (req, res, next) => {
    try {
        const store = await Store.create(req.body);
        return res.status(300).json({
            success:true,
            data: store
        })   
    } catch (error) {
        if(error.code == 11000){
            return res.status(400).json({error:'store already exist'})
        }
        console.log(error)
        return res.status(500).json({error:'server error'})   
    }
}

