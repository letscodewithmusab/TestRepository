import { LightningElement,api,track } from 'lwc';

export default class Component1 extends LightningElement {
@api message;

connectedCallback(){
    this.message = 'Welcome';
    console.log(this.message);
}

handlemyEvent(event){
    console.log('myevent called');
    console.log(event.detail);
    let person = JSON.parse(event.detail);
    console.log('First Name ' + person.firstName);
    console.log('First Name ' + person.lastName);
   

}
}