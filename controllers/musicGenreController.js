const e = require('express')
const musicGenre = require('../dbModels/musicGenre')
const Music = require('../dbModels/classicMusic')
const Genre = require('../dbModels/genre')

exports.create = (req,res) => {
    if (!req.body.genreId || !req.body.musicId) {
        res.status(400).send({
            message: "sth is not defined"
        })
        return
    }
    musicGenre.findOrCreate({
        where: {genreId: req.body.genreId,
                musicId: req.body.musicId}})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while creating musicGenre"
        })
    })
}
exports.findAll = (req,res) => {
    musicGenre.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving musicGenre"
        })
    })
}
exports.findAllMusicAndGenre= (req,res) => {
    musicGenre.findAll({
        include: [{
            model: Music,
            required: false
        },
        {
            model: Genre,
            required: false
        }
    ]
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
    let musicGenreChar = await musicGenre.findOne({
        where: {id: req.body.id}
    })
    if(musicGenreChar != null){
        const genreMusic = {
            genreId: req.body.genreId,
            musicId: req.body.musicId
        }
        await musicGenre.update(genreMusic,{
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
    let musicGenreChar = await musicGenre.findOne({
        where: id
    })
    
    if(musicGenreChar != null){
        await musicGenre.destroy({
            where: id
        })
        .then(
            res.status(200).send({
                message: `musicGenre ${req.params.id} deleted!`
            }))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving musicGenre"
            })
        })
    }else{
        res.status(200).send({
            message: `musicGenre ${req.params.id} cannot be deleted!`
        })
    }
}