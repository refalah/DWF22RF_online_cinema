const {User} = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
require('dotenv').config();

exports.register = async (req, res) => {

    const {fullName, email, password} = req.body;
    let hashedPassword = await bcrypt.hash(password, 8);

    try {

        const schema = Joi.object({
            fullName: Joi.string()
            .min(3)
            .max(30)
            .required(),

            password: Joi.string().min(4).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

            email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        });

        const value = await schema.validateAsync(req.body);


        if (!value) {
            return res.send(value);
        }

        const checkEmail = await User.findOne({
            where: {
                email
            }
        });

        if (checkEmail) {
            return res.send({
                status: "Failed",
                message: "Email already exists",
            });
        }


        const user = await User.create({fullName, email, password: hashedPassword});
        
        
        res.send({
            status: "success",
            data: {
              user: {
                fullName: user.fullName,
                email: user.email
              }
            }
        });

        
    } catch (err) {
        console.log(err);
        res.send({
            status: "failed",
            message: "Something went wrong"
        })
    }
}

exports.login = async (req, res) => {

    const {email, password} = req.body;

    try {
        const schema = Joi.object({
           
            email: Joi.string().required()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

            password: Joi.string().required()

           
        });

        const value = await schema.validateAsync(req.body);


        if (!value) {
            return res.send(value);
        }

        const checkEmail = await User.findOne({
            where: {
                email
            }
        });

        if (!checkEmail) {
            return res.send({
                status: "failed",
                message: "Email does not exist",
            });
        }

        const passVerify = await bcrypt.compare(password, checkEmail.password);

        if(!passVerify){
            return res.send({
                status: "failed",
                message: "Wrong password"
            });
        }

        const token = jwt.sign({id: checkEmail.id}, process.env.JWT_SECRET);

        res.send({
            status: "success",
            data: {
              user: {
                fullName: checkEmail.fullName,
                email: checkEmail.email,
                token
              }
            }
        });


    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Something went wrong"
        })
    }
}