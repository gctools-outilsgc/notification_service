require('dotenv').config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmail(context, email){

    if(email.html == false){
        var msg = {
            to: email.to,
            from: email.from,
            subject: email.subject,
            text: email.body
        }
            
    }
    else {
        var msg = {
            to: email.to,
            from: email.from,
            subject: email.subject,
            html: email.body
        }

    }
    sgMail
    .send(msg)
    .then(() => {
    })
    .catch(error => {

    //Log friendly error
    return error.toString()
   
  })

}

module.exports = {
    sendEmail
}