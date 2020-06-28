import React , {useState} from "react";
import { Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

function InputItem(props) {

    const onRemove = ()=>{
        props.onRemove(props.index);
    }

    const [content, setContent] = useState(props.input);

    const onChange = (e)=>{
      props.reciveContentInput(props.index, e.target.value);
      setContent(e.target.value);

    }
  return (
    <Grid item>
      <input  min="1" type = {props.type}  value = {content} onChange= {(e)=>onChange(e)}  style = {{padding:"5px 0", border:"1px solid #C4C4C4"}} />
      <DeleteIcon onClick = {onRemove}></DeleteIcon>
    </Grid> 
  );
}
export default InputItem;
