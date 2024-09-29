class Passbook {
  static passbookID = 0;
  entries = [];
  static passbooks = [];
  constructor(passbookID, entries) {
    this.passbookID = passbookID;
    this.entries = entries;
  }
  //getters
  getPassbookID() {
    return this.passbookID;
  }

  getEntries() {
    return this.entries;
  }

  static newPassbook(passsbookID) {
    try {
      let passbook = new Passbook(passsbookID, []);
      Passbook.passbooks.push(passbook);
      return passbook;
    } catch (error) {
      throw error;
    }
  }

  addEntry(entry) {
    try {
      if (typeof entry != "string") throw new Error("invalid entry!");
      this.entries.push(entry);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Passbook;
