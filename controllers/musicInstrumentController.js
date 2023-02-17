const e = require('express')
const MusicInstrument = require('../dbModels/musicInstrument')

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
                err.message || "Some error occured while creating InstrumentType"
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
                err.message || "Some error occured while retrieving InstrumentTypes"
        })
    })
}
// добавить ид в таблицу связную итогда продолжать
exports.change = async (req,res) => {
    if (!req.body.id || !req.body.typeName) {
        res.status(400).send({
            message: "sth is not defined"
        })
        return
    }
    let instrumentTypeChar = await InstrumentType.findOne({
        where: {id: req.body.id}
    })
    if(instrumentTypeChar != null){
        const instrumentType = {
            typeName: req.body.typeName
        }
        await InstrumentType.update(instrumentType,{
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
    let instrumentTypeChar = await InstrumentType.findOne({
        where: id
    })
    
    if(instrumentTypeChar != null){
        let instrumentChar = await Instrument.findAll({
            where: {typeOfInstrument: req.params.id},
            attributes: [
                "id"
            ]
        })
        if(instrumentChar != null){
            for(let i; i<instrumentChar.length;i++){
                let instrumentMusic = await MusicInstrument.findAll({
                    where: {instrumentId: instrumentChar[i].id}
                })
                if(instrumentMusic != null){
                    await MusicInstrument.destroy({
                        where: {instrumentId: instrumentChar[i].id}
                    })
                }
            }
            await Instrument.destroy({
                where: {typeOfInstrument: req.params.id}
            })
        }
        await InstrumentType.destroy({
            where: id
        })
        .then(
            res.status(200).send({
                message: `InstrumentType ${req.params.id} deleted!`
            }))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving categories"
            })
        })
    }else{
        res.status(200).send({
            message: `InstrumentType ${req.params.id} cannot be deleted!`
        })
    }
}