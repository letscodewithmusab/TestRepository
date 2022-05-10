import { LightningElement,api } from 'lwc';

export default class Component2 extends LightningElement {
@api value;

handleClick(event){
let person ={};
person.firstName = 'Mohd';
person.lastName = 'Musab';
const selectedEvent = new CustomEvent('myevent',{detail: JSON.stringify(person)});
this.dispatchEvent(selectedEvent);

}
   
}