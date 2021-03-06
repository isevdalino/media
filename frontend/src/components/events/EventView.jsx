import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReadableDateTime } from "../../constants/common";
import { fetchEvent } from "../../server-requests/requests";
import { articleViewContainerStyleSheet, authorStyleSheet, contentStyleSheet, titleStyleSheet } from "../articles/articlesStyles";
import { SEARCH } from "../../constants/Paths";

function EventView() {
    const eventViewContainerStyle = articleViewContainerStyleSheet();
    const titleStyle = titleStyleSheet();
    const authorStyle = authorStyleSheet();
    const contentStyle = contentStyleSheet();

    let { id } = useParams();
    const [event, setEvent] = useState({});

    useEffect(() => {
        fetchEvent(id).then(newEvent => setEvent(newEvent));
    }, []);

    return (
        <div style={eventViewContainerStyle} >
            <h3 style={titleStyle}>{event.name}</h3>
            <div> <a href={SEARCH + '?a=' + event.authorName} style={authorStyle}>{event.authorName}</a></div>
            <p style={contentStyle}>{event.description}</p>
            <div style={{ textAlign: "right" }}>{getReadableDateTime(event.createdAt)}</div>
        </div>
    );
}

export { EventView };

