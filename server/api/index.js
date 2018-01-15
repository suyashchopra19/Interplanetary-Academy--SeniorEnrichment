const app = require('express').Router()
module.exports = app


app.get('/', (req, res, next) => res.redirect('/api/campuses'));
app.use('/campuses', require('./campuses'));
app.use('/students', require('./students'));

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
