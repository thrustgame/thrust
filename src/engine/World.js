class World
{
    constructor(distance, players, onEnd) {
        this.distance = distance;
        this.players = players;
        this.onEnd = onEnd;
    }

    update(delta) {
        let distance = 0;

        for (var i = this.players.length - 1; i >= 0; i--) {
            distance += this.players[i].update(delta)
        }

        if (distance >= this.distance) {
            this.onEnd();
        }

        console.log(
            'Player1: %s | Player2: %s',
            this.players[0].position,
            this.players[1].position
        );
    }
}

export default World;
