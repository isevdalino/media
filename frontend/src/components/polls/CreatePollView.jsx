import React, { useState } from "react";
import { articleViewContainerStyleSheet } from "../articles/articlesStyles";
import { postPoll} from "../../server-requests/requests";
import { useHistory } from 'react-router';
import { onLogoutClick } from '../login/logoutHandler';
import { SIGN_IN } from "../../constants/Paths";

function CreatePollView({setIsUserLoggedInState}) {

    const articleViewContainerStyle = articleViewContainerStyleSheet();

    const [options, setOptions] = useState([]);
    const [title, setTitle] = useState("");
    const history = useHistory();

    const handleOptionInput = function (i, e) {
        let newOptions = JSON.parse(JSON.stringify(options));
        newOptions[i] = e.target.value
        setOptions(newOptions);
    };

    const addInputs = function () {
        let newOptions = JSON.parse(JSON.stringify(options));
        newOptions.push("");
        setOptions(newOptions);
    };

    const removeInputs = function () {
        let newOptions = JSON.parse(JSON.stringify(options));
        newOptions.pop();
        setOptions(newOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validOptions = 0;
        for (let i = 0; i < options.length; i++) {
            if (options[i]) { validOptions++; }
        }

        if (!title || validOptions < 2) {
            console.log('Each poll must have a title and a minimum of 2 options!');
            return;
        }

        postPoll(title,options).then(data => {
            if(data.status == 403){
                onLogoutClick(history,SIGN_IN, setIsUserLoggedInState) 
            }else{
                data.json().then(data =>history.push("/polls/"+data._id))
            }
        })
    };

    const leftButtonStyle = {
        float: "left",
    };

    const rightButtonStyle = {
        float: "right",
    };

    var inputNodes = options.map((input, i) => {
        return (
            <div key={i} className="form-group">
                <label htmlFor={"Input" + (i + 1)}>{"Poll Item " + (i + 1)}</label>
                <input
                    className="form-control input-lg"
                    id={"Input" + (i + 1)}
                    type="text"
                    value={options[i].text}
                    onChange={(e) => handleOptionInput(i, e)}
                    placeholder={"Poll Item " + (i + 1)}
                />
            </div>
        );
    });

    return (
        <div style={articleViewContainerStyle}>
            <h3 className="text-center">Create your New Poll</h3>
            <form noValidate onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control input-lg" value={title} placeholder="Title" onChange={e => setTitle(e.target.value)} />
                {inputNodes}
                <label >{"Adjust Number of Options"}</label><br />
                <input type="button" className="btn btn-primary" style={leftButtonStyle} value="+" onClick={addInputs} />
                <input type="button" className="btn btn-danger" style={leftButtonStyle} value="-" onClick={removeInputs} />
                <input type="submit" className="btn btn-success pull-right" style={rightButtonStyle} value="Create Poll"/>
            </form>
        </div>
    );
}

export { CreatePollView };