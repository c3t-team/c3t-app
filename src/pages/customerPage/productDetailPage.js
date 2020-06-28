import React from "react";
import ProductDetail from "../../components/customer/productDetail";

function ProductDetailPage(props) {
  console.log("id", "1111111111");
  return (
    <div className="container">
      <ProductDetail id={props.match.params.id} />
    </div>
  );
}

export default ProductDetailPage;
