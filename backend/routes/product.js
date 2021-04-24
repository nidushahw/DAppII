const router = require('express').Router();
// to make this route protected
const verify = require('./verifyToken');
const Product = require('../model/Product.model');
const User = require('../model/User.model');
const { addProductValidation, redeemProductValidation } = require('../validation');

const getSummary = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) return res.status(400).send('User does not exist');
        let summary = await Product.aggregate().
            match({ "createdBy": user._id }).
            group({
                "_id": {
                    "name": "$name",
                    "noOfCoins": "$noOfCoins"
                },
                "description": {
                    "$first": "$description"
                },
                "createdDate": {
                    "$first": "$createdDate"
                },
                "redeemedCount": {
                    "$sum": {
                        "$cond": [
                            "$isRedeemed",
                            1,
                            0
                        ]
                    }
                },
                "totalCount": {
                    "$sum": 1
                }
            }).
            project({
                "_id": 0,
                "name": "$_id.name",
                "noOfCoins": "$_id.noOfCoins",
                "description": 1,
                "createdDate": 1,
                "redeemedCount": 1,
                "totalCount": 1
            });
        res.send(summary);
    } catch (err) {
        res.status(500).send(err);
    }
}

router.post('/add', verify, async (req, res) => {
    // validate data before creating products
    const { error } = addProductValidation(req.body);

    // output validation errors
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user exists
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(400).send('User does not exist');

    const quantity = parseInt(req.body.quantity);
    const noOfCoins = parseInt(req.body.noOfCoins);
    const total = quantity * noOfCoins;
    if (user.coinBalance < total) {
        return res.status(403).send('Not enough coin balance');
    }

    const coinBalance = user.coinBalance - total;
    await User.findOneAndUpdate({ _id: req.user._id }, { coinBalance: coinBalance });

    for (let i = 0; i < quantity; i++) {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            noOfCoins: noOfCoins,
            createdBy: user._id
        });
        try {
            // save new user to db
            const saved = await product.save();
        } catch (err) {
            return res.status(500).send(err);
        }
    }
    getSummary(req, res);
});

router.post('/redeem', verify, async (req, res) => {
    // validate data before creating products
    const { error } = redeemProductValidation(req.body);

    // output validation errors
    if (error) return res.status(400).send(error.details[0].message);
    try {
        //Check if user exists
        const user = await User.findOne({ _id: req.user._id });
        if (!user) return res.status(400).send('User does not exist');

        const filter = { _id: req.body.productItemId, isRedeemed: false };
        const update = { isRedeemed: true, redeemedBy: user._id, redeemedDate: new Date() };
        const product = await Product.findOneAndUpdate(filter, update, {
            new: true
        });
        if (!product) return res.status(400).send('Invalid Product');
        const coinBalance = user.coinBalance + product.noOfCoins;
        await User.findOneAndUpdate({ _id: req.user._id }, { coinBalance: coinBalance });

        //todo call smart contract 
        res.send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/search/:name', verify, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) return res.status(400).send('User does not exist');
        let query = { name: req.params.name, createdBy: user._id, isRedeemed: false };
        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/summary', verify, async (req, res) => {
    getSummary(req, res);
});



module.exports = router;