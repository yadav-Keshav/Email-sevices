require('dotenv').config();
const express = require('express');
const res = require('express/lib/response');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());



app.post("/", async (req, res) => {
    try {
        if (!req.body.email) {
            return res.json({
                "success": false,
                "message": "Email cannot be Empty"
            })
        }
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD,
            },
        })
        await transporter.sendMail({
            from: process.env.USER,
            to: req.body.email,
            text: req.body.text

        })
        return res.json({
            "success": true,
            "message": "Message Sucessfully sent"
        })
    }
    catch (err) {
        return res.json({
            "success": false,
            "message": err.message
        })
    }
})

app.listen(4000, () => {
    console.log('Server is Listening on Port : 4000');
})