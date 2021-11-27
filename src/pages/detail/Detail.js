import React from "react";
// import { useParams } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import productsData from "./productsData";

function Detail(props) {
  const items = JSON.parse(localStorage.getItem("items"));


  const thisProduct = items.find(
    (item) => item.id === props.match.params.productId
  );

const {name} = thisProduct;
const {temp} = thisProduct.main;

  // console.log(thisProduct);
  // console.log(thisProduct.cloud[0].icon);
  return (
    <div>
      <h1>Cyti:{name}</h1>
      <h2>Temp:{temp}</h2>
      <h3>
        Cloud:{thisProduct.cloud[0].description}
        <img
          src={`http://openweathermap.org/img/wn/${thisProduct.cloud[0].icon}@2x.png`}
          alt=""
        />
      </h3>
      <h2>{}</h2>
      {/* <p>Price: ${thisProduct.price}</p>
      <p>{thisProduct.description}</p> */}
    </div>
  );
}

export default withRouter(Detail);
