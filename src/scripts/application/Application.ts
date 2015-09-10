class Application {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    start() {
        console.log(this.name)
    }
}