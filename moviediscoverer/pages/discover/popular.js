import { useRouter } from 'next/router';
import {useState} from "react";
import { useSelector } from 'react-redux';

import MovieCard from "../../components/MovieCard/MovieCard";
import Nav from "../../components/Nav/Nav";

let load,setLoad;

function getPopular(){
    var myHeaders = new Headers();
myHeaders.append("Cookie", "connect.sid=s%3AyrA-xnaosaj3wpWjwzRIkQW_6xb0qkrP.tBbR9yqOn0YdlZnHf0hamIQp02y1v5QF5Nsz0Y0r6Zo");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${process.env.NEXT_PUBLIC_API_POINT}/getPopular`, requestOptions)
  .then(response => response.json())
  .then(result => {
      setLoad(result.results)
  })
  .catch(error => console.log('error', error));
}

export default function Popular(){
    let router = useRouter();
    [load,setLoad] = useState([]);
    let favs = useSelector(state => state.listMovies);

     if(load) getPopular();
    return (load.length === 0)?(<div class="text-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>):(<Nav><div class="container">
  <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3" style={{marginTop: "1rem"}}>
  {load.map((movie) =>{
      return <MovieCard title={movie.title} image={movie.backdrop_path} rating={movie.vote_average} desc={movie.overview} id={movie.id} favourite={favs.includes(movie.id)}/>
  })}
  </div></div></Nav>)
    
}