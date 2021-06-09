const {User, Film, Wishlist, Sequelize} = require('../../models');

exports.createWishlist = async (req,res) => {
    
  const id = req.userId;
  const id2 = req.params.id2;

    try {

        const wish = await Wishlist.create({userId: id, filmId: id2, exist: true});
        return res.json(wish);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "something went wrong"
        })
    }
}

exports.toggleWishlist = async (req,res) => {
   
  const id = req.params.id;

    try {
      const wish = await Wishlist.destroy({where: {id}});
      return res.json(wish);
        
    } catch (error) {
        console.log(error)
    }
}

exports.getWishes = async (req, res) => {
  
    const id = req.userId;
    const id2 = req.params.id2;
  
    try {
    
    let wishes = await Wishlist.findOne({where: {userId : id, filmId : id2, exist: true},
        include: [
          
          {
            model: Film,
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            }
          }
        ],
      
    });
  
      wishes = JSON.parse(JSON.stringify(wishes));      
  
      res.send({
        status: "success",
        data: {
          wishes
        }
    });
  
  
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.getMyWishes = async (req, res) => {
    const id = req.userId;

    try {
        let wishes = await Wishlist.findAll({where: {userId: id}, 
            include: [
                {
                  model: Film,
                  attributes: {
                    exclude: ["createdAt", "updatedAt"]
                  }
                }
            ]
        });

        wishes = JSON.parse(JSON.stringify(wishes));
        wishes = wishes.map((wish) => {
          return {
            ...wish,
            image_url: process.env.PATH_KEY + wish.Film.thumbnail
          };
        });
        
        res.send({
            status: "success",
            data: {
              wishes
            }
        });
    } catch (error) {
        console.log(error)
    }
}