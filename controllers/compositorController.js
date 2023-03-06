const e = require('express')
const Compositor = require('../dbModels/compositor')
const MusicCompositor = require('../dbModels/musicCompositor')

exports.create = (req,res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.descCompositor) {
        res.status(400).send({
            message: "sth is not defined"
        })
        return
    }
    Compositor.findOrCreate({
        where: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            descCompositor: req.body.descCompositor,
            dateOfBirth: req.body.dateOfBirth,
            dateOfDeath: req.body.dateOfDeath,
            countryOfBirth: req.body.countryOfBirth,
            photoCompositor: req.body.photoCompositor
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while creating Genre"
        })
    })
}
exports.findAll = (req,res) => {
    Compositor.findAll()
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
            message: "id is not defined"
        })
        return
    }
    let CompositorChar = await Compositor.findOne({
        where: {id: req.body.id}
    })
    if(CompositorChar != null){
        const compositor = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            descCompositor: req.body.descCompositor,
            dateOfBirth: req.body.dateOfBirth,
            dateOfDeath: req.body.dateOfDeath,
            countryOfBirth: req.body.countryOfBirth,
            photoCompositor: req.body.photoCompositor
        }
        await Compositor.update(compositor,{
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
    let CompositorChar = await Compositor.findOne({
        where: id
    })
    
    if(CompositorChar != null){
        let compositorMusic = await MusicCompositor.findOne({
            where: {compositorId: req.params.id}
        })
        if(compositorMusic != null){
            await MusicCompositor.destroy({
                where: {compositorId: req.params.id}
            })
        }
        await Compositor.destroy({
            where: id,
        })
        .then(
            res.status(200).send({
                message: `Compositor ${req.params.id} deleted!`
            }))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Compositor"
            })
        })
    }else{
        res.status(200).send({
            message: `Compositor ${req.params.id} cannot be deleted!`
        })
    }
}