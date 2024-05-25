const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        secure: true,
        auth: {
            user: 'atshiawelo@yahoo.com',
            pass: 'ufjdvgnampjgcjrx' // Use your app-specific password
        }
    });

    const mailOptions = {
        from: 'atshiawelo@yahoo.com',
        to: 'atshiawelo@yahoo.com',
        subject: 'New message from InfoNite Cafe website',
        text: `
            Name: ${name}\n
            Email: ${email}\n
            Message: ${message}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('An error occurred while sending the email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully.');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
