const express = require('express')
const app = express()
const MongoClient = require ('mongodb')
var ObjectId = require('mongodb').ObjectID;
let db;
const port = 1100;
app.use(express.json())
const uri = "mongodb+srv://TheRealDjTay:Ta1234@cluster0.uqljm.mongodb.net/";
MongoClient.connect(uri, {useUnifiedTopology:true}, function(err,client){
    console.log("Connected to MongoDB successfully");
    db = client.db("mongodb-challenge");
})
app.listen(port, function(req,res){
    console.log("listening at port:" + port)
})
app.get('/getBlogs',function (req,res){
    db.collection('blogs').find({}).toArray(function(error,document){
        if (error) throw error;
        for(let counter = 0; counter < document.length;counter++){
            res.write(" Name " + document[counter].title + " Description " + document[counter].content + " ObjectID: " + document[counter]._id + '\n' );
        }
        res.end();
    })
})
app.post('/customBlog', function (req,res){
    db.collection('blogs').insertOne({
        title: req.body.title,
        content: req.body.content
    },
    function(err,result){
        if(err) throw err;
        res.send ('Hero Added successfully');
        })
})



// app.get('/getBlogById', function (req,res){
//     db.collection('blogs').findOne({
//         _id:ObjectId()
//     }, function(err,result){
//         if(err) throw err;
//         })
// })



// app.get('/findBlog', function (req,res){
//     db.collection('blogs').findOne({
//         id: req.body.ObjectID
//     });

//     console.log(req.body);
// })    


// app.get('/findBlog', function (req,res){
//     db.collection('blogs').findOne({
//         id:ObjectID
//     },
//     function(err,result){
//         if(err) throw err;
//         req.get ('ObjectId');
//         console.log(req.body);
//         })
// })


// app.get('/findBlog', async function (req,res){
//     db.collection('blogs').findOne({
//         _id:ObjectId()
//     }, function(err,result){
//         if(err) throw err;
//         })
// })

// app.post('/BlogId', async function getId(){
//     const response = await fetch(uri);
//     const data = await response.json();
//     console.log(req.body._id);
// })

app.post('/findHeroByID', function(req,res){
    db.collection('heros').findOne({
        _id: req.body._id
    })
    db.collection('heros').find({"_id" : ObjectId(req.body._id)}).toArray( function(error, documents){
    if (error) throw error;
    console.log(documents)
    res.send(documents)
    })
})