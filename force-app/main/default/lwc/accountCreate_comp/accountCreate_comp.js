import { LightningElement, api} from 'lwc';
//import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import RATING_FIELD from '@salesforce/schema/Account.Industry';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';

import createAccount from '@salesforce/apex/ContactLwcController.createAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class AccountCreate_comp extends LightningElement {
    value = 'inProgress';
    get options() {
        return [
            { label: 'Hot', value: 'Hot' },
            { label: 'Warm', value: 'Warm' },
            { label: 'Cold', value: 'Cold' },
        ];
    }

     name = NAME_FIELD;
     rating = RATING_FIELD;
     phone = PHONE_FIELD;
   /*
    rec = {
        Name : this.name,
        Rating : this.rating,
        Phone : this.phone
    };
*/

    handleClick() {
        

        let comboBox = this.template.querySelector("lightning-combobox");
        this.rating = comboBox.value;

        let inputBox = this.template.querySelectorAll("lightning-input");
        inputBox.forEach(function (element) {
            if(element.label == 'Account Name'){
                this.name = element.value;
                console.log(element.label + "- "+this.name);
            }
            else if(element.label == 'Phone'){
                this.phone = element.value;
                console.log(element.label + "- "+this.phone );
            }
                } ,this);
                console.log(comboBox.label + "- "+this.rating);

                const account = {
                    Name:   this.name,
                    Rating: this.rating,
                    Phone:  this.phone
                }

        createAccount({ acc : account })
            .then(result => {
                this.rec = {};
                this.accountId = result.Id;
                const event = new ShowToastEvent({
                            title: 'Success',
                            message: 'Account created',
                            variant: 'success',
                });
                this.dispatchEvent(event);
            })
            .catch(error => {
                    const event = new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    });
                    this.dispatchEvent(event);
            });
    }











}