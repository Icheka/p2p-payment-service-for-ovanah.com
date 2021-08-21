const { newUserSchema } = require("./joi");

class UserController {

    constructor() {
        this.users = []; // simulate a database layer
    }

    createUser(user) {
        const v = newUserSchema.validate(user);
        if (v.error) return { code: 1, message: `User object does not match schema ${v.error}` };

        user.id = this.users.length.toString(); // create a 'unique' identifier for this user. Of course, this will not be implemented this way in a production service
        user.checkingBalance = 0;


        this.users.push(user); // 'save' new user to db

        return { code: 0, message: `User created successfully` };
    }

    getAllUsers() {
        return this.users;
    }

    depositMoney(userId, amount) {
        const user = this.auth(userId);
        if (!user) return { code: 1, message: `User account not found` };

        user.checkingBalance += amount;
        return { code: 0, message: user };
    }

    doInAppTransfer(fromId, toId, amount) {
        const sender = this.auth(fromId);
        if (!sender) return { code: 1, message: `User account not found` };

        const receiver = this.users.find(u => u.id == toId);

        sender.checkingBalance -= amount;
        receiver.checkingBalance += amount;

        return { code: 0, sender, receiver };
    }

    transferToExternalAccount(userId, accountNumber, amount) {
        const sender = this.auth(userId);
        if (!sender) return { code: 1, message: `User account not found` };

        sender.checkingBalance -= amount;
        return { code: 0, sender };
    }

    // utils
    auth(userId) {
        return this.users.find(u => u.id == userId);
    }
}

const user = new UserController();

module.exports = user;