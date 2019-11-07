const joi = require('joi'); 

exports.validateDetails = (req, res, next) => {
    const schema = {
        workType: joi.string().required(), 
        description: joi.string().required()
    }

    const result = joi.validate(req.body, schema)
    if(result.error) return res.status(401).json({success: false, message: "Invalid Input"})
    next();
}



exports.validateEditProfile = (req, res, next) => {
    const schema = {
        role :  joi.string().required(), 
        preference: joi.array().required(),
    }
    const result = joi.validate(req.body, schema);
    if(result.error) return  res.status(401).json({success: false, message: "Invalid input", error: result.error.message})
    next();
}