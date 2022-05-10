import { api, LightningElement } from 'lwc';
import template1 from './lifeCycleHooks.html';
import template2 from './lifeCycleHooks2.html';


export default class LifeCycleHooks extends LightningElement {

     @api tempno = 'temp1';
    constructor(){
        super();
        console.log('Inside the Constructor');
    }

    connectedCallback(){
        console.log('Inside the Connected Callback');
    }


    disconnectedCallback(){
        console.log('Inside the disconnected Callback');
    }

    handleChangeTemplate(){
        console.log('Inside handleChangetTemplate method');
     if(this.tempno === 'temp1'){
         this.tempno = 'temp2';
     }
     else{
        this.tempno = 'temp1'
     }
    }

    render(){
        console.log('Inside Render');
        if(this.tempno === 'temp1')
        return template1;
        else return template2;
    }

    renderedCallback(){
        console.log('Rendered Callback');
    }

    errorCallback(error,stack){
        console.log('Inside the Error CallBack'+ error);
        alert('error'+ error);
    }
}