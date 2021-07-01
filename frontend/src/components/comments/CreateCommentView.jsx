import React, { useState } from "react";
import { postComment } from "../../server-requests/requests";
import { onLogoutClick } from '../login/logoutHandler';
import { useHistory } from 'react-router';
import { SIGN_IN } from "../../constants/Paths";
import { commentItemStyle } from "./commentStyles";

function CreateCommentView({ articleId, setOnCommentAdded,setIsUserLoggedInState }) {
    const [commentData, setCommentData] = useState({});
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        postComment(articleId, commentData.newComment)
            .then(data => {
                if(data.status == 403){
                    onLogoutClick(history,SIGN_IN, setIsUserLoggedInState) 
                }else if (data.status == 400) {
                    data.json().then(data => {setErrorMessage(data.comment)})
                  }else{
                    setOnCommentAdded(data);
                    return data;
                }
            })
    };

    const handleChange = function (e) {
        const name = e.target.name;
        const value = e.target.value;

        switch (name) {
            case 'newComment':
                setCommentData({ ...commentData, newComment: value });
                break;
            default:
                break;
        }
    };

    const buttonStyle = {
        margin: "1%"
    };

    return (
        <div>
            <form noValidate onSubmit={handleSubmit}>
                <textarea rows="2" cols="50" name="newComment" style={commentItemStyle} placeholder="Comment..." type="text" noValidate onBlur={handleChange} />
                <input style={buttonStyle} type="submit" />
            </form>
            {errorMessage && (
                            <p className="error"> {errorMessage} </p>
                        )}
        </div>
    );
}

export { CreateCommentView };