import { useState, useEffect } from "react";
import { containerStyleSheet } from "../articles/articlesStyles";
import TopicList from "./TopicList";
import { fetchTopics } from "../../server-requests/requests";

function ShowAllTopicsView() {
    const [topics, setTopics] = useState([]);
    const containerStyle = containerStyleSheet();

    useEffect(() => {
        fetchTopics(0).then(topics => setTopics(topics));
    }, []);

    return (
        <div style={containerStyle}>
            <TopicList topics={topics} />
        </div>
    );
}

export { ShowAllTopicsView };