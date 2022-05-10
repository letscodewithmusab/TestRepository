import { LightningElement,track,api } from 'lwc';
import insertContacts from '@salesforce/apex/BulkContactsHandler.insertContacts'
import {ShowToastEvent} from "lightning/platformShowToastEvent";

export default class BulkContactsCreate_comp extends LightningElement {

    @track listOfContacts;
    @api accId; 
    firstName;
    lastName;
    

    connectedCallback() {
        this.initData();
    }

    initData() {
        let listOfContacts = [];
        this.createRow(listOfContacts);
        this.listOfContacts = listOfContacts;
    }

    createRow(listOfContacts) {
        let accountObject = {FirstName: this.firstName, LastName:this.lastName,AccountId:'Null',key:Math.random().toString(36).substring(2, 15)};
        if(listOfContacts.length > 0) {
            accountObject.index = listOfContacts[listOfContacts.length - 1].index + 1;
        } else {
            accountObject.index = 1;
        }
        accountObject.FirstName = null;
        accountObject.LastName = null;
       
        listOfContacts.push(accountObject);
    }
    
    /**
     * Adds a new row
     */
    addNewRow() {
        this.createRow(this.listOfContacts);
    }

    /**
     * Removes the selected row
     */
    removeRow(event) {
        let toBeDeletedRowIndex = event.target.name;

        let listOfContacts = [];
        for(let i = 0; i < this.listOfContacts.length; i++) {
            let tempRecord = Object.assign({}, this.listOfContacts[i]); //cloning object
            if(tempRecord.index !== toBeDeletedRowIndex) {
                listOfContacts.push(tempRecord);
            }
        }

        for(let i = 0; i < listOfContacts.length; i++) {
            listOfContacts[i].index = i + 1;
        }

        this.listOfContacts = listOfContacts;
    }

    get disableDeletebtn(){
        return this.listOfContacts.length <= 1;
    }

    handleInputChange(event) {
        let index = event.target.dataset.id;
        let fieldName = event.target.name;
        let value = event.target.value;

        for(let i = 0; i < this.listOfContacts.length; i++) {
            if(this.listOfContacts[i].index === parseInt(index)) {
                this.listOfContacts[i][fieldName] = value;
            }
        }
    }

    sendAccId(event){
        let searchElement = this.listOfContacts.find(ele => ele.key == event.detail.keyfromchild);
        searchElement.AccountId =event.detail.Id;
        console.log(searchElement.AccountId);
        this.listOfContacts = [...this.listOfContacts];
    }

    createAccounts() {
       // console.log('Final results' +JSON.stringify(listOfContacts) );
        insertContacts({
            ListOfContacts: this.listOfContacts, 
            //accountId : this.accId
            
        })
            .then(data => {
                this.initData();
                let event = new ShowToastEvent({
                    message: "Contacts successfully created!",
                    variant: "success",
                    duration: 2000
                });
                this.dispatchEvent(event);
            })
            .catch(error => {
                console.log(error);
            });
    }

}