import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { hasMoreElementsInList } from "../../constants/common";
import { TOPICS_COUNT } from "../../constants/constants";
import { fetchTopics } from "../../server-requests/requests";
import { scrollableContainerStyleSheet } from "../articles/articlesStyles";
import TopicList from "./TopicList";

function ShowAllTopicsView() {
    const [topics, setTopics] = useState([]);
    const containerStyle = scrollableContainerStyleSheet();
    const [hasMoreElements, setHasMoreElements] = useState(true);

    const fetchTopicsFunction = () => {
        fetchTopics(topics.length + TOPICS_COUNT)
            .then(newTopics => {
                if (hasMoreElementsInList(topics, newTopics, TOPICS_COUNT)) {
                    setHasMoreElements(false);
                }
                setTopics(newTopics);
            });
    }

    useEffect(() => fetchTopicsFunction(), []);

    return (
        <div id="scrollableDiv" style={containerStyle}>
            <InfiniteScroll
                dataLength={topics.length}
                next={fetchTopicsFunction}
                hasMore={hasMoreElements}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
            >
                <div>
                    <TopicList topics={topics} />
                </div>
            </InfiniteScroll>
        </div>
    );
}

export { ShowAllTopicsView };

