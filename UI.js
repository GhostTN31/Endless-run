export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = '"Jersey 10", sans-serif';
        this.livesImage = document.getElementById('lives');
    }
    draw(context) {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText('score: ' + this.game.score, 20, 50);
        //timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        //lives
        for (let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25);
        }
        // game over message
        if (this.game.time >= 39000) {
            console.log('hello there');
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if (this.game.score > this.game.winningScore) {
                context.fillText('Boo-yah 😃', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
                context.fillText('What are creatures of the night afraid of? You!!!',
                    this.game.width * 0.5, this.game.height * 0.5 + 20);
            } else {
                context.fillText('Time up 😶?', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
                context.fillText('Nope, Better luck next time!',
                    this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
        }

        if (this.game.lives <= 1) {
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillText('Out of Lives 🙁?', this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
            context.fillText('Nope, Better luck next time!',
                this.game.width * 0.5, this.game.height * 0.5 + 20);
            this.game.gameOver = true;
        }

        context.restore()
    }
}