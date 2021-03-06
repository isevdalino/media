import React from 'react';
import { getReadableDateTime } from '../../constants/common';
import { commentItemStyle } from './commentStyles';

function CommentList({ comments }) {
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
    };

    const textAlignLeftStyle = {
        textAlign: "left",
    };

    const isArrayEmpty = comments === undefined || comments.length == 0;

    return (
        <div style={containerStyle}>
            {isArrayEmpty ?
                <h4>There aren't any comments yet.</h4>
                :
                comments.map(comment => (
                    <div style={commentItemStyle} key={comment.id}>
                        <div style={textAlignLeftStyle}>{comment.username}:</div>
                        <h4 style={textAlignLeftStyle}>{comment.comment}</h4>
                        <div style={{ textAlign: "right" }}>{getReadableDateTime(comment.createdAt)}</div>
                    </div>
                ))
            }
        </div>
    );
};

export { CommentList };

