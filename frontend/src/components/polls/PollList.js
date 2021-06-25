import React from 'react';
import { useHistory } from 'react-router-dom';

const PollList = ({ polls }) => {
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
    };
    const cardStyle = {
        backgroundColor: "white",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        width: "100%",
        margin: "10px auto",
        textAlign: "center",
        fontFamily: "arial",
        padding: "10px",
        cursor: "pointer"
    };

    const history = useHistory();
    const handleClick = id => { history.push('/polls/' + id) };

    return (
        <div style={containerStyle}>
            {polls.map(poll => (
                <div style={cardStyle} key={poll.id} onClick={(e) => handleClick(poll.id, e)} >
                    <h4>{poll.question}</h4>
                </div>
            ))}
        </div>
    );
}

export default PollList;
