module.exports = class Report {
    constructor(obj = {}) {
        if (obj.id
            && obj.title
            && obj.type
            && obj.content
            && obj.createdAt
            && obj.updatedAt
            && obj.author) {
            this.id = obj.id;
            this.type = obj.type;
            this.title =  obj.title;
            this.content = obj.content;
            this.createdAt = obj.createdAt;
            this.updatedAt = obj.updatedAt;
            this.author = obj.author;
        }
        else
            throw new Error("Not all fields specified");
    }
};