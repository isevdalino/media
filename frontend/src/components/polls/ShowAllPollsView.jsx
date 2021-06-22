import React, { useState } from "react";
import PollList from './PollList';
import MOCK_POLLS from '../../mock-data/mock-polls';
import { containerStyleSheet, createArticleButtonStyleSheet, createArticleIconStyleSheet } from '../articles/articlesStyles.js'
import { CREATE_POLL } from "../../constants/Paths";
import { Link } from "react-router-dom";

function ShowAllPollsView() {

    const [polls, setPolls] = useState(MOCK_POLLS);
    const containerStyle = containerStyleSheet();
    const buttonStyle = createArticleButtonStyleSheet();
    const addArticleIconStyle = createArticleIconStyleSheet();

    return (
        <div>
            <Link to={CREATE_POLL}>
                <button type="submit" className="btn btn-primary btn-block" style={buttonStyle}>
                    New poll
                    <img style={addArticleIconStyle} src={'pencil_writing_icon.png'} />
                </button>
            </Link>
            <div style={containerStyle}>
                <PollList polls={polls} />
            </div>
        </div>
    );
}

export { ShowAllPollsView };