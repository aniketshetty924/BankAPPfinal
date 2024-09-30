const Bank = require("../Bank/bank.js");
const { withDrawUserAccount } = require("../User/user.js");
const Passbook = require("../Passbook/passbook.js");
class Account {
  constructor(bankID, bankName, accountID, accountBalance, passbook, isActive) {
    this.bankID = bankID;
    this.bankName = bankName;
    this.accountID = accountID;
    this.accountBalance = accountBalance;
    this.passbook = passbook;
    this.isActive = isActive;
  }

  //getters
  getAccountBalance() {
    return this.accountBalance;
  }

  getBankID() {
    return this.bankID;
  }

  getPassbook() {
    return this.passbook;
  }
  static createUserBankAccountByBankID(bankID) {
    try {
      let initialBalance = 1000;
      let currentBank = Bank.findBankByBankID(bankID);
      let allAccountsOfCurrentBank = currentBank.getAllAccountsOfCurrentBank();
      let newAccountID = allAccountsOfCurrentBank.length + 1;
      let currentBankName = currentBank.getBankName();
      let passbookID = allAccountsOfCurrentBank.length + 1;
      let passbook = Passbook.newPassbook(passbookID);
      let newAccount = new Account(
        bankID,
        currentBankName,
        newAccountID,
        initialBalance,
        passbook,
        true
      );

      currentBank.addNewAccount(newAccount);
      return newAccount;
    } catch (error) {
      throw error;
    }
  }

