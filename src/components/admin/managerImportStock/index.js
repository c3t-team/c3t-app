import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import OrderStockList from "./orderStockList";
import { Link } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  }
}));

function ManagerImportStockManager() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px"
        }}
      >
        <button className="outline-button">
          <Link
            to="/admin/makeImportStock"
            style={{ textDecoration: "none", color: "black" }}
          >
            Tạo đơn hàng
          </Link>
        </button>
      </div>

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Tất cả" {...a11yProps(0)} />
          <Tab label="Chờ xác nhận" {...a11yProps(1)} />
          <Tab label="Đang chờ nhận hàng" {...a11yProps(2)} />
          <Tab label=" Đã thanh toán" {...a11yProps(3)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <OrderStockList status = "ALL"></OrderStockList>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <OrderStockList status = "PAID"></OrderStockList>
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <OrderStockList status = "ORDERED"></OrderStockList>
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        <OrderStockList status = "COMPLETED"></OrderStockList>
      </TabPanel>
    </div>
  );
}

export default ManagerImportStockManager;
