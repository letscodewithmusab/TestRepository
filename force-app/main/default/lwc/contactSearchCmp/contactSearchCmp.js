import { LightningElement,wire,api,track } from 'lwc';
import getContacts from'@salesforce/apex/FetchContactHandler.getContacts';
import { NavigationMixin } from 'lightning/navigation';
export default class ContactSearchCmp extends NavigationMixin(LightningElement) {
    
    /*columns = [
        {label: 'Id', fieldName: 'Id'},
        {label: "Last Name",
        type : "button",
        typeAttributes: { label: { fieldName: "LastName" }, name: "LastName", variant: "base" }    
    ];*/
    Contact_columns = [
        {
            label: "Last Name",
            type: "button",
            typeAttributes: { label: { fieldName: "LastName" }, name: "LastName", variant: "base" }
        },
        {
            label: "Id",
            fieldName: "Id"
        },
        {
            label: "Lead Source",
            sortable: "true",
            fieldName: "LeadSource"
        }
    ];

    @api recordId;
    @track error;
    @track data;
    @track page = 1; 
    @track items = []; 
    @track data = []; 
    @track startingRecord = 1;
    @track endingRecord = 0; 
    @track pageSize = 3; 
    @track totalRecountCount = 0;
    @track totalPage = 0;     
    //noRecordsFound = true;
    @api searchKey='';

    handleValueChange(event){
        this.searchKey = event.target.value;
    }

   // @wire (getContacts,{contactLastName : '$searchKey'}) contacts;
   @wire(getContacts, {contactLastName: '$searchKey'})
   contacts({ error, data }) {
       if (data) {
           this.items = data;
           this.totalRecountCount = data.length; 
           this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize); 
           this.data = this.items.slice(0,this.pageSize); 
           this.endingRecord = this.pageSize;
           this.columns = columns;
           this.error = undefined;
       } 
       else if (error) {
           this.error = error;
           this.data = undefined;
       }
   }
    previousHandler() {
        if (this.page > 1) {
            this.page = this.page - 1; //decreased page by 1
            this.displayRecordPerPage(this.page);
        }
    }

    nextHandler() {
        if((this.page<this.totalPage) && this.page !== this.totalPage){
            this.page = this.page + 1; //increased page by 1
            this.displayRecordPerPage(this.page);            
        }             
    }

    //this method displays records page by page
    displayRecordPerPage(page){

        this.startingRecord = ((page -1) * this.pageSize) ;
        this.endingRecord = (this.pageSize * page);

        this.endingRecord = (this.endingRecord > this.totalRecountCount) 
                            ? this.totalRecountCount : this.endingRecord; 

        this.data = this.items.slice(this.startingRecord, this.endingRecord);

        this.startingRecord = this.startingRecord + 1;
    }    
    
  get disablePrevious(){
     return this.page <= 1;
  }    
  
  get disableNext(){
    return this.page >= this.totalPage;
 }    
 
 handleRowAction(event) {
    if (event.detail.action.name === "LastName") {
        this[NavigationMixin.GenerateUrl]({
            type: "standard__recordPage",
            attributes: {
                recordId: event.detail.row.Id,
                actionName: "view"
            }
        }).then((url) => {
            window.open(url, "_blank");
        });
    }
}
@track sortBy;
@track sortDirection;
doSorting(event) {
    this.sortBy = event.detail.fieldName;
    this.sortDirection = event.detail.sortDirection;
    this.sortData(this.sortBy, this.sortDirection);
}

sortData(fieldname, direction) {
    let parseData = JSON.parse(JSON.stringify(this.data));
    // Return the value stored in the field
    let keyValue = (a) => {
        return a[fieldname];
    };
    // cheking reverse direction
    let isReverse = direction === 'asc' ? 1: -1;
    // sorting data
    parseData.sort((x, y) => {
        x = keyValue(x) ? keyValue(x) : ''; // handling null values
        y = keyValue(y) ? keyValue(y) : '';
        // sorting values based on direction
        return isReverse * ((x > y) - (y > x));
    });
    this.data = parseData;
}    

}