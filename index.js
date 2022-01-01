require('dotenv').config();
const express = require('express');
const res = require('express/lib/response');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


process.on('uncaughtException', (err) => {
    console.log(`Server is stopped due to ${err.message}`);
})


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
            subject: req.body.subject,
            text: req.body.text,
            html: req.body.html

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
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`Server is Listening on Port : ${PORT}`);
})

process.on('unhandledRejection', (err) => {
    console.log(`Server is Stopped due to ${err.message}`)
    server.close();
    process.exit(1);
})
