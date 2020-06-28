import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactExport from "react-export-excel";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function Report() {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const classes = useStyles();
  const [isOrder, setIsOrder] = useState(false);
  var [total, setTotal] = useState(0);

  const RenderMonth = () => {
    var result = [];
    result = months.map((item, index) => {
      return <option key={index}>{item}</option>;
    });
    return result;
  };
  const RenderYear = () => {
    var result = [];
    const yearNow = new Date().getFullYear();
    for (let i = 2016; i <= yearNow; i++) {
      let item = <option key={i}>{i}</option>;
      result.push(item);
    }
    return result;
  };
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2019);
  const [data, setData] = useState([]);
  useEffect(() => {
    // axios(
    //   `http://localhost:1337/api/v1/order-suplier/report?month=${month}&year=${year}`
    // ).then(result => setData(result.data.payload));
  }, [month, year]);

  const RenderReportSuplier = () => {
    setTotal(0);
    var result = [];
    var tempTotal = 0;
    if (data.length > 0) {
      result = data.map((item, index) => {
        tempTotal += parseInt(item.totalPrice);
        return (
          <TableRow key={index}>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell align="center">{item.name}</TableCell>
            <TableCell align="center">
              {isOrder ? item.quantity : item.numberProductOrder}
            </TableCell>
            <TableCell align="center">
              {parseInt(item.totalPrice)
                .toFixed(1)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </TableCell>
          </TableRow>
        );
      });
      setTotal(tempTotal);
      return result;
    }
    return <TableRow align="center">Chưa có thông tin</TableRow>;
  };

  const report = () => {
    setIsOrder(false);
    axios(
      `http://localhost:1337/api/v1/order-suplier/report?month=${month}&year=${year}`
    ).then(result => setData(result.data.payload));
  };

  const reportOrder = () => {
    setIsOrder(true);
    axios(
      `http://localhost:1337/api/v1/orders/report?month=${month}&year=${year}`
    ).then(result => setData(result.data.payload));
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          justifyItems: "center",
          marginBottom: "20px"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            alignItems: "center"
          }}
        >
          <div>Chọn Tháng</div>
          <div>
            <select
              value={month}
              onChange={e => setMonth(e.target.value)}
              style={{
                padding: "10px 0",
                textAlign: "center",
                marginLeft: "10px"
              }}
            >
              <RenderMonth />
            </select>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginLeft: "50px",
            justifyContent: "center",
            justifyItems: "center",
            alignItems: "center"
          }}
        >
          <div>Chọn năm</div>
          <div>
            <select
              value={year}
              onChange={e => setYear(e.target.value)}
              style={{
                padding: "10px 0",
                textAlign: "center",
                marginLeft: "10px"
              }}
            >
              <RenderYear />
            </select>
          </div>
        </div>

        <div
          style={{
            marginLeft: "40px",
            marginTop: "20px"
          }}
        >
          <button className="outline-button" onClick={report}>
            Báo cáo đơn nhập
          </button>
          <button className="outline-button" onClick={reportOrder}>
            Báo cáo đơn mua
          </button>
        </div>
      </div>
      <div className="table-report">
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell align="center">STT</TableCell>
              <TableCell align="center">Tên nhà cung cấp</TableCell>
              <TableCell align="center">Số lượng hóa đơn</TableCell>
              <TableCell align="center">Tổng giá trị</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <RenderReportSuplier />
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Tổng cộng:{" "}
                {parseInt(total)
                  .toFixed(1)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px"
        }}
      >
        <div>
          <ExcelFile
            element={
              <button
                className="outline-button"
                style={{ display: data.length > 0 ? "block" : "none" }}
              >
                Xuất file
              </button>
            }
          >
            <ExcelSheet data={data} name="report">
              <ExcelColumn label="name" value="name" />
              <ExcelColumn
                label="numberProductOrder"
                value="numberProductOrder"
              />
              <ExcelColumn label="totalPrice" value="totalPrice" />
            </ExcelSheet>
          </ExcelFile>
        </div>
      </div>
    </div>
  );
}

export default Report;
