export class Poll {
    constructor(id, question, authorName, answers, voters, createdAt) {
        this.id = id;
        this.question = question;
        this.authorName = authorName;
        this.answers = answers;
        this.voters = voters;
        this.createdAt = createdAt;
    }
}

export class Answer {
    constructor(id, votes, name) {
        this.id = id;
        this.votes = votes;
        this.name = name;
    }
}