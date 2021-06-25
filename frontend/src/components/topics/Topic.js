import React from 'react';
import { useHistory } from 'react-router';
import { SEARCH } from '../../constants/Paths';

const Topic = ({ topic }) => {
    const history = useHistory();
    const searchByTopic = () => {
        console.log("Search by topic: " + topic.topic);
        history.push(SEARCH + '?t=' + topic.topic);
    };

    const card = {
        backgroundColor: "white",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        margin: "10px 5px",
        textAlign: "center",
        fontFamily: "arial",
        padding: "15px",
        cursor: "pointer"
    };

    return (
        <div onClick={searchByTopic}>
            <h4 style={card}>{topic.topic}</h4>
        </div>
    );
}

export default Topic;
