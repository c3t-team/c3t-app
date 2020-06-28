import React from "react";
import ProductList from "../../components/customer/productList";
import FilterProduct from "../../components/customer/filterProduct";
import "./style.css";
import CarouselHome from "../../components/customer/carousel/carouselHome";
import { Grid, Container } from "@material-ui/core";
import './style.css'

function CustomHomePage() {
  return (
    <div>
      <Container >
        <CarouselHome></CarouselHome>
        <Grid
          direction="row"
          container
          spacing={2}
        >
          <Grid item md={3} className = "container-filter">
            <FilterProduct />
          </Grid>
          <Grid item md={9} xs={12}>
            <ProductList />
          </Grid>
        </Grid>
        {/* <div className="row mt-3">
          <div className="col-3">
            <FilterProduct />
          </div>
          <div className="col-9">
            <ProductList></ProductList>
          </div>
        </div> */}
      </Container>
    </div>
  );
}

export default CustomHomePage;
