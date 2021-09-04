var express = require('express');
var router = express.Router();
const Users = require('./models').users;
const Favourites = require('./models').favs;
let jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/getUser', async (req, res) => {
  try{
    console.log('user body =', req.body);
    // console.log('users =',Users.find())
      let doc = await Users.findOne({email: req.body.email,password: req.body.password});
      if(doc === null){throw new Error('User not available');}
      // console.log("enc =",process.env.ENC_KEY)
      // let _doc = Object.assign(doc,{_id:doc._id.toString()});
      doc = JSON.parse(JSON.stringify(doc));
      // let _doc = Object.assign(doc,{_id:doc._id.toString()});
      // console.log('doc=',doc);
      let token = jwt.sign(doc,process.env.ENC_KEY);
      console.log("token =",token);
      // let token = doc
      req.session.token = token;
      let favs = await Favourites.findOne({email: req.body.email});
      res.status(200).send({message:"success",token:token,favourites:favs.favourites});
  }
  catch(err){
      console.log(err);
      res.status(500).send({message: err.message});
  }
})

router.post('/addUser', async (req, res) => {
  var user = new User(req.body)
  await user.save(async (err,results)=>{
    if(err){console.log(err); res.status(500).send({message:err.message});}
    let favs = new Favourites({email:results.email,favourites:[]})
    let doc = JSON.parse(JSON.stringify(results));
    let token = jwt.sign(doc,process.env.ENC_KEY);
    await favs.save((err,results)=>{
      if(err){console.log(err); res.status(500).send({message:err.message});}
      res.status(200).send({message:"Added user",token:token,favourites:results.favourites});
    })
  })
});

module.exports = router;
