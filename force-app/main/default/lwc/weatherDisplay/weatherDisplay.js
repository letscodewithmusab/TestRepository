import { LightningElement, wire, track } from 'lwc';
import parse from '@salesforce/apex/WeatherResponse.parse';
  
export default class AccountListLWC extends LightningElement {
   
    @wire(parse) accounts;
    accounts = WeatherResponse.parse();
    greeting = 'world';

    handleChange(event){
        this.greeting = event.target.value;
        
    }
    handleClick(){
        this.accounts = accounts;
    }

    

    
}