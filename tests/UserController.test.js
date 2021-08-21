const expect = require('chai').expect;
const user = require('../controllers/UserController');

// NEW USER
describe('Add user A to app', () => {
    it('Should return code: 0', () => {
        const newUser = user.createUser({
            firstname: "Icheka",
            lastname: "Ozuru",
            email: "abc@xyz.com"
        });
        expect(newUser.code).to.equal(0);
    });
});
describe('Add user B to app', () => {
    it('Should return code: 0', () => {
        const newUser = user.createUser({
            firstname: "Abraham",
            lastname: "Isaac",
            email: "abc@xyz.com"
        });
        expect(newUser.code).to.equal(0);
    });
});


// DEPOSITS
describe('Deposit money for user A', () => {
    it('Should return 1000', () => {
        const res = user.depositMoney(0, 1000);
        expect(res.message.checkingBalance).to.equal(1000);
    });
});
describe('Deposit money for user B', () => {
    it('Should return 2000', () => {
        const res = user.depositMoney(1, 2000);
        expect(res.message.checkingBalance).to.equal(2000);
    });
});

// IN-APP TRANSFERS
describe('Transfer $500 from user B to user A', () => {
    it('Should return 1500', () => {
        const res = user.doInAppTransfer(1, 0, 500);
        expect(res.sender.checkingBalance).to.equal(1500);
    });
});

// EXTERNAL TRANSFERS
describe('Transfer $1500 from user A to an external account', () => {
    it('Should return 0', () => {
        const res = user.transferToExternalAccount(0, 123456, 1500);
        expect(res.sender.checkingBalance).to.equal(0);
    });
});