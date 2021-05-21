const mailgun = require("mailgun-js");
const DOMAIN = "sandbox395a7cc56d064fceaec420d32e07c539.mailgun.org";
const mg = mailgun({apiKey: process.env.EMAIL_API_KEY, domain: DOMAIN});

const emailContent = (email, userName)=>{
    const data = {
        from: "Mailgun Sandbox <postmaster@sandbox395a7cc56d064fceaec420d32e07c539.mailgun.org>",
        to: email,
        subject: "Welcome to Task-Manager Application",
        text: `Welcome to Task Manager APP, ${userName}, please enjoy the services.`
    }

    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
}

const accountCancellation = (email, userName) =>{
    const data = {
        from: "Mailgun Sandbox <postmaster@sandbox395a7cc56d064fceaec420d32e07c539.mailgun.org>",
        to: email,
        subject: "Cancellation of Task-Manager service",
        text: `Goodbye, ${userName}, please let us know the reason behind cancelling the service, which will help us to improve.`
    }

    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
}

module.exports = {
    emailContent,
    accountCancellation

}
