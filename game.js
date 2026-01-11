const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

let ball;
let score = 0;
let scoreText;
let goal;

const game = new Phaser.Game(config);

function preload() {
  this.load.image("ball", "https://labs.phaser.io/assets/sprites/shinyball.png");
  this.load.image("goal", "https://labs.phaser.io/assets/sprites/block.png");
}

function create() {
  // Ground
  const ground = this.add.rectangle(400, 480, 800, 40, 0x1e293b);
  this.physics.add.existing(ground, true);

  // Ball
  ball = this.physics.add.image(400, 300, "ball");
  ball.setBounce(0.8);
  ball.setCollideWorldBounds(true);

  // Goal
  goal = this.physics.add.staticImage(750, 420, "goal");
  goal.displayWidth = 60;
  goal.displayHeight = 120;
  goal.refreshBody();

  // Score text
  scoreText = this.add.text(20, 20, "Score: 0", {
    fontSize: "20px",
    fill: "#ffffff"
  });

  // Collisions
  this.physics.add.collider(ball, ground);
  this.physics.add.overlap(ball, goal, scoreGoal, null, this);

  // Controls
  this.input.keyboard.on("keydown-SPACE", () => {
    ball.setVelocity(Phaser.Math.Between(-200, 200), -400);
  });
}

function update() {
  // Reset ball if it falls out
  if (ball.y > 600) {
    resetBall();
  }
}

function scoreGoal() {
  score++;
  scoreText.setText("Score: " + score);
  resetBall();
}

function resetBall() {
  ball.setPosition(400, 300);
  ball.setVelocity(0, 0);
}
