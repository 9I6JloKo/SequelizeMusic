const e = require('express')
const {Op} = require('sequelize')
const Music = require('../dbModels/classicMusic')
const Genre = require('../dbModels/genre')
const MusicInstrument = require('../dbModels/musicInstrument')
const musicCompositor = require('../dbModels/musicCompositor')
const musicGenre = require('../dbModels/musicGenre')
const periodMusic = require('../dbModels/period')
const linksT = require('../dbModels/link')
const Instrument = require('../dbModels/instrument')
const Compositor = require('../dbModels/compositor')

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
exports.findAllWithPeriod = (req,res) => {
    Music.findAll({
        include: [{
            model: periodMusic,
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
exports.findByTitle = async (req,res) => {
    Music.findAll({
      where: {
        title: {[Op.like]: `%${req.params.title}%`}
      }
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

exports.findByGenre = async (req,res) => {
    Genre.findAll({
        where: {
            genre_name: {[Op.like]: `%${req.params.genre}%`}
        }
    }).then(data => {
        let GenreIds = [];
        let genreData = data;
        for (let elements of data){
            GenreIds.push(elements.id);
        }
        musicGenre.findAll({
            where: {
                genreId: {[Op.in]: GenreIds}
            }
        }).then(data => {
            let idsMusic = [];
            let dataMusicGenre = data;
            for (let elements of data){
                idsMusic.push(elements.musicId);
            }
            Music.findAll({
                attributes: ['id', 'title', 'publishedAt'],
              where: {
                id: {[Op.in]: idsMusic}
              },
              include: [{
                model: periodMusic,
                required: false
            }]})
            .then(data => {
                for (let elements of data){
                    let genres = [];
                    for (let elementsMusicGenre of dataMusicGenre){
                        if(elementsMusicGenre.musicId == elements.id){
                            for (let elementsGenres of genreData){
                                if(elementsMusicGenre.genreId == elementsGenres.id){
                                    genres.push(elementsGenres.genre_name);
                                }
                            }
                        }
                    }
                    elements.setDataValue("genreName",genres);
                }
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occured while retrieving instruments"
                })
            })
        })
    })
}
exports.findByCompositor = async (req,res) => {
    Compositor.findAll({
    }).then(data => {
        let massive = [];
        let compositorData = data;
        for (let elements of data){
            let fullname = elements.firstName + " " + elements.lastName;
            if(fullname.indexOf(req.params.compositorName) != -1) {
                massive.push(elements.id);
            };
        }
        musicCompositor.findAll({
            where: {
                compositorId: {[Op.in]: massive}
            }
        }).then(data => {
            let idsMusic = [];
            let dataMusicCompositor = data;
            for (let elements of data){
                idsMusic.push(elements.musicId);
            }
            Music.findAll({
                attributes: ['id', 'title', 'publishedAt'],
                where: {
                    id: {[Op.in]: idsMusic}
                },
                include: [{
                    model: periodMusic,
                    required: false
                }]
            })
            .then(data => {
                for (let elements of data){
                    let compositors = [];
                    for (let elementsMusicCompositor of dataMusicCompositor){
                        if(elementsMusicCompositor.musicId == elements.id){
                            for (let elementsCompositor of compositorData){
                                if(elementsMusicCompositor.compositorId == elementsCompositor.id){
                                    compositors.push(elementsCompositor.firstName + " " + elementsCompositor.lastName);
                                }
                            }
                        }
                    }
                    elements.setDataValue("compositorName", compositors);
                }
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occured while retrieving compositors"
                })
            })
        })
    })
}

exports.findByInstrument = async (req,res) => {
    Instrument.findAll({
        where: {
            instrumentName: {[Op.like]: `%${req.params.instrumentName}%`}
        }
    }).then(data => {
        let InstrumentIds = [];
        let instrumentData = data;
        for (let elements of data){
            InstrumentIds.push(elements.id);
        }
        MusicInstrument.findAll({
            where: {
                instrumentId: {[Op.in]: InstrumentIds}
            }
        }).then(data => {
            let idsMusic = [];
            let dataMusicInstrument = data;
            for (let elements of data){
                idsMusic.push(elements.musicId);
            }
            Music.findAll({
                attributes: ['id', 'title', 'publishedAt'],
                where: {
                    id: {[Op.in]: idsMusic}
                },
                include: [{
                    model: periodMusic,
                    required: false
                }]
            })
            .then(data => {
                
                for (let elements of data){
                    let instruments = [];
                    for (let elementsMusicInstrument of dataMusicInstrument){
                        if(elementsMusicInstrument.musicId == elements.id){
                            for (let elementsInstruments of instrumentData){
                                if(elementsMusicInstrument.instrumentId == elementsInstruments.id){
                                    instruments.push(elementsInstruments.instrumentName);
                                }
                            }
                        }
                    }
                    elements.setDataValue("instrumentName", instruments);
                }
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occured while retrieving instruments"
                })
            })
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