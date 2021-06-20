import React from "react";
import { CommentList } from "./CommentList";
import { CreateCommentView } from "./CreateCommentView";

function CommentSectionView({ article, comments }) {
    const containerStyle = {
        margin: "10% auto auto auto",
        width: "60%",
        background: "#c0bebe",
        padding: "5px",
    };

    return (
        <div style={containerStyle}>
            <h3>Comments:</h3>
            <CreateCommentView />
            <CommentList comments={comments} />
        </div>
    );
}

export { CommentSectionView };