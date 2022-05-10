import { LightningElement,track,api,wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from "lightning/actions";  
import getHotelRooms from '@salesforce/apex/HotelComp_Controller.getHotelRooms';
import updateRecords from '@salesforce/apex/HotelComp_Controller.updateRecords';
export default class Hotel_comp extends LightningElement {
    @api recordId;
    id = 0;
    keyIndex = 0;
    @track itemList = [
        {
          //  id: 0
        }
    ];

    
   
    error;
    @wire(getHotelRooms,{recordId: '$recordId'})
    wiredContacts({ error, data }) {
        if (data) {
            this.itemList = data;
            for(var i=0;i<this.itemList.length;i++){
                console.log('id hotel '+ i+' '+this.itemList[i].Hotel__c);
            }
            console.log(this.itemList); 
            
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.itemList = undefined;
        }
    }


    addRow(){
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
   

    handleSubmit(event) {
        
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
                    message: 'Record successfully updated',
                    variant: 'success',
                }),
            );
            this.dispatchEvent(new CloseActionScreenEvent());
            
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: 'Please enter all the required fields',
                    variant: 'error',
                }),
            );
        }
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Hotel__C',
                actionName: 'view'
            },
        });
       
    }

/*
console.log( 'Hotel', this.hotelList);
updateRecords({ recordId: this.recordId, hotelList: this.hotels, roomList :this.rooms })
.then(result => {
    
    this.accounts = result;
    this.error = undefined;
})
.catch(error => {
    this.error = error;
    this.accounts = undefined;
})
this.dispatchEvent(
    new ShowToastEvent({
        title: 'Success',
        message: 'Record successfully updated',
        variant: 'success',
    }),
);
this.dispatchEvent(new CloseActionScreenEvent());
}
*/

handleClose(){
    console.log('Checking');
    this.dispatchEvent(new CloseActionScreenEvent());
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: this.recordId,
            objectApiName: 'Hotel__C',
            actionName: 'Edit'
        },
    });
}
}