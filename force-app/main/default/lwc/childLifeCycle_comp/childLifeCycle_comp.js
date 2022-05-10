import { LightningElement } from 'lwc';

export default class ChildLifeCycle_comp extends LightningElement {
    
    connectedCallback(){
        throw new Error("Error Occured...!!");
    }
}