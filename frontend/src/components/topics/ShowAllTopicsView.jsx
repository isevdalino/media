import { useState } from "react";
import MOCK_TOPICS from "../../mock-data/mock-topics";
import { containerStyleSheet } from "../articles/articlesStyles";
import TopicList from "./TopicList";

function ShowAllTopicsView() {
    const [topics, setTopics] = useState(MOCK_TOPICS);
    const containerStyle = containerStyleSheet();

    return (
        <div style={containerStyle}>
            <TopicList topics={topics} />
        </div>
    );
}

export { ShowAllTopicsView };