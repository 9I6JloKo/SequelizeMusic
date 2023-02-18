const e = require('express')
const Genre = require('../dbModels/genre')
const MusicGenre = require('../dbModels/musicGenre')

exports.create = (req,res) => {
    if (!req.body.genre_name || !req.body.descGenre) {
        res.status(400).send({
            message: "sth is not defined"
        })
        return
    }
    Genre.findOrCreate({
        where: {
            genre_name: req.body.genre_name,
            descGenre: req.body.descGenre,
            publishedAt: req.body.publishedAt
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
    Genre.findAll()
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
    let GenreChar = await Genre.findOne({
        where: {id: req.body.id}
    })
    if(GenreChar != null){
        const genre = {
            genre_name: req.body.genre_name,
            descGenre: req.body.descGenre,
            publishedAt: req.body.publishedAt
        }
        await Genre.update(genre,{
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
    let GenreChar = await Genre.findOne({
        where: id
    })
    
    if(GenreChar != null){
        let genreMusic = await MusicGenre.findOne({
            where: {genreId: req.params.id}
        })
        if(genreMusic != null){
            await MusicGenre.destroy({
                where: {genreId: req.params.id}
            })
        }
        await Genre.destroy({
            where: id,
        })
        .then(
            res.status(200).send({
                message: `Genre ${req.params.id} deleted!`
            }))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Genre"
            })
        })
    }else{
        res.status(200).send({
            message: `Genre ${req.params.id} cannot be deleted!`
        })
    }
}