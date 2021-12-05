//Express
const express = require('express');

//web-push
const webpush = require('web-push');

//body-parser
const bodyParser = require('body-parser');

//path
const path = require('path');

//using express 
const app = express();

//using bodyparser
app.use(bodyParser.json())

//storing the keys in variables
const publicVapidKey = 'BDnTbgNtPOdS0xB4HUbBQv6tCZaKToXfFz0_kqYbP5F_EgEuOcfajHkfhc3QcGhT-1KEDwm3R0Bvloq3Cv8fBGA';
const privateVapidKey = 'PwXZTE-jnAvm32NtHKjiIZ4W39k1bAH0Wc2YifLbv7U';

//setting vapid keys details
webpush.setVapidDetails('mailto:benzekri.mohamed@gmail.com', publicVapidKey,privateVapidKey);

//subscribe route
app.post('/subscribe', (req, res)=>{
    //get push subscription object from the request
    const subscription = req.body;

    //send status 201 for the request
    res.status(201).json({})


    for (let i = 0; i<10;i++) {
        setTimeout(_ => {
            //create paylod: specified the detals of the push notification
            const payload = JSON.stringify({title: `Notification no ${i}` });

            //pass the object into sendNotification fucntion and catch any error
            webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
        },5000*i)
    }
})

//set the static path 
app.use(express.static(path.join(__dirname, "client")));

const port = 3000;
app.listen(port, ()=>{
    console.log(`server started on ${port}`)
});