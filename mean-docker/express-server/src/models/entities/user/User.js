const Departments = require('./Departments');

module.exports = class User {
    constructor(fields) {
        if (fields
            && fields.login
            && fields.password
            && fields.name
            && fields.surname
            && fields.fatherName
            && fields.phone
            && fields.department) {

            this.login = fields.login;
            this.password = fields.password;
            this.name = fields.name;
            this.surname = fields.surname;
            this.fatherName = fields.fatherName;
            this.phone = fields.phone;
            this.department = fields.department;
        }
        else
            throw new Error("Not all fields specified");
    }

    get departmentName() {
        let dNum = Departments[this.department];
        this.department = Departments.properties[dNum];
    }
};