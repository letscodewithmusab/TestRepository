import { LightningElement,api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class AccountForm extends LightningElement {
    
    account = {};
    value = 'inProgress';

    get options() {
        return [
            { label: 'Hot', value: 'Hot' },
            { label: 'Warm', value: 'Warm' },
            { label: 'Cold', value: 'Cold' },
        ];
    }

    strName;
    strSLAExpirationDate;
    strPhone;
    strRating;
  
    // Insert record.
    @api createAccount(event){
       let comboBox = this.template.querySelector("lightning-combobox");
       this.strRating = comboBox.value;
        let inputBox = this.template.querySelectorAll("lightning-input");
        inputBox.forEach(function (element) {
            if(element.label == 'Account Name'){
                this.strName = element.value;
                console.log(element.label + "- "+this.strName);
            }
            else if(element.label == 'Phone'){
                this.strPhone = element.value;
                console.log(element.label + "- "+this.strPhone);
            }
            else if(element.label == 'SLAExpirationDate'){
                this.strSLAExpirationDate = element.value;
                console.log(element.label + "- "+this.strSLAExpirationDate);
            }
            
          }, this);
          console.log(comboBox.label + "- "+this.strRating);

        // Creating mapping of fields of Account with values
        var fields = {'Name' : this.strName, 'AccountNumber' : this.strRating, 'Phone' : this.strPhone, 'SLAExpirationDate__c':this.strSLAExpirationDate};
        // Record details to pass to create method with api name of Object.
        var objRecordInput = {'apiName' : 'Account', fields};
        
        
        
        createRecord(objRecordInput).then(response => {
         /*  const event = new ShowToastEvent({
           title: 'Account Created Successfully',
           message : 'Thanks',
           variant :'success'
           });
           this.dispatchEvent(event);*/
        }).catch(error => {
            alert('Error: ' +JSON.stringify(error));
        });
    }

    @api checkValidity() {
        var inputCmp = this.template.querySelector(".inputCmp");
        var value = inputCmp.value;
        // is input is valid?
        if (!value) { 
          inputCmp.setCustomValidity("This Field is Required");
        } else {
          inputCmp.setCustomValidity(""); // if there was a custom error before, reset it
        }
        
        let myValue = inputCmp.reportValidity();
        //console.log(myValue);
        return myValue; // Tells lightning-input to show the error right away without needing interaction
      }

     
    
}