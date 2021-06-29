import React, { useState } from "react";
import { articleViewContainerStyleSheet } from "../articles/articlesStyles";
import { useHistory } from 'react-router';
import { postEvent } from "../../server-requests/requests";
import { SIGN_IN } from "../../constants/Paths";
import { onLogoutClick } from '../login/logoutHandler';

function CreateEventView({ setIsUserLoggedInState }) {
    const eventViewContainerStyle = articleViewContainerStyleSheet();
    const inputStyle = {
        display: "flex",
        flexDirection: "column",
    };

    const inputFieldStyle = {
        margin: "15px"
    };

    const [eventData, setEventData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [errorUiList, setErrorUiList] = useState([]);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        postEvent(eventData.eventName, eventData.eventDescription).then(data => {
            console.log("data");
            if (data.status == 403) {
                onLogoutClick(history, SIGN_IN, setIsUserLoggedInState);
            } else {
                history.push("/events/" + data.json()._id);
            }
        });
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
            case 'eventName':
                setEventData({ ...eventData, eventName: value });
                break;
            case 'eventDescription':
                setEventData({ ...eventData, eventDescription: value });
                break;
            default:
                break;
        }

        changeErrorsWith(currentFormErrors);
    };

    return (
        <div style={eventViewContainerStyle}>
            <h3 className="text-center">Create your new event</h3>
            <form noValidate onSubmit={handleSubmit}>
                <div style={inputStyle}>
                    <input style={inputFieldStyle} placeholder='Name' type='text' name='eventName' noValidate onBlur={handleChange} />
                    <textarea rows="15" cols="50" style={inputFieldStyle} placeholder='Description' type='text' name='eventDescription' noValidate onBlur={handleChange} />
                </div>
                <input type="submit" />
            </form>
        </div>
    );
}

export { CreateEventView };