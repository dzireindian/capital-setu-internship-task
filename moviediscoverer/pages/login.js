import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import {useRef} from "react";
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import ReactDOM from "react-dom";

let router,dispatch;

// function getFavs(token){
//   var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Cookie", "connect.sid=s%3A6ShlrunnLwByyKdVooEvIYBT52gnFpgv.9GV07Po%2FbE1wUzOrQNs9jM3sWGMZxSvvWG%2F%2FX2NNams");

//     if(event.target.elements.password !== event.target.elements.cpassword){
//       alert("confirmation password is not matching the input password");
//       return;
//     }

//     var raw = JSON.stringify({
//       token: token
//     });

//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow'
//     };

//     fetch("http://localhost:8000/getFavourites", requestOptions)
//       .then(response => response.json())
//       .then(result => {
//         console.log(result)
//         Cookies.set('token', token);
//         dispatch({type:"ADDMOVIES",payload:result.favourites});
//         router.push('/discover');
//       })
//       .catch(error => console.log('error', error));
// }

let registerHandler = async (event) => {
  event.preventDefault();
  var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "connect.sid=s%3A6ShlrunnLwByyKdVooEvIYBT52gnFpgv.9GV07Po%2FbE1wUzOrQNs9jM3sWGMZxSvvWG%2F%2FX2NNams");

    if(event.target.elements.password !== event.target.elements.cpassword){
      alert("confirmation password is not matching the input password");
      return;
    }

    var raw = JSON.stringify({
      "email": event.target.elements.username.value,
      "password": event.target.elements.password.value
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/users/addUser", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if(result.token !== undefined) {
          Cookies.set('token', result.token);
          dispatch({type:"ADDMOVIES",payload:result.favourites});
          router.push('/discover');
          }
        // localStorage.store('token', result.token);
        // getFavs(result.token);
      })
      .catch(error => console.log('error', error));
}

let Register = (props) => {
  return (<div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
  <form role="form" onSubmit={registerHandler}>
    <div class="form-group">
      <input type="email" name="email" id="email" class="form-control input-lg" placeholder="Email Address" tabindex="4"/>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-6">
        <div class="form-group">
          <input type="password" name="password" id="password" class="form-control input-lg" placeholder="Password" tabindex="5"/>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6">
        <div class="form-group">
          <input type="password" name="cpassword" id="password_confirmation" class="form-control input-lg" placeholder="Confirm Password" tabindex="6"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-6"><input type="submit" value="Register" class="btn btn-primary btn-block btn-lg" tabindex="7"/></div>
    </div>
  </form>
</div>)
}

let loginHandler = async (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "connect.sid=s%3A6ShlrunnLwByyKdVooEvIYBT52gnFpgv.9GV07Po%2FbE1wUzOrQNs9jM3sWGMZxSvvWG%2F%2FX2NNams");

    var raw = JSON.stringify({
      "email": event.target.elements.username.value,
      "password": event.target.elements.password.value
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/users/getUser", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if(result.token !== undefined) {
        Cookies.set('token', result.token);
        dispatch({type:"ADDMOVIES",payload:result.favourites});
        router.push('/discover');
        }else{
          alert('Invalid login credentials');
        }
        // getFavs(result.token);
      })
      .catch(error => console.log('error', error));
}

let Login = (props) => {
  dispatch = useDispatch();
  return (<div class="col-md-6 login-form-2">
  <form onSubmit={loginHandler}>
      <div class="form-group">
          <input type="text" name="username" class="form-control" placeholder="Your Email *"/>
      </div>
      <div class="form-group">
          <input type="password" name="password" class="form-control" placeholder="Your Password *"/>
      </div>
      <div class="form-group">
          <input type="submit" class="btnSubmit" value="Login" />
      </div>
  </form>
</div>)
}

export default function Home() {
  let refs = [useRef(null),useRef(null)]
  router = useRouter();
  return (
    <div class="card text-center">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a ref={refs[0]} onClick={() =>{ refs.forEach((ref,ind,arr) => {
            ref.current.className = (ind === 0)? 'nav-link active':'nav-link';
          }
          )
          ReactDOM.render(<Login/>,document.getElementById('card-body') )
        }
        } class="nav-link active" aria-current="true" href="#">Login</a>
        </li>
        <li class="nav-item">
          <a ref={refs[1]} onClick={() =>{
            refs.forEach((ref,ind,arr) => {
              ref.current.className = (ind === 1)? 'nav-link active':'nav-link';
          })
          ReactDOM.render(<Register/>,document.getElementById('card-body') )
        }
        } class="nav-link" href="#">Register</a>
        </li>
      </ul>
    </div>
    <div id='card-body' class="card-body">
      <Login/>
    </div>
  </div>
  )
}
