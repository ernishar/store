import React, { useEffect, useContext, useState } from "react";
import { FaCartPlus } from "react-icons/fa";

import axios from "axios";
import { Button } from "react-bootstrap";
import { UserContext } from "../../Context/UserContext";
import UpdateProduct from "./UpdateProduct";

const ListProducts = () => {
  const { products } = useContext(UserContext);
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        marginTop: "100px",
      }}
    >
      <h3>Products</h3>

      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {products.map((product) => {
          const productImagesArray = JSON.parse(product.productImages);
          return (
            <div className="m-4" key={product.productId}>
              <div
                className="card border-2 shadow p-3 bg-body-tertiary rounded"
                style={{
                  width: "300px",
                }}
              >
                <img
                  src={`http://localhost:4000/assets/productImages/${productImagesArray[0]}`}
                  className="card-img-top"
                  alt="..."
                  style={{
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body mt-3 mb-3">
                  <div className="row">
                    <div className="col-10">
                      <h4 className="card-title">{product.productName}</h4>
                      <p className="card-text">{product.productDesc}</p>
                      <h5 className="card-text">  {product.categoryName}</h5>
                    </div>
                    <div className="col-2">
                      <i className="bi bi-bookmark-plus fs-2"></i>

                    </div>
                    {/* <div className="col-2">
                      <i class="bi bi-trash3-fill fs-2"></i>
                    </div> */}
                  </div>
                </div>
                <div className="d-flex justify-content-around align-items-center">
                  <div className="col-4">
                    <h5>₹ {product.productPrice}</h5>
                  </div>
                  <div className="col-4">
                    <UpdateProduct product={product} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProducts;
