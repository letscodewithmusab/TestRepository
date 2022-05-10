import { LightningElement, api} from 'lwc';

export default class ProgressBar extends LightningElement {
@api currentstep;
//one;
//two;
//three;

method1() {
    //this.one=1;
    //this.currentstep=1;
    const selectedEvent = new CustomEvent('eventa',{detail: this.one});
    this.dispatchEvent(selectedEvent);
    
}
method2() {
    //this.two=2;
   // this.currentstep=2;
    const selectedEvent = new CustomEvent('eventb',{detail: this.two});
    this.dispatchEvent(selectedEvent);
}
method3() {
   // this.three=3;
   // this.currentstep=3;
    const selectedEvent = new CustomEvent('eventc',{detail: this.three});
    this.dispatchEvent(selectedEvent);
}


}