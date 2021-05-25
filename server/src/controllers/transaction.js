const {transaction, User, Film} = require('../../models');

exports.createTransaction = async (req, res) => {
    const {userId, fundId, accNumber, status, proofAttachment} = req.body;
    try {
      const id = req.userId;
      const id2 = req.params.id2;
      console.log(id2)
      
      const proofAttachment = req.files.imageFile[0].filename;
      const purchase = await transaction.create({userId: id, fundId: id2, accNumber, status: "Pending", proofAttachment });
        
        return res.json(purchase);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "something went wrong"
        })
    }
}

exports.getUserTransactions = async (req, res) => {
  
    const id = req.userId;

    try {
    
    let purchases = await transaction.findAll({where: {userId : id},
        include: [
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"]
            }
          },
          
          {
            model: Film
          }
        ],
      
    });

      purchases = JSON.parse(JSON.stringify(purchases));
      purchases = purchases.map((purchase) => {
        return {
          ...purchase,
          image_url: process.env.PATH_KEY + purchase.proofAttachment
        };
      });
      
      console.log(purchases)

      res.send({
        status: "success",
        data: {
          purchases
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