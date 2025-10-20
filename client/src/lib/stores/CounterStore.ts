import { makeObservable, observable } from 'mobx'
export default class CouterStore {
    title = 'Counter store';
    conunt = 0;


    constructor() {
        makeObservable(this, {
            title: observable,
            conunt: observable
        });

    }
}