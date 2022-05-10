import { LightningElement,api} from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class OpportunityForm extends LightningElement {
    value = 'inProgress';
    opp = {};
    get options() {
        return [
            { label: 'Closed Won', value: 'Closed Won' },
            { label: 'Closed Lost', value: 'Closed Lost' },
            { label: 'Prospecting', value: 'Prospecting' },
            { label: 'Qualification', value: 'Qualification' },
            { label: 'Need Analysis', value: 'Need Analysis' },
        ];
    }
    strName;
    strDate;
    strOrder;
    strStage;
  
    // Insert record.
    @api createOpps(event){
       let comboBox = this.template.querySelector("lightning-combobox");
       this.strStage = comboBox.value;
        let inputBox = this.template.querySelectorAll("lightning-input");
        inputBox.forEach(function (element) {
            if(element.label == 'Name'){
                this.strName = element.value;
                console.log(element.label + "- "+this.strName);
            }
            else if(element.label == 'CloseDate'){
                this.strDate = element.value;
                console.log(element.label + "- "+this.strDate);
            }
            else if(element.label == 'Order'){
                this.strOrder = element.value;
                console.log(element.label + "- "+this.strOrder);
            }
            
          }, this);
          console.log(comboBox.label + "- "+this.strStage);

        // Creating mapping of fields of Account with values
        var fields = {'Name' : this.strName, 'CloseDate' : this.strDate, 'OrderNumber__c' : this.strOrder, 'StageName':this.strStage};
        // Record details to pass to create method with api name of Object.
        var objRecordInput = {'apiName' : 'Opportunity', fields};
        
        createRecord(objRecordInput).then(response => {
           const event = new ShowToastEvent({
           title: 'Records Created Successfully',
           message : 'Thanks',
           variant :'success'
           });
           this.dispatchEvent(event);
        }).catch(error => {
            alert('Error: ' +JSON.stringify(error));
        });
    }

    @api isInputValid() {
        let isValid = true;
        let inputFields = this.template.querySelectorAll('.validate');
        inputFields.forEach(inputField => {
            if(!inputField.checkValidity()) {
                inputField.reportValidity();
                isValid = false;
            }
            this.opp[inputField.name] = inputField.value;
        });
        return isValid;
    }
}