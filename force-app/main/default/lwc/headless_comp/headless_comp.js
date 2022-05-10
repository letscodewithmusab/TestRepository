import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Headless_comp extends LightningElement {

    @api async invoke() {
        // implement business logic and check response and accordinly display success or failure message.
        this.dispatchEvent(
            new ShowToastEvent({
                title: "Headless Action",
                message: "Action Completeds",
                variant: "success"
            })
        );
      }
}