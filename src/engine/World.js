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
    }
}

export default World;
