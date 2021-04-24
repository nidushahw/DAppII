const router = require('express').Router();
const User = require('../model/User.model');
const verify = require('./verifyToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

// REGISTER
/*
    Register a user. Endpoint => http://localhost:8080/api/user/register
    Payload: {name:"",email:"",password:""}
*/
router.post('/register', async (req, res) => {

    // validate data before creating user
    const { error } = registerValidation(req.body)

    // output validation errors
    if (error) return res.status(400).send(error.details[0].message);

    // check db if user email exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // create user object from request body
    const coinBalance = (req.body.userType === 'PARTNER') ? 1000 : 50;
    const user = new User({
        email: req.body.email,
        password: hashPassword,
        userType: req.body.userType,
        walletAddress: req.body.walletAddress,
        coinBalance: coinBalance
    });

    try {
        // save new user to db
        const savedUser = await user.save();
        console.log(`new user saved successfully - id: ${user._id}, email: ${user.email}`);

        // Create and assign JWT token
        createAndSendToken(savedUser, res);
    } catch (err) {
        res.status(400).send(err)
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    // validate data before creating user
    const { error } = loginValidation(req.body)

    // output validation errors
    if (error) return res.status(400).send(error.details[0].message);

    // check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is wrong');

    // Check if password is correct with bcrypt.compare()
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json('Invalid password')
    // if (!validPass) return res.send('Invalid password')

    // Create and assign JWT token
    createAndSendToken(user, res);
    console.log(`User login successful - id: ${user._id}, email: ${user.email}`);
})

router.get('/', verify, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) return res.status(400).send('User does not exist');
        res.json({
            email: user.email,
            walletAddress: user.walletAddress,
            coinBalance: user.coinBalance,
            userType: user.userType
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;

function createAndSendToken(user, res) {
    const token = jwt.sign({ _id: user._id, _email: user.email }, process.env.TOKEN_SECRET);
    console.log(`token assigned to user successfully - id: ${user._id}`);

    console.log(`User login successful - id: ${user._id}, email: ${user.email}`);

    // 'auth-token' is name token
    res.header('auth-token', token).send(token);
}
