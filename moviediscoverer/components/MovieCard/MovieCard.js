import React, { useState } from "react";
import {useDispatch} from "react-redux";
import Cookies from "js-cookie";

let dispatch,load,setLoad;

function addFavorite(id){
  var requestOptions = {
    method: 'POST',
    body: JSON.stringify({token: Cookies.get('token')}),
    redirect: 'follow'
  };
  
  fetch(`${process.env.NEXT_PUBLIC_API_POINT}/addFavourites/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      dispatch({type: 'PUSHMOVIE',payload:id});
      setLoad(state => !state);
    })
    .catch(error => console.log('error', error));
}

function MovieCard(props) {
  dispatch = useDispatch();
  [load,setLoad] = useState(props.favourite);
  return (
    <div style={{ width: "20%", height: "2%" }} class="col">
      {Cookies.get('token')?(load?(<button type="button" class="btn btn-lg btn-primary" disabled>Added to favourites</button>):
      (<button type="button" class="btn btn-lg btn-primary" onClick={()=>addFavorite(props.id)}>Add to favourites</button>)):
      ""
    }
      <div class="card rounded-3">
        <img
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${props.image}`}
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <div class="container">
            <div class="row">
              <div class="col" style={{ width: "10px" }}>
                <p class="text-truncate">{props.title}</p>
              </div>
              <div class="col">
                <span class="fw-bold">Rating : </span>
                {props.rating}
              </div>
            </div>
            <div class="row">
              <div class="col">
                <p class="text-truncate">{props.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
