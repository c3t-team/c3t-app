import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import { actSignRequest } from "../../actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./style.css";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: "5px",
    width: "100%"
  },
  width200: {
    width: "200px"
  },
  container: {
    paddingBottom: "5%",
    // boxShadow: "-2px 4px 20px 2px rgba(87,70,11,0.7)",
    width: "600px",
    marginTop: "5%"
  },
  tilte: {
    width: "100%",
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "10px",
    color: "#F75F00",
    fontWeight: 600
  },
}));

function Sign(props) {
  const classes = useStyles();

  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false
  });
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    console.log(props.resSign, "yeu tinh");

    if (props.resSign.email) {
      setRedirect(true);
    }
  }, [props.resSign]);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [shipAddress, setShipAddress] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [messagePhone, setMessagePhone] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [messageEmail, setMessageEmail] = useState("");

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const FormError = props => {
    if (props.isHidden) {
      return null;
    }
    return (
      <div className="form-warning">
        <i> {props.errorMessage} </i>
      </div>
    );
  };

  const validatePhone = phone => {
    const regexp = /^\d{10,11}$/;
    // regular expression - checking if phone number contains only 10 - 11 numbers

    if (regexp.exec(phone) !== null) {
      return {
        isInputValid: true,
        errorMessage: ""
      };
    } else {
      return {
        isInputValid: false,
        errorMessage: "Số điện thoại phải có 10 - 11 chữ số."
      };
    }
  };

  const validateEmail = email => {
    const regexp = /^[a-z][a-z0-9_\.]{4,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;

    if (regexp.exec(email) !== null) {
      return {
        isInputValid: true,
        errorMessage: ""
      };
    } else {
      return {
        isInputValid: false,
        errorMessage: "Email chưa đúng"
      };
    }
  };

  const handlePhoneValidation = () => {
    const { isInputValid, errorMessage } = validatePhone(phone);
    setMessagePhone(errorMessage);
    setIsPhoneValid(isInputValid);
  };

  const handleEmailValidation = () => {
    const { isInputValid, errorMessage } = validateEmail(email);
    setMessageEmail(errorMessage);
    setIsEmailValid(isInputValid);
  };

  const isDisableButtonSign = () => {
    if (
      isPhoneValid &&
      isEmailValid &&
      name.length > 0 &&
      address.length > 0 &&
      shipAddress.length > 0 &&
      password.length > 0
    )
      return false;
    return true;
  };
  return (
    <div className = "wrap-sign">
      <div className="background-sign"> </div>
      <div className="conatinerParent">
        {redirect && <Redirect to={"/"} />}
        <div className="container-sign">
          <h3 className={classes.tilte}>ĐĂNG KÍ THÀNH VIÊN</h3>
          <Grid container spacing={4}>
            <Grid
              md={12}
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <div>
                <FormControl>
                  <InputLabel htmlFor="name" className="paddingLabel">
                    Họ và Tên
                  </InputLabel>
                  <Input
                    id="name"
                    className="width400"
                    onChange={e => {
                      setName(e.target.value);
                    }}
                    name="name"
                    style={{ color: "#000", backgroundColor:'#fff' }}
                  />
                  <FormError
                    isHidden={name.length > 0 ? true : false}
                    errorMessage="Không được bỏ trống"
                  />
                </FormControl>
              </div>

              <div>
                <FormControl>
                  <InputLabel htmlFor="name" className= "paddingLabel">
                    Số điện thoại
                  </InputLabel>
                  <Input
                    id="name"
                    type="tel"
                    className= "width400"
                    onChange={e => {
                      setPhone(e.target.value);
                    }}
                    phone="phone"
                    onBlur={handlePhoneValidation}
                    style={{ color: "#000", backgroundColor:'#fff' }}
                  />
                  <FormError
                    isHidden={isPhoneValid}
                    errorMessage={messagePhone}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl>
                  <InputLabel
                    htmlFor="address"
                    className= "paddingLabel"
                  >
                    Địa chỉ
                  </InputLabel>
                  <Input
                    id="address"
                    className="width400"
                    onChange={e => {
                      setAddress(e.target.value);
                    }}
                    name="address"
                    style={{ color: "#000", backgroundColor:'#fff' }}
                  />
                  <FormError
                    isHidden={address.length > 0 ? true : false}
                    errorMessage="Không được bỏ trống"
                  />
                </FormControl>
              </div>
              <div>
                <FormControl>
                  <InputLabel
                    htmlFor="shipAdress"
                    className= "paddingLabel"
                  >
                    Địa chỉ giao hàng
                  </InputLabel>
                  <Input
                    id="shipAdress"
                    className="width400"
                    onChange={e => {
                      setShipAddress(e.target.value);
                    }}
                    name="shipAddress"
                    style={{ color: "#000", backgroundColor:'#fff' }}
                  />
                  <FormError
                    isHidden={shipAddress.length > 0 ? true : false}
                    errorMessage="Không được bỏ trống"
                  />
                </FormControl>
              </div>
              <div>
                <FormControl>
                  <InputLabel
                    htmlFor="email"
                    type="email"
                    className="paddingLabel"
                  >
                    Email
                  </InputLabel>
                  <Input
                    id="email"
                    className="width400"
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                    name="email"
                    onBlur={handleEmailValidation}
                    style={{ color: "#000", backgroundColor:'#fff' }}
                  />
                  <FormError
                    isHidden={isEmailValid}
                    errorMessage={messageEmail}
                  />
                </FormControl>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <FormControl>
                  <InputLabel
                    htmlFor="adornment-password"
                    className="paddingLabel"
                  >
                    Mật khẩu
                  </InputLabel>
                  <Input
                    id="adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    style={{ color: "#000", backgroundColor:'#fff' }}
                    className="width400"
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormError
                    isHidden={password.length > 0 ? true : false}
                    errorMessage="Không được bỏ trống"
                  />
                </FormControl>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className="width400"
                  style={{ backgroundColor: "#F75F00" , marginTop:'10px'}}
                  onClick={() => {
                    props.sign({
                      name,
                      email,
                      address,
                      shipAddress,
                      password,
                      phone
                    });
                  }}
                  disabled={isDisableButtonSign()}
                >
                  Đăng kí
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

const stateMapToProps = state => {
  return {
    resSign: state.sign
  };
};
const dispatchMapToProps = (dispatch, props) => {
  return {
    sign: sign => {
      dispatch(actSignRequest(sign));
    }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(Sign);
