import { makeAutoObservable } from "mobx";

export default class UIStore {
    darkMode: boolean = false;
    isLoading: boolean = false;

    constructor() {
        this.darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        makeAutoObservable(this);
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
    }

    isBusy() {
        this.isLoading = true;
    }

    isIdle() {
        this.isLoading = false;
    }
}