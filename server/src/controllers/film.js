const {Film, User} = require('../../models');
require('dotenv').config();
const Joi = require('joi');

exports.createFilm = async (req, res) => {
    const {userId, title, thumbnail, price, link, category, description} = req.body;
    //const data = req.body;
    try {
        
        const id = req.userId;

        const path = process.env.PATH_KEY;
        const thumbnail = req.files.imageFile[0].filename;

        if(thumbnail == null){
          return res.send({
            status: "failed",
            message: "image does not exist",
          });
        }

        const film = await Film.create({title, thumbnail, price, link, category, description});
        
        res.send({
            status: "success",
            data: {
              film
            }
        });
        
        
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: error.details[0].message
        })
    }
}