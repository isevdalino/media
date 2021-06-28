import React, { useEffect, useState } from "react";
import { fetchComments } from "../../server-requests/requests";
import { CommentList } from "./CommentList";
import { CreateCommentView } from "./CreateCommentView";

function CommentSectionView({ articleId,setIsUserLoggedInState }) {
    let [comments, setComments] = useState([]);
    let [onCommentAdded, setOnCommentAdded] = useState("");

    useEffect(() => {
        fetchComments(articleId)
            .then(data => {
                setComments(data);
            });
    }, [onCommentAdded]);

    const containerStyle = {
        margin: "10% auto auto auto",
        width: "60%",
        background: "#c0bebe",
        padding: "5px",
    };

    return (
        <div style={containerStyle}>
            <h3>Comments:</h3>
            <CreateCommentView articleId={articleId} setOnCommentAdded={setOnCommentAdded} setIsUserLoggedInState={setIsUserLoggedInState} />
            <CommentList comments={comments} />
        </div>
    );
}

export { CommentSectionView };