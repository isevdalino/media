import React, { useState } from 'react';
import { validEmail } from './validations';
import './loginStyles.css';
import { useHistory } from 'react-router';
import { resetPassword} from "../../server-requests/requests";

function ResetPasswordView() {
    const [user, setUser] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [errorUiList, setErrorUiList] = useState([]);
    const [passwordReseted, setPasswordReseted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        resetPassword(user.email).then(data => setPasswordReseted(true))
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
            default:
                break;
        }

        changeErrorsWith(currentFormErrors);
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
                        <div>
                            <button type='button' className="btn btn-primary btn-block">Reset password</button>                
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
                <h3>Reset password</h3>
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
                    <div>
                        <button type='submit' className="btn btn-primary btn-block">Reset password</button>               
                    </div>
                        {errorMessage && (
                            <p className="error"> {errorMessage} </p>
                        )}
                </form>
            </div>
        </div>
    );
}

export { ResetPasswordView };