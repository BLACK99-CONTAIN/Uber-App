const usermodel = require('../models/user.js');

module.exports.create = async ({ firstname, lastname, email, password }) => {
    try {
        if (!firstname || !lastname || !email || !password) {
            throw new Error("All fields must be filled");
        }

        const user = await usermodel.create({
            username: {firstname,lastname},
            email,
            password
        });

        return user;
    } catch (err) {
       throw(err)
    }
};
