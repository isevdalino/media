import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { hasMoreElementsInList } from "../../constants/common";
import { ITEMS_COUNT } from "../../constants/constants";
import { fetchComments } from "../../server-requests/requests";
import { CommentList } from "./CommentList";
import { CreateCommentView } from "./CreateCommentView";

function CommentSectionView({ articleId, setIsUserLoggedInState }) {
    let [comments, setComments] = useState([]);
    let [onCommentAdded, setOnCommentAdded] = useState("");
    const [hasMoreElements, setHasMoreElements] = useState(true);

    const fetchCommentsFunction = () => {
        fetchComments(articleId, comments.length + ITEMS_COUNT)
            .then(newComments => {
                if (hasMoreElementsInList(comments, newComments, ITEMS_COUNT)) {
                    setHasMoreElements(false);
                }
                setComments(newComments);
            });
    };

    useEffect(() => fetchCommentsFunction(), [onCommentAdded]);

    const containerStyle = {
        margin: "10% auto auto auto",
        width: "60%",
        background: "#c0bebe",
        padding: "5px",
    };

    const previousCommentsStyle = {
        height: "500px",
        overflow: "auto",
    };

    return (
        <div style={containerStyle}>
            <h3>Comments:</h3>
            <CreateCommentView articleId={articleId} setOnCommentAdded={setOnCommentAdded} setIsUserLoggedInState={setIsUserLoggedInState} />

            <div id="scrollableDiv" style={previousCommentsStyle}>
                <InfiniteScroll
                    dataLength={comments.length}
                    next={fetchCommentsFunction}
                    hasMore={hasMoreElements}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    <div>
                        <CommentList comments={comments} />
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
}

export { CommentSectionView };

