const db = require("../dbModels");
const config = require("../dbCreate/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.findAll = (req,res) => {
  User.findAll()
  .then(data => {
      res.send(data)
  })
  .catch(err => {
      res.status(500).send({
          message:
              err.message || "Some error occured while retrieving instruments"
      })
  })
}
exports.change = async (req,res) => {
  if (!req.body.id) {
      res.status(400).send({
          message: "sth is not defined"
      })
      return
  }
  let UserChar = await User.findOne({
      where: {id: req.body.id}
  })
  if(UserChar != null){
      const user = {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email
      }
      await User.update(user,{
          where: {id: req.body.id}
      })
      .then(data => {
          res.send(data)
      })
      .catch(err => {
          res.status(500).send({
              message:
                  err.message || "Some error occured while retrieving categories"
          })
      })
  }
}
exports.delete = async (req,res) => {
  if (!req.params.id) {
      res.status(400).send({
          message: "id is not defined"
      })
      return
  }
  const id = {
      id: req.params.id
  }
  let userChar = await User.findOne({
      where: id
  })
  
  if(userChar != null){
      await User.destroy({
          where: id,
      })
      .then(
          res.status(200).send({
              message: `User ${req.params.id} deleted!`
          }))
      .catch(err => {
          res.status(500).send({
              message:
                  err.message || "Some error occured while retrieving User"
          })
      })
  }else{
      res.status(200).send({
          message: `User ${req.params.id} cannot be deleted!`
      })
  }
}