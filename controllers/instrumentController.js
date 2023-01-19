const e = require('express')
const Instrument = require('../dbModels/instrument')

exports.create = (req,res) => {
    if (!req.body.instrumentName) {
        res.status(400).send({
            message: "instrumentName is not defined"
        })
        return
    }
    const instrument = {
        instrumentName: req.body.instrumentName,
    }
    Instrument.create(instrument)
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
exports.change = async (req,res) => {
    if (!req.body.title || !req.body.id) {
        res.status(400).send({
            message: "name or id is not defined"
        })
        return
    }
    let instrumentChar = await Instrument.findOne({
        where: {id: req.body.id}
    })
    if(instrumentChar != null){
        const instrument = {
            instrumentName: req.body.title,
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
        id: req.body.id
    }
    let instrumentChar = await Instrument.findOne({
        where: id
    })
    if(instrumentChar != null){
        await Instrument.destroy({
            where: id
        })
        .then(
            res.status(200).send({
                message: `Instrument ${req.body.id} deleted!`
            }))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving categories"
            })
        })
    }else{
        res.status(200).send({
            message: `Instrument ${req.body.id} cannot be deleted!`
        })
    }
}