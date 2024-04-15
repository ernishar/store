import React, { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import UpdateProduct from "./UpdateProduct";
import { Link } from "react-router-dom";

import { Button, Col, Row } from "react-bootstrap";
import DeleteProduct from "./DeleteProduct";

const ListProducts = () => {
  const { products, fetchProducts } = useContext(UserContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{
        paddingTop: "100px",
      }}
    >
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {products.length === 0 && (
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h3>No Products Found, Please Add Some Products</h3>
              <Link to="/create/product">
                <Button variant="primary">Add Product</Button>
              </Link>
            </Col>
          </Row>
        )}
        {products.map((product) => {
          const productImagesArray = JSON.parse(product.productImages);
          return (
            <div className="m-4" key={product.productId}>
              <div
                className="card border-0 rounded-0 shadow"
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
                    </div>
                    <div className="col-2">
                      <i className="bi bi-bookmark-plus fs-2"></i>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-around align-items-center">
                  <div className="col-4">
                    <h5>₹ {product.productPrice}</h5>
                  </div>
                  <div className="d-flex col-4 justify-content-center">
                    <UpdateProduct product={product} />
                    <DeleteProduct productId={product.productId} />
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
