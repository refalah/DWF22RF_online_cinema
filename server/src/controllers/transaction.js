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