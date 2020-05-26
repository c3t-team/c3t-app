import React, { useState } from "react";
import { Checkbox, Box, Typography, Divider } from "@material-ui/core";
import CheckItem from "../checkItem";

function FilterShoeWomen(props) {
  const RenderItem = () => {
    var result = [];
    console.log("2222", props.categories);
    const categories = props.categories;
    if (categories && categories.length > 0) {
      result = categories.map((categogy, index) => {
        return (
          <CheckItem
            key={index + new Date() + "women"}
            categogy={categogy.name}
            categogyId={categogy._id}
            filter={props.filter}
            index = {index + "women"}
          />
        );
      });
    }
    return result;
  };

  return (
    <>
      <Box
        boxShadow={2}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "15px"
        }}
        mb={5}
      >
        <Box
          fontSize={25}
          mb={2}
          alignItems="center"
          color="#D9A128"
          fontWeight={700}
        >
          GIÀY NỮ
        </Box>
        <RenderItem />
      </Box>
    </>
  );
}

export default FilterShoeWomen;
