import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ProducDetailtItem from "./productDetailItem";
import {
  atcGetProductsRequest,
  atcSearchProductRequest
} from "../../../actions";
import { connect } from "react-redux";
import SearchBar from "material-ui-search-bar";
import { ReactMUIDatatable } from "react-material-ui-datatable";
import { IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#F5F5F5",
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #Fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  input: {
    marginLeft: "50px",
    width: "300px",
    height: "30px"
  }
}));

function ManagerProductDetail(props) {
  const classes = useStyles();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    props.getProducts();
  }, []);

  const renderProductItem = () => {
    var result = "";
    if (props.products && props.products.length > 0) {
      result = props.products.map((product, index) => {
        return (
          <ProducDetailtItem
            key={index}
            product={product}
            index={index}
          ></ProducDetailtItem>
        );
      });
    }
    return result;
  };

  const search = async () => {
    if (filter !== "") await props.search(filter);
    console.log("12334", props.products);
  };
  const clearSearch = () => {
    setFilter("");
    props.getProducts();
  };
  const columns = [
    {
      name: "name",
      label: "Tên sản phẩm"
    },
    {
      name: "categories.parent.name",
      label: "Loại cha"
    },
    {
      name: "categories.name",
      label: "Loại con"
    },
    {
      name: "inventory",
      label: "Số lượng tồn kho"
    },
    {
      name: "amoutSold",
      label: "Số lượng bán ra"
    },
    {
      name:"favorited",
      label:'Lượt thích'
    },
    {
      name: "status",
      label: "Trạng thái"
    }
  ];
  const renderDataTable = products => {
    console.log("product-detail", products);
    if (products && products.length > 0) {
      products.map((product, index) => {
        if (product.detail && product.detail.length > 0) {
          let inventory = 0;
          let amountSold = 0;
          product.detail.map((item, index) => {
            inventory += parseInt(item.inventory);
            amountSold += parseInt(item.amountSold);
          });
          products[index].inventory = inventory;
          products[index].amoutSold = amountSold;
        }
      });
    }
    return (
      <ReactMUIDatatable
        data={products}
        columns={columns}
        rowActions={({ row, rowIndex }) => (
          <React.Fragment>
            <IconButton
              onClick={() => {
                console.log("Xóa nè 2", row);
              }}
            >
              <Link
                to={{
                  pathname: `/admin/product-detail/${row._id}`
                }}
                style = {{color:'#6c6c6c'}}
                
              >
                <VisibilityIcon />
              </Link>
            </IconButton>
            
          </React.Fragment>
        )}
      />
    );
  };
  return (
    <>
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: "20px"
        }}
      >
        <div style={{ width: "400px" }}>
          <SearchBar
            hintText="Tìm kiếm sản phẩm"
            onChange={text => {
              setFilter(text);
            }}
            onRequestSearch={search}
            value={filter}
            style={{
              margin: "0 auto",
              maxWidth: 400
            }}
          />
        </div>
        <div>
        <button className="cancel-search" onClick={clearSearch}>
          Hủy tìm kiếm
        </button>
      </div>
      </div>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>STT</StyledTableCell>
            <StyledTableCell align="center">Tên sản phẩm</StyledTableCell>
            <StyledTableCell align="center"> Loại sản phẩm</StyledTableCell>
            <StyledTableCell align="center">Số lượng tồn kho</StyledTableCell>
            <StyledTableCell align="center">Số lượng bán ra</StyledTableCell>
            <StyledTableCell align="center">Chi tiết</StyledTableCell>
            <StyledTableCell align="center">Trạng Thái</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderProductItem()}</TableBody>
      </Table> */}

      <div>{renderDataTable(props.products)}</div>
    </>
  );
}

const stateMapToProps = (state, props) => {
  return {
    products: state.products
  };
};
const dispatchMapToProps = (dispatch, props) => {
  return {
    getProducts: () => {
      dispatch(atcGetProductsRequest(false));
    },
    search: filter => {
      dispatch(atcSearchProductRequest(filter));
    }
  };
};
export default connect(
  stateMapToProps,
  dispatchMapToProps
)(ManagerProductDetail);
