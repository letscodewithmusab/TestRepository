import { LightningElement,api, track } from 'lwc';

export default class LwcDemo2 extends LightningElement {
@api brand;
connectedCallback(){
   // console.log('Hello Connected Callback');
   let vechicle = "car";
   if(vechicle){
       this.brand = "Toyota";
       console.log(this.brand);
   }
}



}