class Ledger {
  constructor(bankLedgerID, bankLedger) {
    this.bankLedgerID = bankLedgerID;
    this.bankLedger = bankLedger;
  }
  static addLedger(bankLedgerID, bankLedger) {
    try {
      let ledger = new Ledger(bankLedgerID, bankLedger);
      return ledger;
    } catch (error) {
      throw error;
    }
  }
  //getter
  getLedger() {
    return this.ledger;
  }
}

module.exports = Ledger;
