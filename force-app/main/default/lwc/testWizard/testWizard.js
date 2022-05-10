import { LightningElement,api,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class TestWizard extends NavigationMixin(LightningElement) {
    @api disbtn = false;
    
    @api currentstepvalue;

    handleClick() {
        const save =  this.template.querySelector("c-opportunity-form");
        save.isInputValid();
        console.log(save.isInputValid());
        if(save.isInputValid()){
        //firing an child method
        this.template.querySelector("c-account-form").createAccount();
        this.template.querySelector("c-contact-form").createContact();
        this.template.querySelector("c-opportunity-form").createOpps();
        }
      }
    
    @api recordId;
    @track currentStep;

    goBackToStepOne() {
        this.currentstepvalue = '1';
        this.template.querySelector('div.stepTwo').classList.add('slds-hide');
        this.template.querySelector('div.stepOne').classList.remove('slds-hide');
    }
    goToStepTwo() {
       const abc =  this.template.querySelector("c-account-form");
       abc.checkValidity();
       console.log(abc.checkValidity());
       if(abc.checkValidity()){

        this.currentstepvalue = '2';
       // console.log(this.currentstepvalue);
        this.template.querySelector('div.stepOne').classList.add('slds-hide');
        this.template
            .querySelector('div.stepTwo')
            .classList.remove('slds-hide');
    }
}
    goBackToStepTwo() {
        this.currentstepvalue = '2';
        this.template.querySelector('div.stepThree').classList.add('slds-hide');
        this.template.querySelector('div.stepTwo').classList.remove('slds-hide');
    }
    goToStepThree() {
        const abc =  this.template.querySelector("c-contact-form");
        abc.checkValidity();
        console.log(abc.checkValidity());
        if(abc.checkValidity()){
        this.currentstepvalue = '3';
        this.template.querySelector('div.stepTwo').classList.add('slds-hide');
        this.template
            .querySelector('div.stepThree')
            .classList.remove('slds-hide');
    }
}

func1(event){
//this.currentstepvalue= event.detail;

//console.log(this.currentstepvalue);
this.template.querySelector('div.stepOne').classList.remove('slds-hide');
this.template.querySelector('div.stepTwo').classList.add('slds-hide');
this.template.querySelector('div.stepThree').classList.add('slds-hide');

}

func2(event){
   // this.currentstepvalue= event.detail;
    this.template.querySelector('div.stepOne').classList.add('slds-hide');
this.template.querySelector('div.stepTwo').classList.remove('slds-hide');
this.template.querySelector('div.stepThree').classList.add('slds-hide');

}

func3(event){
   // this.currentstepvalue= event.detail;
    this.template.querySelector('div.stepOne').classList.add('slds-hide');
this.template.querySelector('div.stepTwo').classList.add('slds-hide');
this.template.querySelector('div.stepThree').classList.remove('slds-hide');

}

}