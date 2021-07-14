var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb+srv://project1:project123@cluster0.05muz.mongodb.net/signupform?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error',()=>console.log('MongoDB Connection Error'));
db.once('open',()=>{
    console.log('MongoDB Connection Succesful')
    console.log('Server Running at http://localhost:3000 \nCtrl+Click to Open')
})
app.post("/signup",(req,res)=>{
    var name = req.body.name; 
    var email = req.body.email;
    var phone = req.body.phone;
    var aadhar = req.body.aadhar;
    var address = req.body.address;
    var doseNO = req.body.doseNO;
    var vacName = req.body.vacName;

    var data = {
        "name": name,
        "email": email,
        "phone": phone,
        "aadhar": aadhar,
        "address": address,
        "doseNO": doseNO,
        "vacName": vacName
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted")
    });
    return res.redirect('/view')
})

app.get('/',(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html');
}).listen(3000);


const dbSchema = {
    name: String,
    email: String,
    phone: String,
    aadhar: String,
    address: String,
    doseNO: String,
    vacName: String
}

const mydb = mongoose.model('mydb',dbSchema)

app.get('/view',(req,resp)=>{
    db.collection('users').find().toArray((err,result)=>{
        if(err) throw(err)
        resp.send(result)
    })
})

console.log("Listening on port 3000")