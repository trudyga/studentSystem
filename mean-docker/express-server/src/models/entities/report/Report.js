module.exports = class Report {
    constructor(obj = {}) {
        if (obj.id
            && obj.title
            && obj.link
            && obj.createdAt
            && obj.updatedAt
            && obj.author) {
            this.id = obj.id;
            this.link = obj.link;
            this.createdAt = obj.createdAt;
            this.updatedAt = obj.updatedAt;
            this.author = obj.author;
        }
        else
            throw new Error("Not all fields specified");
    }
};