import { LightningElement,track,api} from 'lwc';
import createContactRecord from '@salesforce/apex/ContactLwcController.createContactRecord';
/*import First_Name from '@salesforce/schema/Contact.FirstName';
import Last_Name from '@salesforce/schema/Contact.LastName';
import Birth_Date from '@salesforce/schema/Contact.Birthdate';
import Lead_Source from '@salesforce/schema/Contact.LeadSource';*/
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class ContactForm_comp extends LightningElement {
@track recordId;
@track error;
@api First_Name;
@api Last_Name;
@api Birth_date;
@api Lead_Source;
/*@track contactRec/ord = {
FirstName : First_Name,
LastName  :  Last_Name,
BirthDate : Birth_Date,
LeadSource: Lead_Source
};*/

handleFirstNameChange(event){
this.First_Name = event.target.value;
}
handleLastNameChange(event){
this.Last_Name = event.target.value;
}
handleDateChange(event){
this.Birth_date = event.target.value;
}
handleSourceChange(event){
    this.Lead_Source = event.target.value;
    }    

   /* handleSaveContact(){
         let cont = {'sobjectType' : 'Contact'};
         cont.FirstName = this.First_Name;
         cont.LastName = this.Last_Name;
         cont.Birthdate = this.Birth_date;
         cont.LeadSource = this.Lead_Source;

         createContactRecord({conRecord:cont})
        .then(result => {
            //this.contactRecord={};
            this.contactId = result;
            const event = new ShowToastEvent({
            title: 'Contact Created Successfully',
            message : 'Thanks',
            variant :'success'
            });
            this.dispatchEvent(toastEvent);
            })
            .catch(error => {
                this.error = error.message;
        });

    }
*/

createRecord() {

    // created a JSON representation of the Contact record, 
    // same as we would do in Lightning Aura Components

    let cont = {'sobjectType' : 'Contact'};
         cont.FirstName = this.First_Name;
         console.log(cont.FirstName);
         cont.LastName = this.Last_Name;
         console.log(cont.LastName);
         cont.Birthdate = this.Birth_date;
         console.log(cont.Birthdate);
         cont.LeadSource = this.Lead_Source;
         console.log(cont.LeadSource);

    createContactRecord({newRecord:cont})
        .then(result => {
            this.cont = {};
            this.recordId = result;
            console.log(result);
        })
        .catch(error => {
            console.log(error);
            this.error = error;
        });
}











/* textFieldValue;

handleTextChange(event){
this.textFieldValue = event.target.value;
}

submitHandler(event){
let inputBox = this.template.querySelectorAll("lightning-input");

inputBox.forEach(function (element) {
console.log(element.label + "- " + element.value);
});

}*/

}