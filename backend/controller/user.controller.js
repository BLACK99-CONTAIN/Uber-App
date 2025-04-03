const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const usermodel = require("../models/user");
const { generatetoken } = require("./../jwt");
const blacklisteduser = require("../models/blacklisteduser");

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

      

        const user = await usermodel.create({
            username: { firstname, lastname },
            email,
            password,
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


module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        console.log("Received Request Body:", req.body);

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }


        // Generate JWT token
        const payload = { id: user._id };
        const token = generatetoken(payload);

        res.json({ token, user });
    } catch (err) {
        console.error("Error in loginUser:", err);
        next(err);
    }
};

module.exports.userprofile = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const userId = req.user.id;
        console.log("User ID from token:", userId);
        const user = await usermodel.findById(userId);
        if (!user) {
            return res.status(402).json({ error: "User not found" })
        }
        res.json({ user })

    } catch (err) {
        console.error("Error in userProfile:", err);
        next(err);
    }
}

module.exports.userLogout = async (req, res, next) => {
    try {
       
        res.clearCookie("token");
        const token= res.cookies?.token||req.headers.authorization?.split(" ")[1];
        console.log("Token from request:", token);
        await blacklisteduser.create({token})
    
        res.status(200).json({ message: "Logout successful" });
    }catch(err){
        console.error("Error in userLogout:", err);
        next(err);
    }
}