const e = require('express')
const Period = require('../dbModels/period')
const Music = require('../dbModels/classicMusic')
const MusicInstrument = require('../dbModels/musicInstrument')
const musicCompositor = require('../dbModels/musicCompositor')
const musicGenre = require('../dbModels/musicGenre')
const linksT = require('../dbModels/link')

exports.create = (req,res) => {
    if (!req.body.period_name || !req.body.desc) {
        res.status(400).send({
            message: "sth is not defined"
        })
        return
    }
    Period.findOrCreate({
        where: {
            period_name: req.body.period_name,
            desc: req.body.desc
        }})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while creating Period"
        })
    })
}
exports.findAll = (req,res) => {
    Period.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving Period"
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
    let periodChar = await Period.findOne({
        where: {id: req.body.id}
    })
    if(periodChar != null){
        const period = {
            period_name: req.body.period_name,
            desc: req.body.desc
        }
        await Period.update(period,{
            where: {id: req.body.id}
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Period"
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
    let periodChar = await Period.findOne({
        where: id
    })

    if(periodChar != null){
        let musicChar = await Music.findAll({
            where: {period_id: req.params.id},
            attributes: [
                "id"
            ]
        })
        if(musicChar != null){
            for(let i; i<musicChar.length;i++){
                let instrumentMusic = await MusicInstrument.findAll({
                    where: {musicId: musicChar[i].id}
                })
                if(instrumentMusic != null){
                    await MusicInstrument.destroy({
                        where: {musicId: musicChar[i].id}
                    })
                }
                let genreMusic = await musicGenre.findAll({
                    where: {musicId: musicChar[i].id}
                })
                if(genreMusic != null){
                    await musicGenre.destroy({
                        where: {musicId: musicChar[i].id}
                    })
                }
                let compositorMusic = await musicCompositor.findAll({
                    where: {musicId: musicChar[i].id}
                })
                if(compositorMusic != null){
                    await musicCompositor.destroy({
                        where: {musicId: musicChar[i].id}
                    })
                }
                let linksMusic = await linksT.findAll({
                    where: {music_id: musicChar[i].id}
                })
                if(linksMusic != null){
                    await linksT.destroy({
                        where: {music_id: musicChar[i].id}
                    })
                }
            }
            await Music.destroy({
                where: {period_id: req.params.id}
            })
        }
        await Period.destroy({
            where: id
        })
        .then(
            res.status(200).send({
                message: `Period ${req.params.id} deleted!`
            }))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Period"
            })
        })
    }else{
        res.status(200).send({
            message: `Period ${req.params.id} cannot be deleted!`
        })
    }
}