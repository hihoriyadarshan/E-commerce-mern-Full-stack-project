import { Fragment } from "react";
import React from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css"
import Product from "./Product.js"

const product = {
    name:"Blue Tshirt",
    images:[{url: "https://i.ibb.co/DRST11n/1.webp"}],
    price: "₹3000",
    _id: "Darshan",


}

const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome To Multi-Mart</p>
        <h1>Find Amazing Products Below</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

     <h2 className="homeHeading">Featured Products</h2>

     <div className="container" id="container">
     <Product product={product} />
     <Product product={product} />
     <Product product={product} />
     <Product product={product} />
     <Product product={product} />
     <Product product={product} />
     <Product product={product} />
     <Product product={product} />

     </div>

    </Fragment>
  );
}

export default Home;
