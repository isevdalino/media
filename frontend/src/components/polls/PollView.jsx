import { useParams } from "react-router-dom";
import MOCK_POLLS from '../../mock-data/mock-polls';
import React, { useState } from "react";
import { articleViewContainerStyleSheet } from "../articles/articlesStyles";
import "./pollStyles.css";

function PollView() {
    let { id } = useParams();
    let initialState = MOCK_POLLS.find(poll => poll.id == id);
    const [poll, setPoll] = useState(initialState);

    const sumOfTotalVotes = poll.answers
        .map(answer => answer.votes)
        .reduce((accumulator, currentValue) => accumulator + parseInt(currentValue));

    const [totalVotes, setTotalVotes] = useState(sumOfTotalVotes);

    const [voted, setVoted] = useState(poll.hasUserVoted);

    const submitVote = (e) => {
        if (voted === false) {
            const voteSelected = e.target.dataset.id;
            const voteCurrent = poll.answers[voteSelected].votes;
            poll.answers[voteSelected].votes = voteCurrent + 1;
            setTotalVotes(totalVotes + 1);
            setVoted(true);

            // const options = {
            //     method: "POST",
            //     body: JSON.stringify(voteData),
            //     headers: { "Content-Type": "application/json" },
            // };
            // fetch(url, options)
            //     .then((res) => res.json())
            //     .then((res) => console.log(res));
        }
    };


    const articleViewContainerStyle = articleViewContainerStyleSheet();

    let pollOptions;
    if (poll.answers) {
        pollOptions = poll.answers.map((item) => {
            return (
                <li key={item.id}>
                    <button onClick={submitVote} data-id={item.id}>
                        {item.option}
                        <span>- {item.votes} Votes</span>
                    </button>
                </li>
            );
        });
    }

    return (
        <div style={articleViewContainerStyle} >
            <div className="poll">
                <h1>{poll.question}</h1>
                <ul className={voted ? "results" : "options"}>
                    {pollOptions}
                </ul>
                <p>Total Votes: {totalVotes}</p>
            </div>
        </div>
    );
}

export { PollView };