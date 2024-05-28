import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { register } from '../../services/authService';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

const Register = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await register(values);
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h2>Register</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="email" name="email" placeholder="Email" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
