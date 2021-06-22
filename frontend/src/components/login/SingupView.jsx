import React, { useState } from 'react';
import { minMaxLength, validEmail, passwordStrength, userExists, } from './validations';
import './loginStyles.css';
import { SERVER_ADDRESS } from '../../constants/Paths';

function SignupView() {
    const [user, setUser] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [errorUiList, setErrorUiList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = JSON.stringify({ name: user.username, email: user.email, password: user.password, password2: user.confirmpassword });
        console.log(body);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        };
        fetch(SERVER_ADDRESS + "users/register", requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    const changeErrorsWith = function (newErrors) {
        setFormErrors(newErrors);

        let errorList = Object.keys(formErrors).map(
            key => (<li key={key} className="error-style">{formErrors[key]}</li>)
        );
        setErrorUiList(errorList);
    }

    const validateConfirmPassword = function (password, confirmpassword) {
        const errors = formErrors || {};
        if (password !== confirmpassword) {
            errors.confirmpassword =
                'Confirmed password is not matching with password';
            changeErrorsWith(errors);
            return false;
        } else {
            delete errors.confirmpassword;
            changeErrorsWith(errors);
            return true;
        }
    };

    const handleChange = function (e) {
        const name = e.target.name;
        const value = e.target.value;
        let currentFormErrors = formErrors;

        switch (name) {
            case 'username':
                if (minMaxLength(value, 3)) {
                    currentFormErrors[name] = `Username should have minimum 3 characters`;
                } else {
                    delete currentFormErrors[name];
                    setUser({ ...user, username: value });
                }

                break;
            case 'email':
                if (!value || !validEmail(value)) {
                    currentFormErrors[name] = `Email address is invalid`;
                } else {
                    delete currentFormErrors[name];
                    setUser({ ...user, email: value });
                }
                break;
            case 'password':
                if (minMaxLength(value, 6)) {
                    currentFormErrors[name] = 'Password should have minimum 6 characters';
                } else if (passwordStrength(value)) {
                    currentFormErrors[name] =
                        'Password is not strong enough. Include an upper case letter, a number or a special character to make it strong';
                } else {
                    delete currentFormErrors[name];
                    setUser({
                        ...user,
                        password: value,
                    });
                    if (user.confirmpassword) {
                        validateConfirmPassword(
                            value,
                            user.confirmpassword,
                            currentFormErrors
                        );
                    }
                }

                break;
            case 'confirmpassword':
                let valid = validateConfirmPassword(
                    user.password,
                    value,
                    currentFormErrors
                );
                if (valid) {
                    setUser({ ...user, confirmpassword: value });
                }

                break;
            default:
                break;
        }

        changeErrorsWith(currentFormErrors);
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner" >
                <h3>New User Registration Form</h3>
                <ul>{errorUiList}</ul>
                <form noValidate onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input
                            className={
                                formErrors && formErrors.username
                                    ? 'form-control error'
                                    : 'form-control'
                            }
                            placeholder='Username'
                            type='text'
                            name='username'
                            noValidate
                            onBlur={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            className={
                                formErrors && formErrors.email
                                    ? 'form-control error'
                                    : 'form-control'
                            }
                            placeholder='Email'
                            type='email'
                            name='email'
                            noValidate
                            onBlur={handleChange}
                        />
                    </div>
                    <div >
                        <label htmlFor='password'>Password</label>
                        <input
                            className={
                                formErrors && formErrors.password
                                    ? 'form-control error'
                                    : 'form-control'
                            }
                            placeholder='Password'
                            type='password'
                            name='password'
                            noValidate
                            onBlur={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='confirmpassword'>Confirm Password</label>
                        <input
                            className={
                                formErrors && formErrors.confirmpassword
                                    ? 'form-control error'
                                    : 'form-control'
                            }
                            placeholder='Password'
                            type='password'
                            name='confirmpassword'
                            noValidate
                            onBlur={handleChange}
                        />
                    </div>
                    <div>
                        <button type='submit' className="btn btn-primary btn-block" disabled={Object.entries(formErrors || {}).length > 0}>
                            Create Account
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export { SignupView };