const express = require('express')
const router = express.Router();
const { User } = require("../model/user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var logger = require('../config/logger')

router.post("/signup", async (req, res) => {
    try {
        var { email, password } = req.body;
        if (email !== process.env.APPROVED_EMAIL) {
            logger.info(`Email ID is not approved ${email}`)
            res.send({'message': 'Your Email ID is not approved'})
        } else{
            User.findOne({ email }, (err,user) => { 
                if (err) {
                    logger.error(`${email} - ${err}`)
                    res.send(err)
                }else{
                    if(user !== null){
                        logger.info(`Email ID Already Present ${email}`)
                        res.send({'message': 'User Already Present'})
                    }
                    else{
                        bcrypt.hash(password, 10, async (err, hash) => {
                            if (err) {
                                logger.error(`${email} - ${err}`)
                                res.send({'error': `${err}`})
                            }
                            password = hash
                            const newUser = new User({ email, password });
                            await newUser.save();
                            return res.status(201).json({
                                message : 'User Created',
                                email: email
                            });
                        });
                    }
                }
            })
        }
    } catch (error) {
        logger.error(`some exception occured while creating user ${error}`)
        return res.status(400).send(error);
    }
})


router.post("/login", async (req, res) => {
    try {
        var { email, password } = req.body;
        User.findOne({ email }, (err,user) => { 
            if (err) {
                logger.error(`${email} - ${err}`)
                res.send(err)
            }
            if(user == null){
                logger.error(`${email} - not present`)
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
                        logger.info(`some error occured ${err}`)
                        res.send('some error occured' + err)
                    }
                });
            }
        })
    } catch (error) {
        logger.info(`some exception occured ${error}`)
        return res.status(400).send(error);
    }
})


module.exports = router