class TurnSystem {
  constructor() {
    this.turn = 1;
    this.actions = [];
  }

  nextTurn() {
    this.turn += 1;
    this.actions.forEach((action) => {
      action();
    });
  }

  addNextTurnAction(action) {
    this.actions.push(action);
  }
}

export default TurnSystem;