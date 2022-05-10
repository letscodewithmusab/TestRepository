import { api, LightningElement } from 'lwc';

export default class TestLwcComponent extends LightningElement {
    activeSectionMessage = '';
    val = 80;
    val2 = 50;
    val3 = 40;
    @api
    textFieldValue;
    handleTextChange(event){
        this.textFieldValue = event.target.value;
     }

    handleToggleSection(event) {
        this.activeSectionMessage =
            'Open section name:  ' + event.detail.openSections;
    }

    handleSetActiveSectionC() {
        const accordion = this.template.querySelector('.example-accordion');

        accordion.activeSectionName = 'C';
    }
}