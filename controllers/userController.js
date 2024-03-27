const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please provide all the required fields');
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password => ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log(`User created: ${user}`);
    if (user) {
        res.status(201).json({_id: user._id, email: user.email});
    }else{
        res.status(400);
        throw new Error('Invalid credentials');
    }
    res.json({ message: "User registered successfully" });
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('All fields are required');
    }
    const user = await User.findOne({ email });
    //compare password with hashed one in db
    if(user && await bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.status(200).json(accessToken);
    }else{
        res.status(401);
        throw new Error('Invalid credenitals');
    }
});

//@desc Current user informations
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {registerUser, loginUser, currentUser};