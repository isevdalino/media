export class Poll {
    constructor(id, question, authorName, answers,voters) {
        this.id = id;
        this.question = question;
        this.authorName = authorName;
        this.answers = answers;
        this.voters = voters;
    }
}

export class Answer {
    constructor(id, votes, name) {
        this.id = id;
        this.votes = votes;
        this.name = name;
    }
}