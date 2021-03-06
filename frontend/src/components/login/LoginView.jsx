import React, { useState } from 'react';
import { validEmail } from './validations';
import './loginStyles.css';
import { useHistory } from 'react-router';
import { USER_LOGIN_TOKEN_LOCAL_STORAGE_KEY,USER_EMAIL_LOCAL_STORAGE_KEY } from '../../constants/constants';
import {login} from "../../server-requests/requests";
import { HOME, RESET_PASSWORD } from "../../constants/Paths";

function LoginView({ setIsUserLoggedInState }) {
    const [user, setUser] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [errorUiList, setErrorUiList] = useState([]);
    const [passwordReseted, setPasswordReseted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        login(user.email,user.password)
            .then(data => {
                if (data.status == 401) {
                    setErrorMessage('Authentication failed');
                }else if(data.status == 404){
                    setErrorMessage('This user is not yet registered');
                }else if (data.status == 400) {
                    data.json().then(data => {setErrorMessage(data.password||data.email)})
                }else{
                    data.json().then(data => {
                        localStorage.setItem(USER_LOGIN_TOKEN_LOCAL_STORAGE_KEY, data.token)
                        localStorage.setItem(USER_EMAIL_LOCAL_STORAGE_KEY, user.email)
                        setIsUserLoggedInState(true);
                        history.push(HOME);
                    })
                }
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
        history.push(RESET_PASSWORD)
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
                        {errorMessage && (
                            <p className="error"> {errorMessage} </p>
                        )}
                </form>
            </div>
        </div>
    );
}

export { LoginView };