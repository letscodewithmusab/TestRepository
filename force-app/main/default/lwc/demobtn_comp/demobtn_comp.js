import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import demoMethod from '@salesforce/apex/BatchDemoButton.demoMethod';
import { CloseActionScreenEvent } from "lightning/actions";     


export default class Demobtn_comp extends LightningElement {

@api recordId;
/*connectedCallback(){
    this.submitButton();
}*/
submitButton() {
    
        demoMethod({ recordIds: this.recordId })
       
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Record updated!',
                variant: 'success'
            })
        );
        this.dispatchEvent(new CloseActionScreenEvent());
        }   
        

   
    

}