import React, { Component } from "react";
import { useRouter } from 'next/router';
import Cookies from "js-cookie";

  function Nav(props) {
    let navItems = Cookies.get('token')?[{Item:"Latest",Route:"/discover/latest"},{Item:"Popular",Route:"/discover/popular"},{Item:"Favourites",Route:"/discover/favourites"}]:[{Item:"Latest",Route:"/discover/latest"},{Item:"Popular",Route:"/discover/popular"}]
    let router = useRouter();
    return (<div className="container">
    <ul class="nav nav-pills">
    {navItems.map((nav)=>router.pathname.split("/").includes(nav.Item.toLowerCase())?(<li class="nav-item">
    <a class="nav-link active" onClick={()=>router.push(nav.Route)} aria-current="page" href="#">{nav.Item}</a>
  </li>):(<li class="nav-item">
  <a class="nav-link" onClick={()=>router.push(nav.Route)} aria-current="page" href="#">{nav.Item}</a>
</li>))}
</ul>
{props.children}
    </div>)
  }

export default Nav;
