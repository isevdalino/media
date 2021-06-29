import React from 'react';
import Topic from './Topic';

const TopicList = ({ topics }) => {
    const container = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    };

    const isArrayEmpty = topics === undefined || topics.length == 0;

    return (
        <div style={container}>
            {isArrayEmpty ?
                <h4>There aren't any topics yet.</h4>
                :
                topics.map(topic => (
                    <Topic key={topic.id} topic={topic.name} />
                ))
            }
        </div>
    );
}

export default TopicList;
