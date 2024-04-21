import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from './enemies.js';
import { UI } from './UI.js';
import { Over } from './game_over.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this)
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.Ui = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessage = [];
            this.maxParticles = 200;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.winningScore = 50;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 40000;
            this.gameOver = false;
            this.lives = 5;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltaTime) {
            this.time += deltaTime;

            if (this.time > this.maxTime) {
                this.gameOver = true;
                console.log("Game over!");
            }
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            // handle enemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                    enemy.update(deltaTime)
                        //if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
                })
                //handle messages
            this.floatingMessage.forEach(message => {
                    message.update();
                })
                // handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
                if (particle.markedForDeletion) this.particles.splice(index, 1)
            })
            if (this.particles.length > this.maxParticles) {
                this.particles = this.particles.slice(0, this.maxParticles);
            }
            //handle collision
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
                if (collision.markedForDeletion) this.collisions.splice(index, 1)
            })
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.floatingMessage = this.floatingMessage.filter(message => !message.markedForDeletion);

            console.log(this.time);
            console.log(this.gameOver);
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context)
            })
            this.particles.forEach(particle => {
                particle.draw(context)
            })
            this.collisions.forEach(collision => {
                collision.draw(context)
            })
            this.floatingMessage.forEach(message => {
                message.draw(context);
            })
            this.Ui.draw(context);
        }
        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));

            this.enemies.push(new FlyingEnemy(this));
            //console.log(this.enemies);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    //console.log(game);
    let lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.draw(ctx);
        game.update(deltaTime);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
})