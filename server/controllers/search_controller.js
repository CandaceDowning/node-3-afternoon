const swag = require('../models/swag')

module.exports = {
    get: (req, res, next) => {
        const { category } = req.query;
        
        if(!category){
            res.status(200).json(swag)
        }else{
            const filter = swag.filter(swag => swag.category === category)
            res.status(200).json(filter)
        }
    }
}