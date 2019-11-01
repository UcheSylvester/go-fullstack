const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // Getting token from header
  // Decoding token using jwt.verify
  // getting userId for the decoded token to verify user
  try {
    const token = req.headers.authorization.split(' ')[1];
    const docodedToken = jwt.verify(token, 'LDDLSLldieooddmldvlnlxldldldkf')
    const userId = docodedToken.userId;
    console.log('AUTH', userId)

    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID!'
    } else {
      next()
    }

  } catch {
    res.status(401).json({
      error: new Error('Invalid Request!')
    })
  }
}