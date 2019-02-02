const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '20mb', extended:true}));

app.post('/saveimg', (req, res, next) => {
    console.log('Request on /saveimg');
    if(req.body === undefined) res.send({status: 504});
    
    let base64Data = req.body['data'].replace(/^data:image\/png;base64,/, "");
    let dir = __dirname + '/data/'+req.body.id;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFile(dir+'/'+req.body['id']+'.png', base64Data, 'base64', function(err) {
        if(err) console.log(err);
    });

    res.send({status:'SUCCESS'});
});


app.post('/mouselog', (req, res, next) => {
    console.log('Request on /mouselog');
    if(req.body === undefined) res.send({status: 504});  
    let dir = __dirname + '/data/'+req.body.id;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFile(dir+'/'+req.body['id']+'.txt', JSON.stringify(req.body, null, 4), function(err) {
        if(err) console.log(err);
        else console.log('Fild with id '+req.body.id+' created successfully.');
    });

    res.send({status:'SUCCESS'});

});

app.post('/contentlog', (req, res, next) => {
    console.log('Requestion on /contentlog');
    if(req.body === undefined) res.send({status: 504});  
    let dir = __dirname + '/data/'+req.body.id;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFile(dir+'/'+req.body['id']+'.html', req.body.html, function(err) {
        if(err) console.log(err);
        else console.log('HTML  File with id '+req.body.id+' created successfully.');
    });

    res.send({status:'SUCCESS'});
})

const server = app.listen(33333, function() {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Listening on port 33333...");
})