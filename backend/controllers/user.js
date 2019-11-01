const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.signup = (req, res, next) => {
  // hashing the password with bcrypt
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      console.log('hashing password', hash)
      const newUser = new User({
        email: req.body.email,
        password: hash
      })
      console.log(newUser)
      // saving the new user to the DB
      newUser.save().then(
        () => {
          console.log('creating new user')
          res.status(201).json({ message: 'User created successfully' })
        }
      ).catch(
        error => {
          console.log('user not created', error)
          res.status(500).json({ error: error })
        }
      )
    }
  )
}

exports.login = (req, res, next) => {
  // Find the user with the email entered and compare entered password with the password from DB
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (!user) {
        console.log('user does not exist')
        return res.status(401).json({ error: new Error('User does not exist') })
      }

      // comparing the password entered with the hashed passowrd in DB
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          // When password is invalid
          if (!valid) {
            console.log('password is invalid', valid)
            return res.status(401).json({ error: new Error('invalid password') })
          }

          // console.log('user', user._id)

          // generating token jwt
          const token = jwt.sign(
            { userId: user._id },
            "LDDLSLldieooddmldvlnlxldldldkf",
            { expiresIn: '24h' }
          );
          // sending userId and token to the front end
          console.log('valid user, token', token)
          res.status(200).json({
            userId: user._id,
            token: token
          })
        }
      ).catch(
        (error) => {
          console.log('bcrypt error', error)
          res.status(500).json({ error: error })
        }
      )
    }
  ).catch(
    (error) => {
      console.log('mongoose error', error)
      res.status(500).json({ error: error })
    }
  )
}
