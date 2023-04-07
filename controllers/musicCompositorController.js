const e = require('express')
const musicCompositor = require('../dbModels/musicCompositor')
const Music = require('../dbModels/classicMusic')
const Compositor = require('../dbModels/compositor')
exports.create = (req,res) => {
    if (!req.body.compositorId || !req.body.musicId) {
        res.status(400).send({
            message: "sth is not defined"
        })
        return
    }
    musicCompositor.findOrCreate({
        where: {compositorId: req.body.compositorId,
                musicId: req.body.musicId}})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while creating musicCompositor"
        })
    })
}
exports.findAll = (req,res) => {
    musicCompositor.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving musicCompositor"
        })
    })
}
exports.findAllMusicAndCompositor= (req,res) => {
    musicCompositor.findAll({
        include: [{
            model: Music,
            required: false
        },
        {
            model: Compositor,
            required: false
        }]
    })
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
    let musicCompositorChar = await musicCompositor.findOne({
        where: {id: req.body.id}
    })
    if(musicCompositorChar != null){
        const compositorMusic = {
            compositorId: req.body.compositorId,
            musicId: req.body.musicId
        }
        await musicCompositor.update(compositorMusic,{
            where: {id: req.body.id}
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving InstrumentTypes"
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
    let musicCompositorChar = await musicCompositor.findOne({
        where: id
    })
    
    if(musicCompositorChar != null){
        await musicCompositor.destroy({
            where: id
        })
        .then(
            res.status(200).send({
                message: `musicCompositor ${req.params.id} deleted!`
            }))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving musicCompositor"
            })
        })
    }else{
        res.status(200).send({
            message: `musicCompositor ${req.params.id} cannot be deleted!`
        })
    }
}