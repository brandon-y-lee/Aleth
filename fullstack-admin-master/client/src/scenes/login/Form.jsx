import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import FlexBetween from "components/FlexBetween";
import Session from "react-session-api";

const registerSchema = yup.object().shape({
  Company: yup.string().required("required"),
  Website: yup.string().url("invalid website url").required("required"),
  Address: yup.string().required("required"),
  City: yup.string().required("required"),
  State: yup.string().required("required"),
  Zip: yup.string().required("required"),
  Employees: yup.string(),
  Type: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  Company: "",
  Website: "",
  Address: "",
  City: "",
  State: "",
  Zip: "",
  Employees: "",
  Type: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
  ID: ""
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";


  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }

    const savedUserResponse = await fetch(
      "http://localhost:5001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:5001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
  
    if (loggedInResponse.ok) {
      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
      if (loggedIn && loggedIn.token) {
        // Save the token in local storage after successful login
        localStorage.setItem("token", loggedIn.token);
        localStorage.setItem("user", JSON.stringify(loggedIn.user.supplier));
      
        console.log("Local Storage User", localStorage.getItem("user"));
        console.log("Local Storage Token", localStorage.getItem("token"));
        navigate("/order");
      } else {
        console.log("Logged in status:", loggedInResponse.status);
      }
    } else {
      console.log("Error during login", await loggedInResponse.json());
    }
  };
  // Existing register and login functions
  // ...

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="Company"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Company}
                  name="Company Name"
                  error={Boolean(touched.Company) && Boolean(errors.Company)}
                  helperText={touched.Company && errors.Company}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Website"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Website}
                  name="Website"
                  error={Boolean(touched.Website) && Boolean(errors.Website)}
                  helperText={touched.Website && errors.Website}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Street Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Address}
                  name="Address"
                  error={Boolean(touched.Address) && Boolean(errors.Address)}
                  helperText={touched.Address && errors.Address}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="City"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.City}
                  name="City"
                  error={Boolean(touched.City) && Boolean(errors.City)}
                  helperText={touched.City && errors.City}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="State"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.State}
                  name="State"
                  error={Boolean(touched.State) && Boolean(errors.State)}
                  helperText={touched.State && errors.State}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Zip"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Zip}
                  name="Zip"
                  error={Boolean(touched.Zip) && Boolean(errors.Zip)}
                  helperText={touched.Zip && errors.Zip}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Employees"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Employees}
                  name="Employees"
                  error={Boolean(touched.Employees) && Boolean(errors.Employees)}
                  helperText={touched.Employees && errors.Employees}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Type"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Type}
                  name="Type"
                  error={Boolean(touched.Type) && Boolean(errors.Type)}
                  helperText={touched.Type && errors.Type}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
               label="ID"
               onBlur={handleBlur}
               onChange={handleChange}
               value={values.ID}
               name="ID"
               error={Boolean(touched.id) && Boolean(errors.id)}
               helperText={touched.id && errors.id}
               sx={{ gridColumn: "span 4" }}
             />
            <TextField
              type="password"
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <Button type="submit" variant="contained" color="primary">
              {isLogin ? "Login" : "Register"}
            </Button>
            {isLogin && (
              <Box>
                <Typography
                  variant="body2"
                  onClick={() => setPageType("forgot")}
                  sx={{ cursor: "pointer", color: palette.text.secondary }}
                >
                  Forgot Password?
                </Typography>
              </Box>
            )}
            <FlexBetween>
              <Typography variant="body2">
                {isLogin ? "New User?" : "Already have an account?"}
              </Typography>
              <Button
                endIcon={<EditOutlinedIcon />}
                onClick={() =>
                  setPageType(isLogin ? "register" : "login")
                }
              >
                {isLogin ? "Register" : "Login"}
              </Button>
            </FlexBetween>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;