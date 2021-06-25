import React from 'react';
import Topic from './Topic';

const TopicList = ({ topics }) => {
    const container = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start"
    };

    return (
        <div style={container}>
            {topics.map(topic => (
                <Topic key={topic.id} topic={topic} />
            ))}
        </div>
    );
}

export default TopicList;
