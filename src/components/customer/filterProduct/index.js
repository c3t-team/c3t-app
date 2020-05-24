import React, { useEffect, useState } from "react";
import "./style.css";
import { atcGetCategoryRequest, actGetProductByFilter } from "../../../actions";
import { connect } from "react-redux";
import FilterShoeMan from "./filterShoeMan";
import FilterShoeWomen from "./filterShoeWomen";
import FilterShoePrice from "./filterShoePrice";

function FilterProduct(props) {
  const [filterCatelogy, setFilterCatelogy] = useState([]);
  const [filterPrice, setFilterPrice] = useState([]);

  useEffect(() => {
    props.getCategory();
  }, []);

  const filter = (kind, value) => {
    let index = -1;
    if (kind == "category") {
      let tempCategory = filterCatelogy;
      index = tempCategory.indexOf(value);

      if (index !== -1) {
        tempCategory.splice(index, 1);
      } else {
        tempCategory.push(value);
      }
      setFilterCatelogy(tempCategory);
    } else {
      setFilterPrice(value);

    }

    console.log("test filter", filterPrice, filterCatelogy);
    // if (filterPrice.length > 0) {
    //   const temp = filterPrice;
    //   temp[0] = temp[0] * 1000;
    //   temp[1] = temp[1] * 1000;
    //   setFilterPrice(temp)
    // }
    
    props.filterProduct(filterCatelogy.join(","), filterPrice.join(","));
  };

  const RenderWomenShoes = () => {
    var result = null;
    if (props.categories && props.categories.length > 0) {
      var i = 0;
      for (i = 0; i < props.categories.length; i++) {
        if (props.categories[i].name == "Giày nữ") {
          if (
            props.categories[i].children &&
            props.categories[i].children.length > 0
          ) {
            return (
              <FilterShoeWomen
                key={new Date() + "women"}
                categories={props.categories[i].children}
                filter={filter}
              />
            );
          }
          break;
        }
      }
    }
    return result;
  };

  const RenderManShoes = () => {
    var result = null;
    console.log("aaa", props.categories);
    if (props.categories && props.categories.length > 0) {
      var i = 0;
      for (i = 0; i < props.categories.length; i++) {
        if (props.categories[i].name == "Giày nam") {
          if (
            props.categories[i].children &&
            props.categories[i].children.length > 0
          ) {
            result = (
              <FilterShoeMan
                key={new Date() + "man"}
                categories={props.categories[i].children}
                filter={filter}
              />
            );
          }
          break;
        }
      }
    }
    return result;
  };
  return (
    <div>
      <RenderWomenShoes />
      <RenderManShoes />
      <FilterShoePrice filter={filter} />
    </div>
  );
}

const stateMapToProps = (state, props) => {
  return {
    categories: state.categories
  };
};
const dispatchMapToProps = (dispatch, props) => {
  return {
    getCategory: () => {
      dispatch(atcGetCategoryRequest());
    },
    filterProduct: (categories, price) => {
      dispatch(actGetProductByFilter(categories, price));
    }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(FilterProduct);
