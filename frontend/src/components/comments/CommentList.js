import React from 'react';
import { commentItemStyleSheet } from './commentStyles';

function CommentList({ comments }) {
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
    };
    const commentItemStyle = commentItemStyleSheet();

    const textAlignLeftStyle = {
        textAlign: "left",
    };

    return (
        <div style={containerStyle}>
            {comments.map(comment => (
                <div style={commentItemStyle} key={comment.id}>
                    <div style={textAlignLeftStyle}>{comment.username}:</div>
                    <h4 style={textAlignLeftStyle}>{comment.comment}</h4>
                </div>
            ))}
        </div>
    );
};

export { CommentList };
