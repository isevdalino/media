import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { hasMoreElementsInList } from "../../constants/common";
import { ITEMS_COUNT } from "../../constants/constants";
import { CREATE_POLL } from "../../constants/Paths";
import { fetchPolls } from "../../server-requests/requests";
import { createArticleButtonStyleSheet, createArticleIconStyleSheet, scrollableContainerStyleSheet } from '../articles/articlesStyles.js';
import PollList from './PollList';

function ShowAllPollsView({ isUserLoggedInState }) {

    const [polls, setPolls] = useState([]);
    const containerStyle = scrollableContainerStyleSheet();
    const buttonStyle = createArticleButtonStyleSheet();
    const addArticleIconStyle = createArticleIconStyleSheet();

    const [hasMoreElements, setHasMoreElements] = useState(true);

    const fetchPollsFunction = () => {
        fetchPolls(polls.length + ITEMS_COUNT)
            .then(newPolls => {
                if (hasMoreElementsInList(polls, newPolls, ITEMS_COUNT)) {
                    setHasMoreElements(false);
                }
                setPolls(newPolls);
            });
    };

    useEffect(() => fetchPollsFunction(), []);

    return (
        <div>
            {isUserLoggedInState &&
                <Link to={CREATE_POLL}>
                    <button type="submit" className="btn btn-primary btn-block" style={buttonStyle}>
                        New poll
                        <img style={addArticleIconStyle} src={'pencil_writing_icon.png'} />
                    </button>
                </Link>
            }
            <div id="scrollableDiv" style={containerStyle}>
                <InfiniteScroll
                    dataLength={polls.length}
                    next={fetchPollsFunction}
                    hasMore={hasMoreElements}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    <div>
                        <PollList polls={polls} />
                    </div>
                </InfiniteScroll>
            </div>
        </div >
    );
}

export { ShowAllPollsView };

