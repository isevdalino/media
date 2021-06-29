import React from 'react';
import { useHistory } from 'react-router';
import { SEARCH } from '../../constants/Paths';
import "./topicsStyles.css";

const Topic = ({ topic }) => {
    const history = useHistory();
    const searchByTopic = () => {
        history.push(SEARCH + '?t=' + topic);
    };

    return (
        <div onClick={searchByTopic}>
            <h4 className="topicStyle">{topic}</h4>
        </div>
    );
}

export default Topic;
