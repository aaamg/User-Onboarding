import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const User = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);
    console.log('this is touched: ', touched);
    useEffect(() => {
        if (status) {
          setUsers([...users, status]);
        }
      }, [status]);
    
    return(
        <div className="user-form">
            <h1>User Form</h1>
                <Form>
                    <Field 
                        type="text" 
                        name="name" 
                        placeholder="Your Name" 
                        />
                    {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                    )}

                    <Field 
                        type="text" 
                        name="email" 
                        placeholder="Email" 
                        />
                    {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                    )}

                    <Field 
                        type="text" 
                        name="password" 
                        placeholder="Password" 
                        />
                    {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                    )}

                    <div>Check this box when you agree to our TOS.</div>
                    <Field 
                        type="checkbox" 
                        name="checkbox"
                        checked={values.checkbox} 
                        />

                    <button type="button" name="button">Submit</button>
                </Form>
        </div>
    );
  };

  const FormikUser = withFormik({
      mapPropsToValues({ name, email, password, checkbox}) {
          return {
              name: name || "",
              email: email || "",
              password: password || "",
              checkbox: checkbox || false,
          };
      },

      validationSchema: Yup.object().shape({
        name: Yup.string().required("Must put in a name"),
        email: Yup.string().required("Must put in a email"),
        password: Yup.string().required("Must put in a password")
      }),

      handleSubmit(values, { setStatus}) {
          axios.post('https://reqres.in/api/users/', values)
          .then(res => {
              console.log(res);
              setStatus(res.data)
          })
          .catch(err => console.log(err.response));
      }

  })(User);

export default FormikUser;