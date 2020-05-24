import React, { useState, useEffect } from "react";
import { Checkbox, Box, Divider } from "@material-ui/core";
import "./style.css";

function CheckItem(props) {
  const a=()=>{
    props.filter("category", props.categogyId);
  }
  return (
    <Box key={props.index + new Date()}>
      <Checkbox
        value={props.categogyId}
        name = {props.categogyId}
        onChange={a}
      />
      {props.categogy}
      <Divider />
    </Box>
  );
}

export default CheckItem;
