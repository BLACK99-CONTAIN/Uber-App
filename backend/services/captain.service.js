const captainmodel = require('../models/captainuser.js');

module.exports.create = async ({ firstname, lastname, email, password, 
    color,plate,capacity,vehicleType}) => {
    try {
        if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
            throw new Error("All fields must be filled");
        }

        const captain = await captainmodel.create({
            username: {firstname,lastname},
            email,
            password,
            vehicle: {color,plate,capacity,vehicleType},
            location:{latitude,longitude}
        });

        return captain;
    } catch (err) {
       throw(err)
    }
}