import { LightningElement } from 'lwc';
import OPP_OBJECT from '@salesforce/schema/Opportunity';
export default class OpportunityDetails extends LightningElement {
    handleSubmit(event) {
        event.preventDefault(); //stop default action

        //Send event to parent to go to next page
        let fields = event.detail.fields;
        let recordInput = { allowSaveOnDuplicate: true, apiName: OPP_OBJECT.objectApiName, fields };
        this.dispatchEvent(new CustomEvent('next', {detail: recordInput}));
    }

    handlePrevious(event) {
        event.preventDefault(); //stop default action

        //Send event to parent to go to next page
        let fields = event.detail.fields;
        fields.AccountId = '';
        let recordInput = { allowSaveOnDuplicate: true, apiName: OPP_OBJECT.objectApiName, fields };
        this.dispatchEvent(new CustomEvent('previous', {detail: recordInput}));
    }
}