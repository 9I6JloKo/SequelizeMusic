const db = require("../dbModels");
const config = require("../dbCreate/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.create = (req,res) => {
  if (!req.body.name) {
      res.status(400).send({
          message: "sth is not defined"
      })
      return
  }
  Role.findOrCreate({
      where: {name: req.body.name}})
  .then(data => {
      res.send(data)
  })
  .catch(err => {
      res.status(500).send({
          message:
              err.message || "Some error occured while creating InstrumentType"
      })
  })
}

exports.findAll = (req,res) => {
  Role.findAll()
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
  let roleChar = await Role.findOne({
      where: {id: req.body.id}
  })
  if(roleChar != null){
      const role = {
          name: req.body.name
      }
      await Role.update(role,{
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
  let roleChar = await Role.findOne({
      where: id
  })
  
  if(roleChar != null){
      await Role.destroy({
          where: id,
      })
      .then(
          res.status(200).send({
              message: `Role ${req.params.id} deleted!`
          }))
      .catch(err => {
          res.status(500).send({
              message:
                  err.message || "Some error occured while retrieving Role"
          })
      })
  }else{
      res.status(200).send({
          message: `Role ${req.params.id} cannot be deleted!`
      })
  }
}