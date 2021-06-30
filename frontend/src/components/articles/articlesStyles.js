function containerStyleSheet() {
    return {
        margin: "5% 20%",
        padding: "3rem",
        textAlign: "center",
        backgroundImage: "url('grey.png')"
    };
};

function scrollableContainerStyleSheet() {
    return {
        height: "500px",
        overflow: "auto",
        margin: "5% 20%",
        padding: "3rem",
        textAlign: "center",
        backgroundImage: "url('grey.png')"
    };
};

function cardStyleSheet() {
    return {
        backgroundColor: "white",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        width: "200px",
        margin: "10px auto",
        textAlign: "center",
        fontFamily: "arial",
        padding: "10px",
        cursor: "pointer"
    };
};

function cardPhotoStyleSheet() {
    return {
        maxWidth: "100px",
        maxHeight: "100px",
    };
};

function photoStyleSheet() {
    return {
        maxWidth: "100%",
        maxHeight: "100%",
    };
};

function cardContainerStyleSheet() {
    return {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    };
};

function articleViewContainerStyleSheet() {
    return {
        backgroundColor: "White",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        width: "65%",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10%",
        fontFamily: "arial",
        padding: "5%",
    };
};

function titleStyleSheet() {
    return {
        textAlign: "center",
    };
}

function authorStyleSheet() {
    return {
        float: "right"
    };
};

function contentStyleSheet() {
    return {
        textAlign: "justify",
        paddingTop: "50px",
    };
}

function createArticleButtonStyleSheet() {
    return {
        backgroundColor: "white",
        float: "right",
        marginRight: "10%",
        padding: "10px",
        color: "black"
    };
}

function createArticleIconStyleSheet() {
    return {
        width: "20px",
        height: "20px",
    };
}

function topicLinkStyleSheet() {
    return {
        float: "right",
    };
}

export {
    containerStyleSheet, scrollableContainerStyleSheet, cardStyleSheet, cardPhotoStyleSheet, photoStyleSheet, cardContainerStyleSheet,
    articleViewContainerStyleSheet, titleStyleSheet, authorStyleSheet, contentStyleSheet, createArticleButtonStyleSheet,
    createArticleIconStyleSheet, topicLinkStyleSheet
};