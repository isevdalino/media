import React, { useState } from "react";
import { postComment } from "../../server-requests/requests";
import { commentItemStyleSheet } from "./commentStyles";

function CreateCommentView({ articleId, setOnCommentAdded }) {
    const commentItemStyle = commentItemStyleSheet();
    const [commentData, setCommentData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        postComment(articleId, commentData.newComment)
            .then(data => {
                setOnCommentAdded(data);
                return data;
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
        </div>
    );
}

export { CreateCommentView };