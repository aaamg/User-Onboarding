import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const User = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);
    //console.log('this is touched: ', touched);
    // console.log(values);

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

                    <button 
                        type="submit"
                        name="button"
                        >Submit</button>

                    <p>User info below: </p>
                </Form>
                
                {users.map(user => (
                    <ul key={user.id}>
                        <li>Name: {user.name}</li>
                        <li>Email: {user.email}</li>
                        <li>Password: {user.password}</li>
                    </ul>
                    ))}
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
        name: Yup.string()
            .required("Must put in a name"),
        email: Yup.string()
            .email("E-mail is not valid")
            .required("E-mail is required"),
        password: Yup.string()
            .min(5, "Password must be at least 5 characters and no more than 10")
            .max(10, "Your password is over 10 characters!")
            .required("Must put in a password"),
        checkbox: Yup.bool()
            .test(
                'checkbox',
                'You must agree to our Terms of Service',
                value => value === true
                )
                .required(
                    'You must agree to our Terms of Service'
                ),
              
      }),

        handleSubmit(values, { setStatus }) {
            axios.post('https://reqres.in/api/users/', values)
            .then(res => {
                console.log("SUBMIT FIRING");
                setStatus(res.data);
            })
            .catch(err => console.log(err.response));
        }

  })(User);

export default FormikUser;

//trying to get submit to work below vvvvv 

// handleSubmit(values, { setStatus}) {
//     axios.post('https://reqres.in/api/users/', values)
//     .then(res => {
//         console.log(res);
//         setStatus(res)
//     })
//     .catch(err => console.log(err.response));
// }


// handleSubmit(values, { setSubmitting, resetForm, setStatus }) {
//     axios.post('https://reqres.in/api/users/', values)
//     .then(res => {
//         console.log("is daaaata commmming",res);
//         setStatus(res.data);
//         resetForm();
//         setSubmitting(true)
//     })
//     .catch(err => console.log(err.response));
//}
