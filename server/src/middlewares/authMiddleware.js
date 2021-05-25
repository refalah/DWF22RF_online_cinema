const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authToken = async (req, res, next) => {
    

    try {

        let header = req.header("Authorization");

        let token = header.replace("Bearer ", "");

        if (!header || !token) {
            return res.send({
                status: "Failed",
                message: "Access Denied"
            })
        };

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = verified.id;

        next();
        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "Something went wrong"
        })
    }
}