import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const User = ({ errors, touched, values, status }) => {
    return(
        <div classname="user-form">
            <h1>User Form</h1>
                <Form>
                    <Field type="text" name="name" placeholder="Your Name"></Field>
                    <Field type="text" name="email" placeholder="Email"></Field>
                    <Field type="text" name="password" placeholder="Password"></Field>
                    <div>Check this box when you agree to our TOS.</div>
                    <Field type="checkbox" name="checkbox"></Field>
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

  })(User);

export default FormikUser;