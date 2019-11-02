const Thing = require('../models/thing')
const fs = require('fs')

exports.createThing = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  req.body.thing = JSON.parse(req.body.thing)

  // Giving the thing to be saved a structure using our model
  const thing = new Thing({
    title: req.body.thing.title,
    description: req.body.thing.description,
    imageUrl: url + '/images/' + req.file.filename,
    price: req.body.thing.price,
    userId: req.body.thing.userId
  })

  // Saving the thing to the database
  thing.save().then(
    () => {
      console.log('thing saved succesfully')
      res.status(201).json({ message: 'post saved successfully' })
    }
  ).catch(() => res.status(400).json({ error: error }))
}

exports.getOneThing = (req, res, next) => {
  // Getting a single thing from the database
  Thing.findOne({ _id: req.params.id }).then(
    (thing) => res.status(200).json(thing)
  ).catch(
    error => res.status(404).json({ error: error })
  )
}

exports.modifyThing = (req, res, next) => {
  /***
   * MODIFYING A THING
   * 
   * Checking if thing contains an uploaded file(image)
   * 
   */

  let thing = new Thing({ _id: req.params._id })
  if (req.file) {
    const url = req.protocol + '://' + req.get('host')
    req.body.thing = JSON.parse(req.body.thing)
    thing = {
      _id: req.params.id,
      title: req.body.thing.title,
      description: req.body.thing.description,
      imageUrl: url + '/images/' + req.file.filename,
      price: req.body.thing.price,
      userId: req.body.thing.userId
    }

  } else {
    thing = {
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    }
  }

  Thing.updateOne({ _id: req.params.id }, thing).then(
    () => res.status(201).json({ message: 'updated successfully' })
  ).catch(
    (error) => res.status(400).json({ error: error })
  )
}

exports.deleteThing = (req, res, next) => {
  // finding a thing in the database to be deleted
  // Deleting the images(files) from the image folder befor deleting
  Thing.findOne({ _id: req.params.id }).then(
    (thing) => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        
        Thing.deleteOne({ _id: req.params.id }).then(
          () => res.status(200).json({ message: 'deleted successfully' })
        ).catch(
          (error) => res.status(400).json({ error: error })
        )
      })
    }
  )

  // Thing.deleteOne({ _id: req.params.id }).then(
  //   () => res.status(200).json({ message: 'deleted successfully' })
  // ).catch(
  //   (error) => res.status(400).json({ error: error })
  // )
}

exports.getAllThings = (req, res, next) => {
  Thing.find().then(
    (things) => res.status(200).json(things)
  ).catch(
    (error) => res.status(404).json({
      error: error
    })
  )
}