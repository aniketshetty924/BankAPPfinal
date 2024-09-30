const User = require("./User/user.js");
const Bank = require("./Bank/bank.js");
let admin1 = User.newAdmin("Aniket", "Shetty", 22);
console.log(admin1);

console.log(admin1.createBank("State Bank of India", "SBI"));
console.log(admin1.createBank("Punjab National Bank", "PNB"));

console.log("********************************");
let sbi1 = admin1.createUserBankAccountByBankID("Aneesh", "Kumar", 25, 1);
console.log(sbi1);

admin1.createAnotherAccountByUserID(2, 1);
admin1.createAnotherAccountByUserID(2, 2);
console.log("||||||||||||||||||||||||||||");
console.log(sbi1);
console.log("bank account of user in specific bank...");
console.log(admin1.getUserAccountByBankID(2, 1));
console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");

let sbi2 = admin1.createUserBankAccountByBankID("Rohit", "Sharma", 27, 2);
console.log(sbi2);
console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
User.depositUserAccount(2, 1, 15230);
User.depositUserAccount(1, 1, 34343);
User.depositUserAccount(1, 2, 9887);
console.log(sbi1);
console.log("###################################");
User.withDrawUserAccount(1, 1, 10000);
console.log(sbi1);

console.log("Balance in specific account : ", User.getBalanceUserAccount(2, 1));

// console.log("All accounts balance of a user in that specific bank : ",User.getTotalBalanceUserAccounts());
console.log(User.totalBalanceUserAccounts(1, 2));

User.transferWithinSameUserAccountsSameBankID(1, 1, 2, 343);
console.log(sbi1);
console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
User.transferWithinSameUserAccountsDifferentBankID(1, 2, 2, 1, 230);
console.log(sbi1);
console.log("sbi : ", Bank.findBankByBankID(1).ledger);
console.log("pnb : ", Bank.findBankByBankID(2).ledger);
console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
User.transferWithinDifferentUsers(1, 2, 2, 2, 1000);
//senderbankID,receiverBankID,sID,rID,amount
console.log(sbi1);
console.log(sbi2);
console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
console.log("passbooks");
console.log(admin1.getPassbookUserAccount(1, 1));
console.log(admin1.getPassbookUserAccount(1, 2));
console.log(admin1.getPassbookUserAccount(2, 1));
console.log(admin1.getPassbookUserAccount(2, 2));
console.log("----------------------------------------");
admin1.createBank("Axis Bank", "axis");
console.log("ledger");

console.log("sbi : ", Bank.findBankByBankID(1).ledger);
console.log("pnb : ", Bank.findBankByBankID(2).ledger);
console.log("axis : ", Bank.findBankByBankID(3).ledger);

console.log("^^^^^^^^^^^^^^^^^^^^^^");
User.transferWithinDifferentUsers(2, 1, 2, 2, 500);
console.log("sbi : ", Bank.findBankByBankID(1).ledger);
console.log("pnb : ", Bank.findBankByBankID(2).ledger);
