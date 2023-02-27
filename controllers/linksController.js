const e = require('express')
const Link = require('../dbModels/link')

exports.create = (req,res) => {
    if (!req.body.music_id || !req.body.link_string) {
        res.status(400).send({
            message: "sth is not defined"
        })
        return
    }
    Link.findOrCreate({
        where: {
            music_id: req.body.music_id,
            link_string: req.body.link_string,
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while creating Link"
        })
    })
}
exports.findAll = (req,res) => {
    Instrument.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving Link"
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
    let linkChar = await Link.findOne({
        where: {id: req.body.id}
    })
    if(linkChar != null){
        const link = {
            music_id: req.body.music_id,
            link_string: req.body.link_string,
        }
        await Link.update(link,{
            where: {id: req.body.id}
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Link"
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
    let linkChar = await Link.findOne({
        where: id
    })
    
    if(linkChar != null){
        await Link.destroy({
            where: id,
        })
        .then(
            res.status(200).send({
                message: `Link ${req.params.id} deleted!`
            }))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Link"
            })
        })
    }else{
        res.status(200).send({
            message: `Link ${req.params.id} cannot be deleted!`
        })
    }
}