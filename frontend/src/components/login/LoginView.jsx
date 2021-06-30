import React, { useState } from 'react';
import { validEmail } from './validations';
import './loginStyles.css';
import { SERVER_ADDRESS, HOME } from '../../constants/Paths';
import { useHistory } from 'react-router';
import { USER_EMAIL_LOCAL_STORAGE_KEY, USER_LOGIN_TOKEN_LOCAL_STORAGE_KEY } from '../../constants/constants';
import { resetPassword} from "../../server-requests/requests";

function LoginView({ setIsUserLoggedInState }) {
    const [user, setUser] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [errorUiList, setErrorUiList] = useState([]);
    const [passwordReseted, setPasswordReseted] = useState(false);

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = JSON.stringify({ email: user.email, password: user.password });
        console.log(body);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        };
        fetch(SERVER_ADDRESS + "users/login", requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                localStorage.setItem(USER_LOGIN_TOKEN_LOCAL_STORAGE_KEY, data.token)
                localStorage.setItem(USER_EMAIL_LOCAL_STORAGE_KEY, user.email)
                setIsUserLoggedInState(true);
                history.push(HOME);
            })
    }

    const changeErrorsWith = function (newErrors) {
        setFormErrors(newErrors);

        let errorList = Object.keys(formErrors).map(
            key => (<li key={key} className="error-style">{formErrors[key]}</li>)
        );
        setErrorUiList(errorList);
    }

    const handleChange = function (e) {
        const name = e.target.name;
        const value = e.target.value;
        let currentFormErrors = formErrors;

        switch (name) {
            case 'email':
                if (!value || !validEmail(value)) {
                    currentFormErrors[name] = `Email address is invalid`;
                } else {
                    delete currentFormErrors[name];
                    setUser({ ...user, email: value });
                }
                break;
            case 'password':
                setUser({ ...user, password: value });
                break;
            default:
                break;
        }

        changeErrorsWith(currentFormErrors);
    };

    const resetPasswordFunction = function () {
        resetPassword(user.email).then(data => setPasswordReseted(true))
    };

    if(passwordReseted){
        setPasswordReseted(false)
        return (
            <div className="auth-wrapper">
                <div className="auth-inner" >
                    <h3>Login</h3>
                    <ul>{errorUiList}</ul>
                    <form noValidate onSubmit={handleSubmit}>
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
                            <span><button type='submit' className="btn btn-primary btn-block">Login</button></span>
                            <span> <button type='button' className="btn btn-primary btn-block" onClick={resetPasswordFunction}>Reset password</button></span>                 
                        </div>
                         <div>{alert(`Your password was resetted. Find your new password at ${user.email}`)}</div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner" >
                <h3>Login</h3>
                <ul>{errorUiList}</ul>
                <form noValidate onSubmit={handleSubmit}>
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
                        <span><button type='submit' className="btn btn-primary btn-block">Login</button></span>
                        <span> <button type='button' className="btn btn-primary btn-block" onClick={resetPasswordFunction}>Reset password</button></span>                 
                    </div>
                </form>
            </div>
        </div>
    );
}

export { LoginView };