  static getUserAccountByBankID(bankID, accountID) {
    try {
      let currentBank = Bank.findBankByBankID(bankID);
      let allAccountsOfCurrentBank = currentBank.getAllAccountsOfCurrentBank();
      for (let account of allAccountsOfCurrentBank) {
        if (account.isActive == true && account.accountID == accountID) {
          return account;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  //delete user account
  static deleteUserAccount(bankID, accountID) {
    try {
      let currentAccount = Account.getUserAccountByBankID(bankID, accountID);
      currentAccount.isActive = false;
    } catch (error) {
      throw error;
    }
  }

  static depositUserAccount(bankID, accountID, amount) {
    try {
      let account = Account.getUserAccountByBankID(bankID, accountID);
      if (!account.isActive)
        throw new Error(
          "account is in active or deleted earlier... cannot access it!"
        );
      account.accountBalance += amount;
      let currentDate = new Date();
      let entry = `Amount of ${amount} has been deposited in account id : ${accountID} with bankID : ${bankID} at ${currentDate}`;
      let passbook = account.getPassbook();
      passbook.addEntry(entry);
      // console.log("hello");
      // console.log(passbook);
    } catch (error) {
      throw error;
    }
  }

  static withDrawUserAccount(bankID, accountID, amount) {
    try {
      let currentAccount = Account.getUserAccountByBankID(bankID, accountID);
      if (!currentAccount.isActive)
        throw new Error(
          "account is in active or deleted earlier... cannot access it!"
        );
      if (currentAccount.getAccountBalance() <= 1000)
        throw new Error(
          "oops you cannot withdraw money since you have to maintain a minimum of Rs 1000 in account!"
        );

      if (amount > 200000)
        throw new Error(
          "oops you can withdraw a maximum of 200000 from one withdrawal!"
        );

      let accountBalance = currentAccount.getAccountBalance();
      if (accountBalance - amount < 1000)
        throw new Error(
          "oops you cannot withdraw money since you have to maintain a minimum of Rs 1000 in account!"
        );

      accountBalance -= amount;
      currentAccount.accountBalance = accountBalance;
      let passbook = currentAccount.getPassbook();
      let currentDate = new Date();
      let entry = `Amount of ${amount} has been withdrawn from accountID : ${accountID} from bank ID ${bankID} at ${currentDate}`;
      passbook.addEntry(entry);
      return amount;
    } catch (error) {
      throw error;
    }
  }

  //balance in specific acccount
  static getBalanceUserAccount(bankID, accountID) {
    try {
      let currentAccount = Account.getUserAccountByBankID(bankID, accountID);
      if (!currentAccount.isActive)
        throw new Error(
          "account is in active or deleted earlier... cannot access it!"
        );
      return currentAccount.getAccountBalance();
    } catch (error) {
      throw error;
    }
  }

  //transfer within same user account same bank
  static transferWithinSameUserAccountsSameBankID(
    bankID,
    senderAccountID,
    receiverAccountID,
    amount
  ) {
    try {
      let currentBank = Bank.findBankByBankID(bankID);
      let allAccounts = currentBank.getAllAccountsOfCurrentBank();
      let senderAccount = Account.findAccountInBankID(
        senderAccountID,
        allAccounts
      );
      if (!senderAccount.isActive)
        throw new Error(
          "sender account is  inactive or deleted earlier... cannot access it!"
        );
      let receiverAccount = Account.findAccountInBankID(
        receiverAccountID,
        allAccounts
      );
      if (!receiverAccount.isActive)
        throw new Error(
          "account is in active or deleted earlier... cannot access it!"
        );

      senderAccount.debitAmount(amount);
      try {
        receiverAccount.creditAmount(amount);
      } catch (error) {
        senderAccount.accountBalance += amount;
        console.log("Transaction failed...");
        throw error;
      }
      console.log(
        `Amount of ${amount} has been transferred from account id : ${senderAccountID} to account id : ${receiverAccountID} with bank id : ${bankID}`
      );

      let senderPassbook = senderAccount.getPassbook();
      let currentDate = new Date();
      let senderEntry = `Amount of ${amount} has been debited from accountID : ${senderAccountID} from bank ID ${bankID} and debited to receiver ${receiverAccountID} from bank ID ${bankID} at ${currentDate} and the remaining balance is Rs ${senderAccount.accountBalance}`;
      senderPassbook.addEntry(senderEntry);

      let receiverPassbook = receiverAccount.getPassbook();
      let receiverEntry = `Amount of ${amount} has been debited from accountID : ${senderAccountID} from bank ID ${bankID} and debited to receiver ${receiverAccountID} from bank ID ${bankID} at ${currentDate} and the remaining balance is Rs ${receiverAccount.accountBalance}`;
      receiverPassbook.addEntry(receiverEntry);
    } catch (error) {
      throw error;
    }
  }

  //transfer within same user account different bank id
  static transferWithinSameUserAccountsDifferentBankID(
    senderBankID,
    receiverBankID,
    senderAccountID,
    receiverAccountID,
    amount
  ) {
    try {
      let senderBank = Bank.findBankByBankID(senderBankID);
      let receiverBank = Bank.findBankByBankID(receiverBankID);
      let senderAllAccounts = senderBank.getAllAccountsOfCurrentBank();
      let receiverAllAccounts = receiverBank.getAllAccountsOfCurrentBank();
      let senderAccount = Account.findAccountInBankID(
        senderAccountID,
        senderAllAccounts
      );
      if (!senderAccount.isActive)
        throw new Error(
          "sender account is  inactive or deleted earlier... cannot access it!"
        );
      let receiverAccount = Account.findAccountInBankID(
        receiverAccountID,
        receiverAllAccounts
      );
      if (!receiverAccount.isActive)
        throw new Error(
          "account is in active or deleted earlier... cannot access it!"
        );

      senderAccount.debitAmount(amount);
      try {
        receiverAccount.creditAmount(amount);
      } catch (error) {
        senderAccount.accountBalance += amount;
        console.log("Transaction failed...");
        throw error;
      }

      console.log(
        `Amount of ${amount} has been transferred from Bank id ${senderBankID} with account id : ${senderAccountID} to bank id ${receiverBankID} with account id : ${receiverAccountID}`
      );

      let senderPassbook = senderAccount.getPassbook();
      let currentDate = new Date();
      let senderEntry = `Amount of ${amount} has been debited from accountID : ${senderAccountID} from bank ID ${senderBankID} and debited to receiver ${receiverAccountID} from bank ID ${receiverBankID} at ${currentDate} and the remaining balance in the account is Rs ${senderAccount.accountBalance}`;
      senderPassbook.addEntry(senderEntry);

      let receiverPassbook = receiverAccount.getPassbook();
      let receiverEntry = `Amount of ${amount} has been debited from accountID : ${senderAccountID} from bank ID ${senderBankID} and debited to receiver ${receiverAccountID} from bank ID ${receiverBankID} at ${currentDate} and the remaining balance in the account is Rs ${receiverAccount.accountBalance}`;
      receiverPassbook.addEntry(receiverEntry);

      //ledger work

      let receiverLedgerSymbol = receiverBank.bankSymbol;
      let senderLedger = senderBank.ledger.getLedger();
      let senderObjExists = senderLedger.find((item) =>
        item.hasOwnProperty(receiverLedgerSymbol)
      );
      // console.log(ledger);
      // console.log("exists", objExists);
      // console.log("hello", ledgerSymbol);
      // console.log("dfdfd", objExists[ledgerSymbol]);
      senderObjExists[receiverLedgerSymbol] -= amount;

      let senderLedgerSymbol = senderBank.bankSymbol;
      let receiverLedger = receiverBank.ledger.getLedger();
      let receiverObjExists = receiverLedger.find((item) =>
        item.hasOwnProperty(senderLedgerSymbol)
      );
      receiverObjExists[senderLedgerSymbol] += amount;
    } catch (error) {
      throw error;
    }
  }
  static findAccountInBankID(accountID, allAccounts) {
    for (let account of allAccounts) {
      if (account.isActive == true && account.accountID == accountID) {
        return account;
      }
    }
    return null;
  }

  //debit
  debitAmount(amount) {
    try {
      if (amount <= 0) throw new Error("invalid amount...");
      if (this.getAccountBalance() <= 1000)
        throw new Error(
          "oops you cannot transfer money since you have to maintain a minimum of Rs 1000 in account!"
        );
      let accountBalance = this.getAccountBalance();
      if (accountBalance - amount < 1000)
        throw new Error(
          "oops you cannot transfer money since you have to maintain a minimum of Rs 1000 in account!"
        );
      accountBalance -= amount;
      this.accountBalance = accountBalance;
    } catch (error) {
      throw error;
    }
  }

  creditAmount(amount) {
    try {
      if (amount < 0) throw new Error("invalid amount to credit...");
      let accountBalance = this.getAccountBalance();
      accountBalance += amount;
      this.accountBalance = accountBalance;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Account;
