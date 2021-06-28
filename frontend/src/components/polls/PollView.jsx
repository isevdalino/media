import { useParams } from "react-router-dom";
import React, { useState,useEffect } from "react";
import { articleViewContainerStyleSheet } from "../articles/articlesStyles";
import "./pollStyles.css";
import { fetchPoll, putPoll } from "../../server-requests/requests";
import { useHistory } from 'react-router';
import { SIGN_IN } from "../../constants/Paths";
import { onLogoutClick } from '../login/logoutHandler';

function PollView({setIsUserLoggedInState}) {
    let { id } = useParams();
    const [poll, setPoll] = useState([]);
    const [voted, setVoted] = useState(false);
    const [totalVotes, setTotalVotes] = useState(0);
    const [pollOptions, setPollOptions] = useState([]);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchPoll(id).then(poll => {
            setPoll(poll)
            setTotalVotes(getSumOfTotalVotes(poll))
            setVoted(hasUserVoted(poll))
            setPollOptions(getPollOptions(poll))
        });
    }, [voted]);

    function getSumOfTotalVotes(poll){
        return poll.answers
        .map(answer => answer.votes)
        .reduce((accumulator, currentValue) => accumulator + parseInt(currentValue));
    }

    function hasUserVoted(poll){
        const hasUserVoted = false;
        for (var index in poll.voters) {
            if (poll.voters[index] ==  localStorage.getItem('userEmail')){
                hasUserVoted=true;
                break;
            }
        }
        return hasUserVoted
    }
    
    function submitVote (event,poll) {
        if (voted === false) {
            const voteSelected = event.target.dataset.id;
            var answer
            for (var index in poll.answers) {
                if (poll.answers[index]._id == voteSelected ){
                    answer = poll.answers[index].name;
                    break;
                }
            }

            setVoted(true);
            putPoll(poll.id,answer,history).then(data => {
                if (data.status==409){
                    setErrorMessage('You already voted in this poll');
                }
                else if(data.status == 403){
                    onLogoutClick(history,SIGN_IN, setIsUserLoggedInState) 
                } else{
                        history.push("/polls/"+id);
                    }
                })
        }
    };

    const articleViewContainerStyle = articleViewContainerStyleSheet();

    function getPollOptions(poll){
       return poll.answers.map((item) => {
                return (
                    <li key={item._id}>
                        <button onClick={(event) => submitVote(event,poll)} data-id={item._id}>
                            {item.name} - {item.votes} Votes
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
                {errorMessage && (
                <p className="error"> {errorMessage} </p>
                )}
            </div>
        </div>
    );
}

export { PollView };