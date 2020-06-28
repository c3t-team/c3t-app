import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ListOrder from "./listOrder";
import "./style.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: "rgba(67,171, 146,0.4)",
    // width: "100%"

    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

function OrderManager() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  useEffect(() => {
    console.log("huhuhuh");
  }, []);
  return (
    <div className={classes.root}>
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
          <Tab label="Book" {...a11yProps(1)} />
          <Tab label="Chờ xác nhận" {...a11yProps(2)} />
          <Tab label="Chờ lấy hàng" {...a11yProps(3)} />
          <Tab label="Đang giao" {...a11yProps(4)} />
          <Tab label="Đã giao" {...a11yProps(5)} />
          {/* <Tab label="Đã hủy" {...a11yProps(6)} /> */}
          {/* <Tab label="Trả hàng/hoàn tiền" {...a11yProps(6)} /> */}
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <ListOrder status="ALL" />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <ListOrder status="BOOK" />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <ListOrder status="PAID" />
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        <ListOrder status="ORDERED" />
      </TabPanel>
      <TabPanel value={value} index={4} dir={theme.direction}>
        <ListOrder status="SHIPPING" />
      </TabPanel>
      <TabPanel value={value} index={5} dir={theme.direction}>
        <ListOrder status="PAYED" />
      </TabPanel>
      {/* <TabPanel value={value} index={6} dir={theme.direction}>
        <ListOrder status="CANCEL" />
      </TabPanel> */}
      {/* <TabPanel value={value} index={6} dir={theme.direction}>
          <ListOrder></ListOrder>
        </TabPanel> */}
    </div>
  );
}

export default OrderManager;
