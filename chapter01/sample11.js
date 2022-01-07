function wait(sec) {
    this.secc = sec;
}

class waitCls {
    constructor(sec)
    {
        this.secc = sec;
    }
}

let wait1 = new wait(1);
let wait2 = new waitCls(1);