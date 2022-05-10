import { LightningElement } from 'lwc';

import My_Resource from '@salesforce/resourceUrl/myResource';

export default class Education extends LightningElement {

    backPack = My_Resource + '/images/backpack.png';
    school = My_Resource + '/images/school.png';
    grad = My_Resource + '/images/graduation.png';


    
}