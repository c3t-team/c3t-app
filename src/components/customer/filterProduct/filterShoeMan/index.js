import React from "react";
import { Box } from "@material-ui/core";
import CheckItem from "../checkItem";

function FilterShoeMan(props) {
  const RenderItem = () => {
    var result = [];
    const categories = props.categories;
    if (categories && categories.length > 0) {
      result = categories.map((categogy, index) => {
        return (
          <CheckItem
            key={index + new Date() + "man"}
            categogy={categogy.name}
            categogyId={categogy._id}
            filter={props.filter}
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
          GIÀY NAM
        </Box>
       <RenderItem/>
      </Box>
    </>
  );
}

export default FilterShoeMan;
