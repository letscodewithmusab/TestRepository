import { LightningElement } from 'lwc';

import backgroundUrl from '@salesforce/resourceUrl/PortfolioBgImg';

export default class MusabProject extends LightningElement {
    
    myimage = backgroundUrl + '/images/black.jpeg';

    get backgroundStyle() {
        return `height:50rem;background-image:url(${backgroundUrl})`;
    }
}