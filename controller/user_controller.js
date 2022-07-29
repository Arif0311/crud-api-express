const {User} = require("../models/index")
const models = require("../models")

exports.createUser = (req , res) => {
    // request body
    const body = req.body
    // create user sesuai dengan atribut di model
    User.create({
        firstName: body.firstName,
        lastName : body.lastName,
        email : body.email,
        umur : body.umur,
        alamat : body.alamat
    })
    .then(user => {
        res.status(200).send(user)
    })
}

exports.getAlluser = async (req,res) => {
  await User.findAll({}).then(user => {
    res.status(200).send({
      status:200,
      message:"berhasil get data user",
      data: user, 
    })
  });
}

exports.getUserById = (req, res) => {
    const {id} = req.params;
    User.findOne({
        where:{
            id:id
        }
    }).then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
  };

  exports.userUpdate = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };


  exports.deleteAll = (req, res) => {
    User.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} User were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users."
        });
      });
  };