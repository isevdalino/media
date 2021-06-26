import React, { useState } from "react";
import { articleViewContainerStyleSheet } from "../articles/articlesStyles";
import { postPoll } from "../../server-requests/requests";

function CreatePollView() {

    const articleViewContainerStyle = articleViewContainerStyleSheet();

    const [options, setOptions] = useState([]);
    const [title, setTitle] = useState("");

    const handleOptionInput = function (i, e) {
        let newOptions = JSON.parse(JSON.stringify(options));
        newOptions[i].text = e.target.value
        setOptions(newOptions);
    };

    const addInputs = function () {
        let newOptions = JSON.parse(JSON.stringify(options));
        newOptions.push({ text: '' });
        setOptions(newOptions);
    };

    const removeInputs = function () {
        let newOptions = JSON.parse(JSON.stringify(options));
        newOptions.pop();
        setOptions(newOptions);
    };

    const postPoll = function (e) {
        e.preventDefault();
        let titleJson = JSON.parse(JSON.stringify(title));
        let optionsJson = JSON.parse(JSON.stringify(options));
        let validOptions = 0;
        for (let i = 0; i < options.length; i++) {
            if (options[i].text) { validOptions++; }
        }

        if (!titleJson || validOptions < 2) {
            console.log('Each poll must have a title and a minimum of 2 options!');
            return;
        }

        console.log('Will post the poll here!');
        postPoll(title,options)
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
            <form>
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control input-lg" value={title} placeholder="Title" onChange={e => setTitle(e.target.value)} />
                {inputNodes}
                <label >{"Adjust Number of Options"}</label><br />
                <input type="button" className="btn btn-primary" style={leftButtonStyle} value="+" onClick={addInputs} />
                <input type="button" className="btn btn-danger" style={leftButtonStyle} value="-" onClick={removeInputs} />
                <input type="submit" className="btn btn-success pull-right" name="postPoll" style={rightButtonStyle} value="Create Poll" noValidate onClick={postPoll} />
            </form>
        </div>
    );
}

export { CreatePollView };