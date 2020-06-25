import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ListEmployee from "./listEmpoyee";

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

function EmployeeManager(props) {
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
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          // style = {{backgroundColor:"#c93838"}}
          aria-label="full width tabs example"
        >
          <Tab label="Tất cả" {...a11yProps(0)} />
          <Tab label="Nhân viên bán hàng" {...a11yProps(1)} />
          <Tab label="Nhân viên thủ kho" {...a11yProps(2)} />
          <Tab label="Shiper" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <ListEmployee role="ALL" />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <ListEmployee role="saleman" />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <ListEmployee role="stocker" />
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        <ListEmployee role="shipper" />
      </TabPanel>
    </div>
  );
}
export default EmployeeManager;
