module.exports = class Affair {
    constructor(obj) {
        if (obj.ticket
            && obj.name
            && obj.surname
            && obj.fatherName
            && obj.createdAt) {
            this.ticket = obj.ticket;
            this.name = obj.name;
            this.surname = obj.surname;
            this.fatherName = obj.fatherName;
            this.createdAt = obj.createdAt;
        }
        else
            throw new Error("Not all fields specified");
    }
};