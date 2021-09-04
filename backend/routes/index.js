var express = require('express');
var router = express.Router();
var axios = require('axios');
let jwt = require('jsonwebtoken');
const Favourites = require('./models').favs;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getPopular',async (req,res, next) => {
  var config = {
    method: 'get',
    url: `${process.env.API_POINT}/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`,
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    res.status(200).send(response.data);
  })
  .catch(function (error) {
    console.log(error);
    res.status(500).send({"message":error.message})
  });
})

router.get('/getLatest',async (req,res, next) => {
  var config = {
    method: 'get',
    url: `${process.env.API_POINT}/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US`,
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    res.status(200).send(response.data);
  })
  .catch(function (error) {
    console.log(error);
    res.status(500).send({"message":error.message})
  });
})

router.get("/topRated",(req,res,next)=>{
  var axios = require('axios');

  var config = {
    method: 'get',
    url: `${process.env.API_POINT}/movie/top_rated?api_key=${process.env.API_KEY}`,
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    res.status(200).send(response.data);
  })
  .catch(function (error) {
    console.log(error);
    res.status(500).send({"message":error.message})
  });
  
})

router.post('/addFavourites/:id',async function (req, res, next) {
  let user = jwt.verify(req.body.token,process.env.ENC_KEY)
  Favourites.update(
    { email: user.email }, 
    { $push: { favourites: req.params.id } },
    () => res.status(200).send({ message:"Added to favorites"})
  );

})

router.post('/getFavourites',async function (req, res, next) {
  try{
  if(req.body.token !== req.session.token) {res.status(404).send({"message":"unauthorized user"}); return;}
  console.log("token =",req.body,", key =",process.env.ENC_KEY);
  let user = jwt.verify(req.body.token,process.env.ENC_KEY)
  console.log("user after verify = ",user);
  let favourites =  await Favourites.findOne({"email":user.email})
  favourites = favourites.map(async (fav) =>{

    var config = {
      method: 'get',
      url: `${process.env.API_POINT}/find/${fav}?api_key=${process.env.API_KEY}&language=en-US&external_source=imdb_id`,
      headers: { }
    };
    
    let data = await axios(config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send({"message":error.message})
    });


    return data;

  })

  res.status(200).send({"favourites":favourites});
}catch(e){
  console.log(e);
  res.status(500).send({"message":e.message})
}

});

module.exports = router;