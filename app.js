new Vue({
  el: "#app",
  data: {
    playerHealth: 80,
    monsterHealth: 70,
    gameIsRunning: false,
    turns: [],
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function () {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      if (this.checkWin()) {
        return;
      }
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits monster by ${damage}`,
      });

      this.monsterAttack();
    },
    specialAttack: function () {
      var damage = this.calculateDamage(10, 10);
      this.monsterHealth -= damage;
      if (this.checkWin()) {
        return;
      }
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits monster by ${damage}`,
      });
      this.monsterAttack();
    },
    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }

      this.monsterAttack();
    },
    giveUp: function () {
      this.gameIsRunning = false;
    },
    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm("You won new game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You won new game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
    monsterAttack: function () {
      var damage = this.calculateDamage(3, 10);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits player by ${damage}`,
      });
      this.checkWin();
    },
  },
});
