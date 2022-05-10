import { LightningElement,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import { createRecord } from 'lightning/uiRecordApi';

export default class MultipleAccounts_comp extends LightningElement {
    /*
    value = 'inProgress';
    get options() {
        return [
            { label: 'Web', value: 'Web' },
            { label: 'Phone Inquiry', value: 'Phone Inquiry' },
            { label: 'Partner Referral', value: 'Partner Referral' },
            { label: 'Purchased List', value: 'Purchased List' },
            { label: 'Other', value: 'Other' }
        ];
    }
   
   
    firstName;
    lastName;
    birthDate;
    leadSource;
  
    // Insert record.
    createContact(event){
       let comboBox = this.template.querySelector("lightning-combobox");
       this.leadSource = comboBox.value;
        let inputBox = this.template.querySelectorAll("lightning-input");
        inputBox.forEach(function (element) {
            if(element.label == 'First Name'){
              //  let fetchElememt = this.itemList.find(myElement => myElement.key == element.dataset.id);
              //  fetchElememt.FirstName = element.value;
                this.firstName = element.value;
                console.log(element.label + "- "+this.firstName);
            }
            else if(element.label == 'Last Name'){
                //let fetchElememt = this.itemList.find(myElement => myElement.key == element.dataset.id);
                //fetchElememt.LastName = element.value;
                this.lastName = element.value;
                console.log(element.label + "- "+this.lastName);
            }
            else if(element.label == 'BirthDate'){
                //let fetchElememt = this.itemList.find(myElement => myElement.key == element.dataset.id);
                //fetchElememt.Birthdate = element.value;
                this.birthDate = element.value;
                console.log(element.label + "- "+this.birthDate);
            }
            
          }, this);
          console.log(comboBox.label + "- "+this.leadSource);

        // Creating mapping of fields of Account with values
        var fields = {'FirstName' : this.firstName, 'LastName' : this.lastName, 'Birthdate' : this.birthDate, 'LeadSource':this.leadSource};
        // Record details to pass to create method with api name of Object.
        var objRecordInput = {'apiName' : 'Contact', fields};
        console.log(objRecordInput);
        createRecord(objRecordInput).then(response => {
           const event = new ShowToastEvent({
           title: 'Contact Created Successfully',
           message : 'Thanks',
           variant :'success'
           });
           this.dispatchEvent(event);
        }).catch(error => {
            alert('Error: ' +JSON.stringify(error));
        });
    }*/

    keyIndex = 0;
    @track itemList = [
        {
            id: 0
        }
    ];

    addRow() {
        ++this.keyIndex;
        var newItem = [{ id: this.keyIndex }];
        this.itemList = this.itemList.concat(newItem);
    }

    removeRow(event) {
        if (this.itemList.length >= 2) {
            this.itemList = this.itemList.filter(function (element) {
                return parseInt(element.id) !== parseInt(event.target.accessKey);
            });
        }
    }

    handleSubmit() {
        var isVal = true;
        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            isVal = isVal && element.reportValidity();
        });
        if (isVal) {
            this.template.querySelectorAll('lightning-record-edit-form').forEach(element => {
                element.submit();
            });
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contacts successfully created',
                    variant: 'success',
                }),
            );
            
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: 'Please enter all the required fields',
                    variant: 'error',
                }),
            );
        }
    }



}