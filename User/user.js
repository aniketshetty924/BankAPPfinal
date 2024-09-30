const Bank = require("../Bank/bank.js");
const Account = require("../Account/account.js");
class User {
  static userID = 0;
  static allUsers = [];
  constructor(userID, fullName, age, isAdmin, isActive, accounts) {
    this.userID = userID;
    this.fullName = fullName;
    this.age = age;
    this.isAdmin = isAdmin;
    this.isActive = isActive;
    this.accounts = accounts;
  }

  //getters
  getAccounts() {
    let allAccounts = [];
    for (let account of this.accounts) {
      if (account.isActive) {
        allAccounts.push(account);
      }
    }
    return allAccounts;
  }
  static getAllUsers() {
    let allUsers = [];
    for (let user of User.allUsers) {
      if (!user.isAdmin && user.isActive == true) {
        allUsers.push(user);
      }
    }
    return allUsers;
  }
  static newAdmin(firstName, lastName, age) {
    try {
      if (typeof firstName != "string")
        throw new Error("Enter a valid first name...");
      if (typeof lastName != "string")
        throw new Error("Enter a valid last name...");
      if (firstName == lastName)
        throw new Error("invalid first name and last name...");
      if (typeof age != "number") throw new Error("Enter a valid age...");
      if (age <= 18) throw new Error("YOU are under age 18...");

      let fullName = firstName + " " + lastName;
      let tempAdmin = new User(++User.userID, fullName, age, true, true, []);
      return tempAdmin;
    } catch (error) {
      console.log(error);
    }
  }

