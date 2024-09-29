const Ledger = require("../Ledger/ledger.js");
class Bank {
  static bankID = 0;
  bankAccounts = [];
  static allBanks = [];
  static allBankSymbols;
  constructor(bankID, bankName, bankSymbol, bankAccounts, isActive, ledger) {
    this.bankID = bankID;
    this.bankName = bankName;
    this.bankSymbol = bankSymbol;
    this.bankAccounts = bankAccounts;
    this.isActive = isActive;
    // this.ledgerSymbol=ledgerSymbol;
    this.ledger = ledger;
  }
  static getAllBanks() {
    let allBanks = [];
    for (let bank of Bank.allBanks) {
      if (bank.isActive == true) {
        allBanks.push(bank);
      }
    }
    return allBanks;
  }
  getLedger() {
    return this.ledger;
  }
  getAllAccountsOfCurrentBank() {
    let allAccounts = [];
    for (let account of this.bankAccounts) {
      if (account.isActive == true) {
        allAccounts.push(account);
      }
    }
    return allAccounts;
  }

  getBankName() {
    return this.bankName;
  }
  //bank factory function only by admin
  static createBank(bankName, bankSymbol) {
    try {
      if (typeof bankName != "string")
        throw new Error("Enter a valid bank name!");
      if (typeof bankSymbol != "string")
        throw new Error("Enter a valid bank abbreviation...");
      if (bankName == bankSymbol)
        throw new Error("Enter a valid bank name and bank symbol...");
      let bankLedgerID = Bank.bankID + 1;
      // let ledgerObj={bankSymbol:0}
      // let ledger = Ledger.addLedger(bankLedgerID,[]);
      let tempBank = new Bank(
        ++Bank.bankID,
        bankName,
        bankSymbol,
        [],
        true,
        []
      );
      let allBanks = Bank.getAllBanks();
      for (let bank of allBanks) {
        let ledgerSymbol = Symbol(bank.bankSymbol);
        // console.log("eueeeiwoiou", ledgerSymbol);
        tempBank.ledger.push({ [ledgerSymbol]: 0 });
      }
      Bank.allBanks.push(tempBank);
      let ledgerSymbol = Symbol(bankSymbol);
      for (let bank of Bank.allBanks) {
        if (bank.bankSymbol != tempBank.bankSymbol) {
          // console.log("hello", ledgerSymbol);
          bank.ledger.push({ [ledgerSymbol]: 0 });
        }
      }

      return tempBank;
    } catch (error) {
      throw error;
    }
  }

  static findBankByBankID(bankID) {
    try {
      if (typeof bankID != "number") throw new Error("invalid bank id...");
      if (bankID <= 0) throw new Error("invalid bank id!");

      let allBanks = Bank.allBanks;
      for (let bank of allBanks) {
        if (bank.isActive == true && bank.bankID === bankID) {
          return bank;
        }
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  static deleteBank(bankID) {
    try {
      let currentBank = Bank.findBankByBankID(bankID);
      if (this.getAllAccountsOfCurrentBank().length > 0)
        throw new Error(
          "Bank has some existing accounts so it cannot be deleted..."
        );
      if (this.getAllAccountsOfCurrentBank().length == 0) {
        currentBank.isActive = false;
      }
    } catch (error) {
      throw error;
    }
  }
  //adding each account in this bank
  addNewAccount(account) {
    try {
      if (typeof account != "object")
        throw new Error("invalid account object passed...");

      this.bankAccounts.push(account);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Bank;
