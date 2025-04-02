const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const usermodel = require("../models/user");
const { generatetoken } = require("./../jwt");

module.exports.registerUser = async (req, res, next) => {
    try {
      
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log("Received Request Body:", req.body);

        const { username, email, password } = req.body;
        const { firstname, lastname } = username;

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        console.log("Extracted Values:", { firstname, lastname, email, password });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await usermodel.create({
            username: { firstname, lastname },
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const payload = { id: user._id };
        const token = generatetoken(payload);

        res.json({ token, user });
    } catch (error) {
        console.error("Error in registerUser:", error);
        next(error);
    }
};
