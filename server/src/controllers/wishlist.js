const {User, Film, Wishlist} = require('../../models');

exports.createWishlist = async (req,res) => {
    const {exist} = req.body;

    try {
        const id = req.userId;
        const id2 = req.params.id2;

        const wish = await Wishlist.create({userId: id, filmId: id2, exist});

        return res.json(wish);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "something went wrong"
        })
    }
}