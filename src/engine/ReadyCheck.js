class ReadyCheck {
    constructor(onReady) {
        this.onReady = onReady;
        this.check = [false, false];
    }

    setReady(index) {
        this.check[index] = true;

        if (this.check[0] && this.check[1]) {
            this.onReady();
        }
    }
}

export default ReadyCheck;
