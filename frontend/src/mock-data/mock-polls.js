const MOCK_POLLS = [
    {
        "id": "1",
        "question": "This is the question that I'm asking",
        "author": "John Doe",
        "hasUserVoted": false,
        "answers": [
            { "id": 0, "votes": 0, "option": "Option One" },
            { "id": 1, "votes": 2, "option": "Option Two" },
            { "id": 2, "votes": 1, "option": "Option Three" },
            { "id": 3, "votes": 4, "option": "Option Four" }
        ]
    },
    {
        "id": "2",
        "question": "Second question that I'm asking",
        "author": "John Doe",
        "hasUserVoted": true,
        "answers": [
            { "id": 0, "votes": 2, "option": "Option One" },
            { "id": 1, "votes": 4, "option": "Option Two" },
            { "id": 2, "votes": 6, "option": "Option Three" }
        ]
    },
    {
        "id": "3",
        "question": "Third question that I'm asking",
        "author": "John Doe",
        "hasUserVoted": false,
        "answers": [
            { "id": 0, "votes": 2, "option": "Option One" },
            { "id": 1, "votes": 4, "option": "Option Two" },
            { "id": 2, "votes": 6, "option": "Option Three" }
        ]
    },
    {
        "id": "4",
        "question": "Fourth question that I'm asking",
        "author": "John Doe",
        "hasUserVoted": true,
        "answers": [
            { "id": 0, "votes": 2, "option": "Option One" },
            { "id": 1, "votes": 4, "option": "Option Two" },
            { "id": 2, "votes": 6, "option": "Option Three" }
        ]
    }
]

export default MOCK_POLLS;