  //get user by ID only users not admins
  static getUserByUserID(userID) {
    try {
      if (typeof userID != "number")
        throw new Error("Enter a valid user id...");
      if (userID <= 0) throw new Error("invalid user id ...");

      let allUsers = User.allUsers;
      for (let user of allUsers) {
        if (user.isActive == true && user.userID == userID) {
          return user;
        }
      }
      console.log(`User with userID ${userID} does not exists...`);
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  createBank(bankName, bankSymbol) {
    try {
      if (!this.isAdmin) throw new Error("only admins can create banks...");
      let tempBank = Bank.createBank(bankName, bankSymbol);
      return tempBank;
    } catch (error) {
      console.log(error);
    }
  }

  createUserBankAccountByBankID(firstName, lastName, age, bankID) {
    try {
      if (!this.isAdmin)
        throw new Error("only admins can create user bank account...");
      if (typeof firstName != "string")
        throw new Error("Enter a valid first name...");
      if (typeof lastName != "string")
        throw new Error("Enter a valid last name...");
      if (firstName == lastName)
        throw new Error("invalid first name and last name...");
      if (typeof age != "number") throw new Error("Enter a valid age...");
      if (age <= 18) throw new Error("YOU are under age 18...");

      let fullName = firstName + " " + lastName;
      let account = Account.createUserBankAccountByBankID(bankID);
      let accounts = [];
      accounts.push(account);
      let user = new User(++User.userID, fullName, age, false, true, accounts);
      User.allUsers.push(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  //create another account by admin via userID
  createAnotherAccountByUserID(userID, bankID) {
    try {
      if (!this.isAdmin)
        throw new Error("only admins can create another account...");
      let user = User.getUserByUserID(userID);

      let account = Account.createUserBankAccountByBankID(bankID);
      if (!account.isActive)
        throw new Error(
          "account is in active or deleted earlier... cannot access it!"
        );
      user.accounts.push(account);
    } catch (error) {
      console.log(error);
    }
  }

  //get user account by bank id and account id
  getUserAccountByBankID(bankID, accountID) {
    try {
      if (!this.isAdmin)
        throw new Error("only admins can get particular use account...");
      let userAccount = Account.getUserAccountByBankID(bankID, accountID);
      if (!userAccount.isActive)
        throw new Error(
          "account is in active or deleted earlier... cannot access it!"
        );
      return userAccount;
    } catch (error) {
      console.log(error);
    }
  }

  //update user by admin
  updateUser(userID, parameter, value) {
    try {
      if (!this.isAdmin) throw new Error("only admins can update users");
      if (typeof parameter != "string") throw new Error("invalid parameter");

      let user = User.getUserByUserID(userID);
      if (!user.isActive) throw new Error("user does not exist");
      switch (parameter) {
        case "firstName":
          user.updateFirstName(value);
          break;
        case "lastName":
          user.updateLastName(value);
          break;
        case "age":
          user.updateAge(value);
          break;

        default:
          throw new Error("invalid parameter!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  updateFullName() {
    if (firstName == lastName)
      throw new Error("invalid first name and last name...");
    this.fullName = this.firstName + " " + this.lastName;
  }
  updateFirstName(firstName) {
    try {
      if (typeof firstName != "string")
        throw new Error("invalid first name...");
      this.firstName = firstName;
      this.updateFullName();
    } catch (error) {
      throw error;
    }
  }
  updateLastName(lastName) {
    try {
      if (typeof lastName != "string") throw new Error("invalid first name...");
      this.lastName = lastName;
      this.updateFullName();
    } catch (error) {
      throw error;
    }
  }
  updateAge(age) {
    try {
      if (typeof age != "number" || age < 18) throw new Error("invalid age !");
      this.age = age;
    } catch (error) {
      throw error;
    }
  }
  //delete user via admin
  deleteUser(userID) {
    try {
      if (!this.isAdmin) throw new Error("only admins can delete users...");
      if (userID <= 0) throw new Error("invalid user id");
      let allUsers = User.getAllUsers();
      for (let user of allUsers) {
        if (user.userID === userID && user.getAccounts().length == 0) {
          user.isActive = false;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  //delete account by bankid and account id via admin
  deleteUserAccount(bankID, accountID) {
    try {
      if (!this.isAdmin)
        throw new Error("only admins can delete user accounts...");

      Account.deleteUserAccount(bankID, accountID);
    } catch (error) {
      console.log(error);
    }
  }
  //update bank via admin
  updateBankByBankID(bankID, parameter, value) {
    try {
      if (!this.isAdmin) throw new Error("only admins can update bank...");
      Bank.updateBankByBankID(bankID);
    } catch (error) {
      console.log(error);
    }
  }
  //delete bank via admin
  deleteBank(bankID) {
    try {
      if (!this.isAdmin) throw new Error("only admins can delete a bank...");
      Bank.deleteBank(bankID);
      console.log(
        `Bank with bankID : ${bankID} has been deleted successfully by admin ${this.fullName}`
      );
    } catch (error) {
      console.log(error);
    }
  }
  //deposit money by bank id and account id
  static depositUserAccount(bankID, accountID, amount) {
    try {
      if (typeof amount != "number") throw new Error("invalid amount...");
      if (amount <= 0) throw new Error("invalid amount!");
      Account.depositUserAccount(bankID, accountID, amount);
      console.log(`${amount} is deposited at account id : ${accountID}`);
    } catch (error) {
      console.log(error);
    }
  }

  //withdraw amount by account id bank id
  static withDrawUserAccount(bankID, accountID, amount) {
    try {
      if (amount <= 0) throw new Error("invalid amount...");
      let money = Account.withDrawUserAccount(bankID, accountID, amount);
      return money;
    } catch (error) {
      console.log(error);
    }
  }

  //balance in specific account by bankid and account id
  static getBalanceUserAccount(bankID, accountID) {
    try {
      let balance = Account.getBalanceUserAccount(bankID, accountID);
      return balance;
    } catch (error) {
      console.log(error);
    }
  }

  //total balance in specific bank by bankID,userID
  static totalBalanceUserAccounts(bankID, userID) {
    try {
      let user = User.getUserByUserID(userID);
      let allAccounts = user.getAccounts();
      let totalBalance = 0;
      for (let account of allAccounts) {
        if (account.getBankID() == bankID) {
          totalBalance += account.getAccountBalance();
        }
      }
      return totalBalance;
    } catch (error) {
      console.log(error);
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
      Account.transferWithinSameUserAccountsSameBankID(
        bankID,
        senderAccountID,
        receiverAccountID,
        amount
      );
    } catch (error) {
      console.log(error);
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
      Account.transferWithinSameUserAccountsDifferentBankID(
        senderBankID,
        receiverBankID,
        senderAccountID,
        receiverAccountID,
        amount
      );
    } catch (error) {
      console.log(error);
    }
  }

  //transfer withing different users but same bankid
  static transferWithinDifferentUsers(
    senderBankID,
    receiverBankID,
    senderAccountID,
    receiverAccountID,
    amount
  ) {
    try {
      User.transferWithinSameUserAccountsDifferentBankID(
        senderBankID,
        receiverBankID,
        senderAccountID,
        receiverAccountID,
        amount
      );
    } catch (error) {
      console.log(error);
    }
  }

  getPassbookUserAccount(bankID, accountID) {
    try {
      let account = this.getUserAccountByBankID(bankID, accountID);
      return account.getPassbook();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
