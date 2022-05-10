import { LightningElement, track,wire,api } from 'lwc';  
import insertContacts from '@salesforce/apex/BulkContactsHandler.insertContacts'
import {ShowToastEvent} from "lightning/platformShowToastEvent";
 export default class LwcLookupDemo extends LightningElement {  
   @track accountName;  
   @track accountRecordId;  

   onAccountSelection(event){  
   this.accountName = event.detail.selectedValue;  
   this.accountRecordId = event.detail.selectedRecordId;  
   }  


   @track listOfAccounts;
   @api accId; 
   firstName;
   lastName;
   

   connectedCallback() {
       this.initData();
   }

   initData() {
       let listOfAccounts = [];
       this.createRow(listOfAccounts);
       this.listOfAccounts = listOfAccounts;
   }

   createRow(listOfAccounts) {
       let accountObject = {FirstName: this.firstName, LastName:this.lastName,AccountId:'Null',key:Math.random().toString(36).substring(2, 15)};
       if(listOfAccounts.length > 0) {
           accountObject.index = listOfAccounts[listOfAccounts.length - 1].index + 1;
       } else {
           accountObject.index = 1;
       }
       accountObject.FirstName = null;
       accountObject.LastName = null;
      
       listOfAccounts.push(accountObject);
   }
   
   /**
    * Adds a new row
    */
   addNewRow() {
       this.createRow(this.listOfAccounts);
   }

   /**
    * Removes the selected row
    */
   removeRow(event) {
       let toBeDeletedRowIndex = event.target.name;

       let listOfAccounts = [];
       for(let i = 0; i < this.listOfAccounts.length; i++) {
           let tempRecord = Object.assign({}, this.listOfAccounts[i]); //cloning object
           if(tempRecord.index !== toBeDeletedRowIndex) {
               listOfAccounts.push(tempRecord);
           }
       }

       for(let i = 0; i < listOfAccounts.length; i++) {
           listOfAccounts[i].index = i + 1;
       }

       this.listOfAccounts = listOfAccounts;
   }

   get disableDeletebtn(){
       return this.listOfAccounts.length <= 1;
   }

   handleInputChange(event) {
       let index = event.target.dataset.id;
       let fieldName = event.target.name;
       let value = event.target.value;

       for(let i = 0; i < this.listOfAccounts.length; i++) {
           if(this.listOfAccounts[i].index === parseInt(index)) {
               this.listOfAccounts[i][fieldName] = value;
           }
       }
   }

   sendAccId(event){
       let foundelement = this.listOfAccounts.find(ele => ele.key == event.detail.keyfromchild);
       foundelement.AccountId =event.detail.Id;
       console.log(foundelement.AccountId);
       this.listOfAccounts = [...this.listOfAccounts];
   }

   createAccounts() {
      // console.log('Final results' +JSON.stringify(listOfAccounts) );
       insertContacts({
           ListOfContacts: this.listOfAccounts, 
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