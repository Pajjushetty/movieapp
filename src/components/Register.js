import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};
    if (!formData.username) formErrors.username = 'Username is required';
    if (!formData.email) formErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Email address is invalid';
    if (!formData.password) formErrors.password = 'Password is required';
    if (!formData.confirmPassword) formErrors.confirmPassword = 'Confirm Password is required';
    else if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = 'Passwords do not match';
    return formErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      console.log('Form submitted', formData);
      localStorage.setItem('registeredUser', JSON.stringify(formData));
      onRegister();
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className='container mt-5'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            id='username'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <div className='invalid-feedback'>{errors.username}</div>}
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            id='confirmPassword'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <div className='invalid-feedback'>{errors.confirmPassword}</div>}
        </div>
        <button type='submit' className='btn btn-primary mt-3'>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
