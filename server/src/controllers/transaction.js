const {transaction, User, Film} = require('../../models');

exports.createTransaction = async (req, res) => {
    const {userId, filmId, accNumber, status, proofAttachment} = req.body;
    try {
      const id = req.userId;
      const id2 = req.params.id2;
      console.log(id2)
      
      const proofAttachment = req.files.imageFile[0].filename;
      const purchase = await transaction.create({userId: id, filmId: id2, accNumber, status: "Pending", proofAttachment });
        
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
            model: Film,
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            }
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

exports.getMyFilms = async (req, res) => {
  
  const id = req.userId;

  try {
  
  let purchases = await transaction.findAll({where: {userId : id, status: "Approved"},
      include: [
        {
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"]
          }
        },
        
        {
          model: Film,
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        }
      ],
    
  });

    purchases = JSON.parse(JSON.stringify(purchases));
    purchases = purchases.map((purchase) => {
      return {
        ...purchase,
        image_url: process.env.PATH_KEY + purchase.proofAttachment,
        image_film: process.env.PATH_KEY + purchase.Film.thumbnail
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

exports.getMySelectedFilm = async (req, res) => {
  
  const id = req.userId;
  const id2 = req.params.id2;

  try {
  
  let purchases = await transaction.findOne({where: {userId : id, filmId : id2, status: "Approved"},
      include: [
        
        {
          model: Film,
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        }
      ],
    
  });

    purchases = JSON.parse(JSON.stringify(purchases));
    // purchases = purchases.map((purchase) => {
    //   return {
    //     ...purchase
    //   };
    // });
    
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

exports.getTransactions = async (req, res) => {
  try {
    let purchases = await transaction.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"]
          }
        },
        
        {
          model: Film,
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
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

exports.approvePurchase = async (req, res) => {
  const id = req.params.id;
  const data = req.body

  try {
    const approve = await transaction.update({...data, status: "Approved"}, {where: {id: id}})
   
    return res.json(approve);
  } catch (error) {
    console.log(error);
    res.send({
        status: "failed",
        message: "something went wrong"
    })
  }
}

exports.cancelPurchase = async (req, res) => {
  const id = req.params.id;
  const data = req.body

  try {
    const cancel = await transaction.update({...data, status: "Canceled"}, {where: {id: id}})
   
    return res.json(cancel);
  } catch (error) {
    console.log(error);
    res.send({
        status: "failed",
        message: "something went wrong"
    })
  }
}