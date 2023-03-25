// const e = require('express')
// const roleUser = require('../dbModels/roleUser')

// exports.create = (req,res) => {
//     if (!req.body.genreId || !req.body.musicId) {
//         res.status(400).send({
//             message: "sth is not defined"
//         })
//         return
//     }
//     roleUser.findOrCreate({
//         where: {genreId: req.body.genreId,
//                 musicId: req.body.musicId}})
//     .then(data => {
//         res.send(data)
//     })
//     .catch(err => {
//         res.status(500).send({
//             message:
//                 err.message || "Some error occured while creating roleUser"
//         })
//     })
// }
// exports.findAll = (req,res) => {
//     roleUser.findAll()
//     .then(data => {
//         res.send(data)
//     })
//     .catch(err => {
//         res.status(500).send({
//             message:
//                 err.message || "Some error occured while retrieving roleUser"
//         })
//     })
// }
// exports.change = async (req,res) => {
//     if (!req.body.id) {
//         res.status(400).send({
//             message: "sth is not defined"
//         })
//         return
//     }
//     let roleUserChar = await roleUser.findOne({
//         where: {id: req.body.id}
//     })
//     if(roleUserChar != null){
//         const roleUser = {
//             roleId: req.body.roleId,
//             userId: req.body.userId
//         }
//         await roleUser.update(roleUser,{
//             where: {id: req.body.id}
//         })
//         .then(data => {
//             res.send(data)
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occured while retrieving InstrumentTypes"
//             })
//         })
//     }
// }
// exports.delete = async (req,res) => {
//     if (!req.params.id) {
//         res.status(400).send({
//             message: "id is not defined"
//         })
//         return
//     }
//     const id = {
//         id: req.params.id
//     }
//     let roleUserChar = await roleUser.findOne({
//         where: id
//     })
    
//     if(roleUserChar != null){
//         await roleUser.destroy({
//             where: id
//         })
//         .then(
//             res.status(200).send({
//                 message: `musicGenre ${req.params.id} deleted!`
//             }))
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occured while retrieving musicGenre"
//             })
//         })
//     }else{
//         res.status(200).send({
//             message: `musicGenre ${req.params.id} cannot be deleted!`
//         })
//     }
// }