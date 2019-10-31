const bcrypt = require('bcrypt')

const User = require('../models/user')

exports.signup = (req, res, next) => {
  // hashing the password with bcrypt
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      console.log('hashing password', hash)
      const user = new User({
        email: req.body.email,
        password: hash
      })
      console.log(user)
      user.save().then(
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
          if (!valid) {
            console.log('password is invalid', valid)
            return res.status(401).json({ error: new Error('invalid password') })
          }
          // sending userId and token to the front end
          console.log('valid user, logging in', valid)
          res.status(200).json({
            userId: user._id,
            token: 'token'
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

// exports.signup = (req, res, next) => {
//   // hashing the password with bcrypt
//   bcrypt.hash(req.body.password, 10).then(
//     (hash) => {
//       const user = new User({
//         email: req.body.email,
//         password: hash
//       })
//       console.log(user)
//       user.save().then(
//         () => {
//           console.log('user created succesfully')
//           res.status(201).json({
//             message: 'user added successfully'
//           })
//         }
//       ).catch((error) => {
//         console.log('user not saved', error)
//         res.status(500).json({ error: error })
//       })
//     }
//   )
// }

// exports.login = (req, res, next) => {
//   // Finding the user based on email 
//   // and comparing hashed password with entered password
//   User.findOne({ email: req.params.email }).then(
//     (user) => {
//       if (!user) {
//         return res.status(401).json({
//           error: new Error('user not found')
//         })
//       }
//       console.log('logged in user', user);
//       // Comparing the entered password with the hashed password from bcrypt
//       bcrypt.compare(req.body.password, user.password).then(
//         (valid) => {
//           if (!valid) {
//             return res.status(401).json({
//               error: new Error('incorrect password')
//             })
//           }
//           console.log('valid password')
//           res.status(200).json({
//             userId: user._id,
//             token: 'token'
//           })
//         }
//       ).catch(error => res.status(500).json({ error: error }))
//     }
//   ).catch(error => res.status(500).json({ error: error }))
// }

