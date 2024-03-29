const e = require('express')
const MusicInstrument = require('../dbModels/musicInstrument')
const Music = require('../dbModels/classicMusic')
const Instrument = require('../dbModels/instrument')

exports.create = (req,res) => {
    if (!req.body.instrumentId || !req.body.musicId) {
        res.status(400).send({
            message: "sth is not defined"
        })
        return
    }
    MusicInstrument.findOrCreate({
        where: {instrumentId: req.body.instrumentId,
                musicId: req.body.musicId}})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while creating MusicInstrument"
        })
    })
}
exports.findAll = (req,res) => {
    MusicInstrument.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving MusicInstrument"
        })
    })
}
exports.findAllMusicAndInstrument= (req,res) => {
    MusicInstrument.findAll({
        include: [{
            model: Music,
            required: false
        },
        {
            model: Instrument,
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
    let instrumentMusicChar = await MusicInstrument.findOne({
        where: {id: req.body.id}
    })
    if(instrumentMusicChar != null){
        const instrumentMusic = {
            instrumentId: req.body.instrumentId,
            musicId: req.body.musicId
        }
        await MusicInstrument.update(instrumentMusic,{
            where: {id: req.body.id}
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving MusicInstrument"
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
    let instrumentMusicChar = await MusicInstrument.findOne({
        where: id
    })
    
    if(instrumentMusicChar != null){
        await MusicInstrument.destroy({
            where: id
        })
        .then(
            res.status(200).send({
                message: `MusicInstrument ${req.params.id} deleted!`
            }))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving MusicInstrument"
            })
        })
    }else{
        res.status(200).send({
            message: `MusicInstrument ${req.params.id} cannot be deleted!`
        })
    }
}