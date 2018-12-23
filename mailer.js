'use strict';
const nodemailer = require('nodemailer');

let teams_list = [{
    team_name: "team_name",
    team_members: [{
        Name: "Anand"
    }, {
        Name: "Hari"
    }]
}];

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "anandshivaunofficial@gmail.com", // generated ethereal user
        pass: "revliSxE3g" // generated ethereal password
    }
});

var sendEMail = (subject, body, mailing_list) => {
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"SSB" <ssb.sap.com>', // sender address
        to: mailing_list, // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body
        html: body // html body
    };


     // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }); 

}

module.exports = sendEMail;

