import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { atcDeleteCaregoryRequest } from "../../../../actions";
import { connect } from "react-redux";
const usestyles = makeStyles(theme => ({
  icon: {
    color: "#D9A128",
    "&:hover": {
      color: "#F75F00",
      cursor: "pointer"
    }
  }
}));
function KindItem(props) {
  const classes = usestyles();
  const category = props.category;
  const numberCategorySub = category.children.length;

  const remove = id => {
    props.deleteCategory(id);
  };
  const editCategory = category => {
    let data = category;
    props.edit(data);
  };
  const renderContent = () => {
    console.log("render: ");
    var result = [];
    if (numberCategorySub === 0) {
      result[0] = (
        <TableRow key={0}>
          <TableCell rowSpan={0} align="center">
            {category.name}
          </TableCell>
          <TableCell align="center"></TableCell>
          <TableCell></TableCell>
        </TableRow>
      );
    } else {
      result[0] = (
        <TableRow key={0}>
          <TableCell rowSpan={numberCategorySub} align="center">
            {category.name}
          </TableCell>
          <TableCell align="center">{category.children[0].name}</TableCell>
          <TableCell>
            <EditIcon
              className={classes.icon}
              style={{marginRight:'20px'}}
              onClick={() => editCategory(category.children[0])}
            >
              {" "}
            </EditIcon>{" "}
            <DeleteIcon
              className={classes.icon}
              onClick={() => remove(category.children[0]._id)}
            >
              {" "}
            </DeleteIcon>
          </TableCell>
        </TableRow>
      );

      var i = 0;
      for (i = 1; i < numberCategorySub; i++) {
        let data = category.children[i];
        result[i] = (
          <TableRow key={i}>
            <TableCell align="center">{data.name}</TableCell>
            <TableCell>
              <EditIcon
                className={classes.icon}
                style={{marginRight:'20px'}}
                onClick={() => editCategory(data)}
              >
                {" "}
              </EditIcon>
              <DeleteIcon
                className={classes.icon}
                onClick={() => props.delete(data._id)}
              ></DeleteIcon>
            </TableCell>
          </TableRow>
        );
      }
    }
    console.log("render: ", numberCategorySub);
    return result;
  };
  return <>{renderContent()}</>;
}

const dispatchMapToProps = (dispatch, props) => {
  return {
    deleteCategory: id => {
      dispatch(atcDeleteCaregoryRequest(id));
    }
  };
};
export default connect(
  null,
  dispatchMapToProps
)(KindItem);
