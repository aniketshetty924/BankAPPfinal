class Ledger {
  constructor(ledger) {
    this.ledger = ledger;
  }
  static addLedger(ledger) {
    try {
      return new Ledger(ledger);
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
