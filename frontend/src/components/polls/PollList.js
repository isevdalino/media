import React from 'react';
import { useHistory } from 'react-router-dom';
import { pollCardStyle } from './pollStyles';

const PollList = ({ polls }) => {
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
    };

    const history = useHistory();
    const handleClick = id => { history.push('/polls/' + id) };

    const isArrayEmpty = polls === undefined || polls.length == 0;

    return (
        <div style={containerStyle}>
            {isArrayEmpty ?
                <h4>There aren't any polls yet.</h4>
                :
                polls.map(poll => (
                    <div style={pollCardStyle} key={poll.id} onClick={(e) => handleClick(poll.id, e)} >
                        <h4>{poll.question}</h4>
                    </div>
                ))
            }
        </div>
    );
}

export default PollList;
