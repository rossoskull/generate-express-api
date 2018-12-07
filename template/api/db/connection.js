const mongoose = require('mongoose')

// Create the connection
mongoose.connect('mongodb://localhost/database', {
	useNewUrlParser: true
})
.catch((err) => {
	console.log(err)
})

// Store the connection
const db = mongoose.connection

module.exports = db