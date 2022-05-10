import { LightningElement,api} from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class ContactForm extends LightningElement {
   
    value = 'inProgress';

    get options() {
        return [
            { label: 'Web', value: 'Web' },
            { label: 'Phone Inquiry', value: 'Phone Inquiry' },
            { label: 'Partner Referral', value: 'Partner Referral' },
            { label: 'Other', value: 'Other' },
            { label: 'Purchased List', value: 'Purchased List' },
        ];
    }
    handleChange(event) {
        this.value = event.detail.value;
    }
    
    strFName;
    strLName;
    strPhone;
    strSource;
  
    // Insert record.
    @api createContact(event){
       let comboBox = this.template.querySelector("lightning-combobox");
       this.strSource = comboBox.value;
        let inputBox = this.template.querySelectorAll("lightning-input");
        inputBox.forEach(function (element) {
            if(element.label == 'First Name'){
                this.strFName = element.value;
                console.log(element.label + "- "+this.strFName);
            }
            else if(element.label == 'Last Name'){
                this.strLName = element.value;
                console.log(element.label + "- "+this.strLName);
            }
            else if(element.label == 'Phone'){
                this.strPhone = element.value;
                console.log(element.label + "- "+this.strPhone);
            }
            
          }, this);
          console.log(comboBox.label + "- "+this.strSource);

        // Creating mapping of fields of Account with values
        var fields = {'FirstName' : this.strFName, 'LastName' : this.strLName, 'Phone' : this.strPhone, 'LeadSource':this.strSource};
        // Record details to pass to create method with api name of Object.
        var objRecordInput = {'apiName' : 'Contact', fields};
        
        createRecord(objRecordInput).then(response => {
          /* const event = new ShowToastEvent({
           title: 'Contact Created Successfully',
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