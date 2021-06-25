export class Poll {
    constructor(id, question, authorName, hasUserVoted, answers) {
        this.id = id;
        this.question = question;
        this.authorName = authorName;
        this.hasUserVoted = hasUserVoted;
        this.answers = answers;
    }
}

export class Answer {
    constructor(id, votes, option) {
        this.id = id;
        this.voted = votes;
        this.option = option;
    }
}