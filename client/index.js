const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3001
const mongoose = require('mongoose')
const User = require('./model/userModel.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/login')

	app.post('/api/register', async (req, res) => {
		try {
		  const existingUser = await User.findOne({ email: req.body.email });
		  if (existingUser) {
			return res.status(409).json({ status: 'error', error: 'Email already exists' });
		  }
		  const newPassword = await bcrypt.hash(req.body.password, 10);
		  await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		  });
	  
		  res.status(200).json({ status: 'ok' });
		} catch (err) {
		  res.status(500).json({ status: 'error', error: 'An error occurred' });
		}
	  });
	  
	  app.post('/api/login', async (req, res) => {
		const { email, password } = req.body;
		try {
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(409).json({ status: 'error', error: "Email doesn't exist" });
			}
			const isPasswordValid = await bcrypt.compare(password, user.password);
	
			if (!isPasswordValid) {
				return res.status(401).json({ status: 'error', error: 'Invalid password' });
			}
	
			const token = jwt.sign(
				{ name: user.name, email: user.email },
				'secret123', 
				{ expiresIn: '1h' } 
			);
	
			res.json({ status: 'ok', token });
		} catch (error) {
			console.error(error);
			res.status(500).json({ status: 'error', error: 'An internal server error occurred' });
		}
	});
	

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})