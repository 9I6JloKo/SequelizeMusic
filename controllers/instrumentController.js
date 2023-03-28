const e = require('express')
const Instrument = require('../dbModels/instrument')
const MusicInstrument = require('../dbModels/musicInstrument')
const InstrumentType = require('../dbModels/instrumentType')

exports.create = (req,res) => {
    if (!req.body.instrumentName || !req.body.typeOfInstrument || !req.body.pictureInstrument || !req.body.publishedAt) {
        res.status(400).send({
            message: "sth is not defined"
        })
        return
    }
    Instrument.findOrCreate({
        where: {
            instrumentName: req.body.instrumentName,
            pictureInstrument: req.body.pictureInstrument,
            typeOfInstrument: req.body.typeOfInstrument,
            publishedAt: req.body.publishedAt
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while creating Instrument"
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
                err.message || "Some error occured while retrieving instruments"
        })
    })
}
exports.findAllWithType = (req,res) => {
    Instrument.findAll({
        include: [{
            model: InstrumentType,
            required: true
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
    let instrumentChar = await Instrument.findOne({
        where: {id: req.body.id}
    })
    if(instrumentChar != null){
        const instrument = {
            instrumentName: req.body.instrumentName,
            pictureInstrument: req.body.pictureInstrument,
            typeOfInstrument: req.body.typeOfInstrument,
            publishedAt: req.body.publishedAt
        }
        await Instrument.update(instrument,{
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
    let instrumentChar = await Instrument.findOne({
        where: id
    })
    
    if(instrumentChar != null){
        let instrumentMusic = await MusicInstrument.findOne({
            where: {instrumentId: req.params.id}
        })
        if(instrumentMusic != null){
            await MusicInstrument.destroy({
                where: {instrumentId: req.params.id}
            })
        }
        await Instrument.destroy({
            where: id,
        })
        .then(
            res.status(200).send({
                message: `Instrument ${req.params.id} deleted!`
            }))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Instruments"
            })
        })
    }else{
        res.status(200).send({
            message: `Instrument ${req.params.id} cannot be deleted!`
        })
    }
}