const express = require('express')
const router = express.Router();
const { User } = require("../model/user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.post("/signup", async (req, res) => {
    try {
        var { email, password } = req.body;
        bcrypt.hash(password, 10, async (err, hash) => {
            password = hash
            const newUser = new User({ email, password });
            await newUser.save();
        });
        return res.status(201).json({
            message : 'User Created',
            sucess: email
        });
    } catch (error) {
        return res.status(400).send(error);
    }
})


router.post("/login", async (req, res) => {
    try {
        var { email, password } = req.body;
        User.findOne({ email }, (err,user) => { 
            if (err) {
                res.send(err)
            }
            if(user == null){
                res.send('user not present')
            }
            else{
                bcrypt.compare(password, user.password, async (err, result) => {
                    if (result == true) {
                        var token = jwt.sign( { 'email': user.email }, process.env.JWT_SECRET, { expiresIn: '5h' });
                        await User.updateOne({ "_id": user.id }, { token });
                        res.json({token})
                    }
                    else{
                        res.send('some error occured' + err)
                    }
                });
            }
        })
    } catch (error) {
        return res.status(400).send(error);
    }
})


module.exports = router