import { LightningElement,api} from 'lwc';

export default class Musab_Comp extends LightningElement {
    @api
    textFieldValue;
    handleTextChange(event){
        this.textFieldValue = event.target.value;
     }
}