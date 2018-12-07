const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()

const User = require('../db/models/User')


/**
 * /register/
 * POST
 * body : { fname, lname, email, password, username }
*/
router.post('/', (req, res, next) => {
	// Get values
	const { fname, lname, email, username, password } = req.body

	// REGEX for E-mail validation
	const reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/

	if ( fname === '' || fname == null) {
		res.status(422).json({
			'error': 'firstNameError'
		}).end()
	} else if ( lname === '' || lname == null ) {
		res.status(422).json({
			'error': 'lastNameError'
		}).end()
	} else if ( email === '' || email == null || !reg.test(email) ) {
		res.status(422).json({
			'error': 'emailError'
		}).end()
	} else if ( password.length < 6 || password == null ) {
		res.status(422).json({
			'error': 'passwordError'
		}).end()
	} else if ( username == null || username === '' ) {
		res.status(422).json({
			'error': 'usernameError'
		}).end()
	} else {
		User.findOne( { $or: [{ email: email }, { username: username }] })
		.exec()
		.then(data => {
			if (data) {
				res.status(422).json({
					'error': 'usernameOrEmailExistsError'
				}).end()
			} else {
				// If username or email is not used
				bcrypt.hash(password, 10, (err, password) => {
					if ( err ) {
						res.status(500).json({
							'msg': 'Error while encrypting data. Please try again later.'
						})
					} else {
						const user = new User({ fname, lname, email, username, password })
						user.save()
						.then(() => {
							res.status(200).json({
								'msg': 'Data entered successfuly.'
							}).end()
						})
						.catch(() => {
							res.status(500).json({
								'msg': 'Error while saving data to database. Please try again later.'
							}).end()
						})			
					}		
				})
			}
		})
		.catch(e => {
			console.log(e)
		})
	}

	
})

/**
 * /register/username
 * POST
 * body : { username }
*/
router.post('/username', (req, res, next) => {
	const { username } = req.body
	User.findOne({ username: username }, (err, data) => {
		if (err) {
			res.status(500).json({
				'msg': 'Server error occured. Please try again later...'
			}).end()
		} else {
			if (data) {
				res.status(200).json({
					'msg': 'User with the username exists.',
					'exists': true
				}).end()
			} else {
				res.status(404).json({
					'msg': 'User with the username does not exist.',
					'exists': false
				}).end()
			}
		}
	})
})

/**
 * /register/email
 * POST
 * body : { email }
*/
router.post('/email', (req, res, next) => {
	const { email } = req.body
	User.findOne({ email: email }, (err, data) => {
		if (err) {
			res.status(500).json({
				'msg': 'Server error occured. Please try again later...'
			}).end()
		} else {
			if (data) {
				res.status(200).json({
					'msg': 'User with the email exists.',
					'exists': true
				}).end()
			} else {
				res.status(404).json({
					'msg': 'User with the email does not exist.',
					'exists': false
				}).end()
			}
		}
	})
})

module.exports = router