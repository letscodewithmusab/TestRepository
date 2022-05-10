import { LightningElement,wire,api,track } from 'lwc';
import getRecords from'@salesforce/apex/AccountSearchHandler.getRecords';
export default class AccountSearchBox_comp extends LightningElement {

   @api selectedValue;  
   @api selectedRecordId; 
   @api accId;
   @api keyfromparent;
   @api object;  
    searchKey='';
    @track accList =[];
    handleValueChange(event){
        this.searchKey = event.target.value;
        console.log(this.object);
    }
    
    onRecordSelection(event) {  
        this.selectedRecordId = event.target.dataset.key;  
        this.selectedValue = event.target.dataset.name;  
        this.searchKey = "";  
        this.handleIdClick();  
       }  
  
    @wire (getRecords,{srhKey : '$searchKey', objectName: '$object'})
    fetchAccounts({error,data}){
    if(data){
        this.accList = data;
    }
    else if(error){

    }
    };

    
    handleIdClick(event){
        this.accId = event.target.dataset.accountid;
        console.log(this.accId);
        console.log(this.keyfromparent);
        const sendId = new CustomEvent('select', {detail:{Id:this.accId,keyfromchild:this.keyfromparent}});
        this.dispatchEvent(sendId);
       }

/*
@track accountName='';
 @track accountList=[];
 @track objectApiName='Account';
 @track accountId;
 //@track isShow=false;
 @track messageResult=false;
 @track isShowResult = true;
 @track showSearchedValues = false;
 @wire(getAccounts,{actName:'$accountName'})
 retrieveAccounts ({error,data}){
     this.messageResult=false;
     if(data){
         console.log('data## ' + data.length);
         if(data.length>0 && this.isShowResult){
            this.accountList =data;
            this.showSearchedValues=true;
            this.messageResult=false;
         }
         else if(data.length == 0){
            this.accountList=[];
            this.showSearchedValues=false;
            if(this.accountName != ''){
               this.messageResult=true;
            }
         }
         else if(error){
             this.accountId='';
             this.accountName='';
             this.accountList=[];
             this.showSearchedValues=false;
             this.messageResult=true;
         }
 
     }
 }
 
 
 
 searchHandleClick(event){
  this.isShowResult = true;
  this.messageResult = false;
}
 
 
searchHandleKeyChange(event){
  this.messageResult=false;
  this.accountName = event.target.value;
}
 
parentHandleAction(event){        
    this.showSearchedValues = false;
    this.isShowResult = false;
    this.messageResult=false;
    //Set the parent calendar id
    this.accountId =  event.target.dataset.value;
    //Set the parent calendar label
    this.accountName =  event.target.dataset.label;      
    console.log('accountId::'+this.accountId);    
    const selectedEvent = new CustomEvent('selected', { detail: this.accountId });
        // Dispatches the event.
    this.dispatchEvent(selectedEvent);    
}
*/
}