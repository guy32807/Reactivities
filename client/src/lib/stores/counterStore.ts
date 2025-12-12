import { makeObservable, observable } from "mobx";
export default class CounterStore {
    title = "Counter Store";
    count = 0;

    constructor() {
       makeObservable(this, {
        title: observable,
        count: observable,
       });
        
    }
    increment() {
        this.count += 1;
    }

    decrement() {
        this.count -= 1;
    }

    reset() {
        this.count = 0;
    }
}   

