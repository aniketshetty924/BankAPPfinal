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
sbi1.depositUserAccount(2, 1, 15230);
sbi1.depositUserAccount(1, 1, 34343);
sbi1.depositUserAccount(1, 2, 9887);
console.log(sbi1);
console.log("###################################");
sbi1.withDrawUserAccount(1, 1, 10000);
console.log(sbi1);

console.log("Balance in specific account : ", sbi1.getBalanceUserAccount(2, 1));

// console.log("All accounts balance of a user in that specific bank : ",User.getTotalBalanceUserAccounts());
console.log(sbi1.totalBalanceUserAccounts(1));

sbi1.transferWithinSameUserAccountsSameBankID(1, 1, 2, 343);
console.log(sbi1);
console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
sbi1.transferWithinSameUserAccountsDifferentBankID(1, 2, 2, 1, 230);
console.log(sbi1);
console.log("sbi : ", admin1.findBankByBankID(1).ledger);
console.log("pnb : ", admin1.findBankByBankID(2).ledger);
console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
sbi1.transferWithinDifferentUsers(1, 2, 2, 2, 1000);
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

console.log("sbi : ", admin1.findBankByBankID(1).ledger.getLedger());
console.log("pnb : ", admin1.findBankByBankID(2).ledger.getLedger());
console.log("axis : ", admin1.findBankByBankID(3).ledger.getLedger());

console.log("^^^^^^^^^^^^^^^^^^^^^^");
sbi2.transferWithinDifferentUsers(2, 1, 2, 2, 500);
console.log("sbi : ", admin1.findBankByBankID(1).ledger.getLedger());
console.log("pnb : ", admin1.findBankByBankID(2).ledger.getLedger());
