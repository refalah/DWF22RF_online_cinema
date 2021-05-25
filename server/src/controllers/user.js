const {User, Donate, Film} = require('../../models');

exports.profile = async (req, res) => {
    const id = req.userId;
    console.log(id)
    try {
        let users = await User.findOne({where: {id},
          include: [
            // {
            //   model: Donate,
            //   attributes: {
            //     exclude: ["createdAt", "updatedAt"]
            //   }
            // },
            
            {
              model: Film,
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              }
            }
          ],
        });

        users = JSON.parse(JSON.stringify(users));
        // users = [users].map((user) => {
        //   return {
        //     ...user
        //   }
        // })

        console.log(users);
        
        res.send({
          status: "success",
          data: {
            users
          }
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "no data found"
        })
    }
}