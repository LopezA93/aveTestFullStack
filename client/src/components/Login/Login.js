import { useFormik } from "formik";
import * as yup from "yup";
import './style/login.scss'
import Button from "@mui/material/Button";
import TextField from "@mui/joy/TextField";
import { Container } from "@mui/material";
import { login } from "../../services/db";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const validationSchema = yup.object({
    user: yup
      .string("Enter your User")

      .required("User is required"),
    password: yup
      .string("Enter your password")
      .required("Password is required"),
  });

  const onSubmit = async (values) => {
    try {
      setError(null);
      setLoading(true);
      const response = await login(values);

      if (response.data.error) {
        setError(response.data.error);
        return;
      }
      setUser(response.data);
      localStorage.setItem("login", JSON.stringify(response.data));

      navigate("/tareas");
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("login");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      return;
    }
  }, []);
  return (
    <Container className="boxLogin">
      <div className="errForm">{error ? error.toUpperCase() : ""}</div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Login</h1>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="user"
              name="user"
              label="User"
              value={formik.values.user}
              onChange={formik.handleChange}
              error={formik.touched.user && Boolean(formik.errors.user)}
              helperText={formik.touched.user && formik.errors.user}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              className="btnLogin"
              color="success"
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          </form>
        </>
      )}
    </Container>
  );
};
export default Login;
