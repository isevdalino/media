import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { hasMoreElementsInList } from "../../constants/common";
import { ITEMS_COUNT } from "../../constants/constants";
import { CREATE_EVENT } from "../../constants/Paths";
import { fetchEvents } from "../../server-requests/requests";
import EventList from './EventList';
import { createArticleButtonStyleSheet, createArticleIconStyleSheet, scrollableContainerStyleSheet } from '../articles/articlesStyles.js';

function ShowAllEventsView({ isUserLoggedInState }) {
    const containerStyle = scrollableContainerStyleSheet();
    const buttonStyle = createArticleButtonStyleSheet();
    const addEventIconStyle = createArticleIconStyleSheet();

    const [events, setEvents] = useState([]);
    const [hasMoreElements, setHasMoreElements] = useState(true);

    const fetchEventsFunction = () => {
        fetchEvents(events.length + ITEMS_COUNT)
            .then(newEvents => {
                if (hasMoreElementsInList(events, newEvents, ITEMS_COUNT)) {
                    setHasMoreElements(false);
                }
                setEvents(newEvents);
            });
    };

    useEffect(() => fetchEventsFunction(), []);

    return (
        <div style={{ marginTop: "60px" }}>
            {isUserLoggedInState &&
                <Link to={CREATE_EVENT}>
                    <button type="submit" className="btn btn-primary btn-block" style={buttonStyle}>
                        New event
                        <img style={addEventIconStyle} src={'pencil_writing_icon.png'} />
                    </button>
                </Link>
            }
            <div id="scrollableDiv" style={containerStyle}>
                <InfiniteScroll
                    dataLength={events.length}
                    next={fetchEventsFunction}
                    hasMore={hasMoreElements}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    <div>
                        <EventList events={events} />
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
}

export { ShowAllEventsView };

