const e = require('express')
const Music = require('../dbModels/classicMusic')
const MusicInstrument = require('../dbModels/musicInstrument')
const musicCompositor = require('../dbModels/musicCompositor')
const musicGenre = require('../dbModels/musicGenre')
const linksT = require('../dbModels/link')

exports.create = (req,res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "title is not defined"
        })
        return
    }
    if(req.body.period_id == ""){
        req.body.period_id = null;
    }
    Music.findOrCreate({
        where: {
            title: req.body.title,
            period_id: req.body.period_id,
            publishedAt: req.body.publishedAt
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while creating Music"
        })
    })
}
exports.findAll = (req,res) => {
    Music.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving Music"
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
    let musicChar = await Music.findOne({
        where: {id: req.body.id}
    })
    if(musicChar != null){
        const music = {
            title: req.body.title,
            period: req.body.period_id,
            publishedAt: req.body.publishedAt
        }
        await Music.update(music,{
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
    let musicChar = await Music.findOne({
        where: id
    })
    
    if(musicChar != null){
        let instrumentMusic = await MusicInstrument.findOne({
            where: {musicId: req.params.id}
        })
        if(instrumentMusic != null){
            await MusicInstrument.destroy({
                where: {musicId: req.params.id}
            })
        }
        let compositorMusic = await musicCompositor.findOne({
            where: {musicId: req.params.id}
        })
        if(compositorMusic != null){
            await musicCompositor.destroy({
                where: {musicId: req.params.id}
            })
        }
        let genreMusic = await musicGenre.findOne({
            where: {musicId: req.params.id}
        })
        if(genreMusic != null){
            await musicGenre.destroy({
                where: {musicId: req.params.id}
            })
        }
        let links = await linksT.findOne({
            where: {music_id: req.params.id}
        })
        if(links != null){
            await linksT.destroy({
                where: {music_id: req.params.id}
            })
        }
        await Music.destroy({
            where: id,
        })
        .then(
            res.status(200).send({
                message: `Music ${req.params.id} deleted!`
            }))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Musics"
            })
        })
    }else{
        res.status(200).send({
            message: `Music ${req.params.id} cannot be deleted!`
        })
    }
}