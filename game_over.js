export class Over {
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

        // game over message
        if (this.game.gameOver) {
            console.log('game hello');
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillText('Boo-yah', this.game.width * 0.5, this.game.height * 0.5);

            // console.log('hello there');
            // context.textAlign = 'center';
            // context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            // if (this.game.score > 5) {
            //     context.fillText('Boo-yah', this.game.width * 0.5, this.game.height * 0.5 - 20);
            //     context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
            //     context.fillText('What are creatures of the night afraid of? You!!!',
            //         this.game.width * 0.5, this.game.height * 0.5 + 20);
            // } else {
            //     context.fillText('Love at first bite?', this.game.width * 0.5, this.game.height * 0.5 - 20);
            //     context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
            //     context.fillText('Nope, Better luck next time!',
            //         this.game.width * 0.5, this.game.height * 0.5 + 20);
            // }
        }
        context.restore()
    }
}