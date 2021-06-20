import React from 'react';

const TopicList = ({ topics }) => {
    const container = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start"
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
        <div style={container}>
            {topics.map(topic => (
                <div key={topic.id}>
                    <h4 style={card}>{topic.topic}</h4>
                </div>
            ))}
        </div>
    )
}

export default TopicList
