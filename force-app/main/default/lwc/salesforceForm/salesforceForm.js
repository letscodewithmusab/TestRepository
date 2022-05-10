import { LightningElement, wire, api } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
//import getPartnerBankNameAndLocations from "@salesforce/apex/formGeneratorBankAgentLWCController.getPartnerBankNameAndLocations";
//import saveLead from "@salesforce/apex/formGeneratorBankAgentLWCController.saveLead";

export default class formGeratorBankAgent extends LightningElement {
  currentPageReference = null;
  urlStateParameters = null;
  urlPartnerId = null; //param from url
  bankName;
  title;
  businessName;
  address = {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States"
  };
  contactFirstName;
  contactLastName;
  businessPhone;
  mobilePhone;
  email;
  website;
  branch;
  campaign;
  referralSourceFirstName;
  referralSourceLastName;
  referralSourceEmail;
  referralSourcePhone;
  referralSourceID;
  notes;
  fileDescription;
  @api fileUploadRecordId;
  leadSource = "Agent Bank";
  leadRecordType = "Agent Bank Support Lead";
  uploadedFiles

  branchMap = new Map();
  branchOptions;
  campaignMap = new Map();
  campaignOptions;

  message = "";
  error = "";

  //Get url id param
  @wire(CurrentPageReference)
  getStateParameters(currentPageReference) {
    if (currentPageReference) {
      this.urlStateParameters = currentPageReference.state;   //"Lightning Communities don’t support the state property."   https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/components_navigation.htm
      this.setParametersBasedOnUrl();
    }
    console.log(
      `The urlPartnerId param is ----------------> ${this.urlPartnerId}`
    );
  }

  setParametersBasedOnUrl() {
    this.urlPartnerId = this.urlStateParameters.id || null;
  }
   
  // initialize component
  /*
  connectedCallback() {
    //Call Apex - get Legal and Location Accts, and Campaigns

    getPartnerBankNameAndLocations({ partnerAccountId: this.urlPartnerId })
      .then((result) => {
        console.log('success' );
        this.message = result;
        this.error = undefined;
        if(this.message){
          const bankObj = this.message;
          console.log(`The bankObj is ----------------> ${this.bankObj}`);
          console.log(bankObj.partnerLocationBankAcctLst);
      
          this.bankName = bankObj.partnerLegalBankAcct.Name;
          this.title = `Hello, ${this.bankName}!`;
          this.branchOptions = [];
          for (let i of bankObj.partnerLocationBankAcctLst) {
            this.branchOptions.push({value: `${i.Branch_Number__c} - ${i.Name}`, label: `${i.Branch_Number__c} - ${i.Name}`});
            //this.branchOptions.push(`${i.Branch_Number__c} - ${i.Name}`);
            this.branchMap.set(`${i.Branch_Number__c} - ${i.Name}`, i.Id);
          }
          console.log(`The branchOptions is ----------------> ${this.branchOptions}`);
          console.log(`The branchMap is ----------------> ${this.branchMap}`);
      this.campaignOptions =[];
          for (let i of bankObj.partnerLegalBankAcctAssociatedCampaigns) {
            this.campaignOptions.push({value: i.Name, label: i.Name});
            this.campaignMap.set(i.Name, i.Id);
          }
          console.log(
            `The campaignOptions is ----------------> ${this.campaignOptions}`
          );
          console.log(`The campaignMap is ----------------> ${this.campaignMap}`);
          } else{
            this.message = "NO RESULT RETURNED IN CONNECTED CALLBACK";
          }
      })
      .catch((error) => {
        console.log('error');
        this.message = undefined;
        this.error = error;
      });
     // console.log(`The this.message is ----------------> ${this.message}`);
   
  }*/

  handleSubmitClick() {

    let newLeadObject = {
      businessName: this.businessName,
      address:{street:  this.address.street,
        city: this.address.city,
        state: this.address.state,
        postalCode: this.address.postalCode,
      },
      contactFirstName: this.contactFirstName,
      contactLastName: this.contactLastName,
      businessPhone: this.businessPhone,
      mobilePhone: this.mobilePhone,
      email: this.email,
      website: this.website,
      branch: this.branch,
      campaign: this.campaign,
      referralSourceFirstName: this.referralSourceFirstName,
      referralSourceLastName: this.referralSourceLastName,
      referralSourceEmail: this.referralSourceEmail,
      referralSourcePhone: this.referralSourcePhone,
      referralSourceID: this.referralSourceID,
      notes: this.notes,
      fileDescription: this.fileDescription,
      files: this.uploadedFiles
    };

    saveLead({ newLeadObject: newLeadObject })
    .then((result) => {
        this.message = result;
        this.error = undefined;
    })
    .catch((error) => {
        this.message = undefined;
        this.error = error;
    });
  }

  handleBusinessNameChange(event) {
    this.businessName = event.target.value;
  }
  handleStreetChange(event) {
    this.address.street = event.target.value;
  }
  handleCityChange(event) {
    this.address.city = event.target.value;
  }
  handleStateChange(event) {
    this.address.state = event.target.value;
  }
  handlePostalCodeChange(event) {
    this.address.postalCode = event.target.value;
  }
  handleContactLastNameChange(event) {
    this.contactLastName = event.target.value;
  }
  handleContactFirstNameChange(event) {
    this.contactFirstName = event.target.value;
  }
  handleBusinessPhoneChange(event) {
    this.businessPhone = event.target.value;
  }
  handleMobilePhoneChange(event) {
    this.mobilePhone = event.target.value;
  }
  handleEmailChange(event) {
    this.email = event.target.value;
  }
  handleWebsiteChange(event) {
    this.website = event.target.value;
  }
  handleBranchChange(event) {
    this.branch = event.target.value;
  }
  handleCampaignChange(event) {
    this.campaign = event.target.value;
  }
  handleReferralSourceFirstNameChange(event) {
    this.referralSourceFirstName = event.target.value;
  }
  handleReferralSourceLastNameChange(event) {
    this.referralSourceLastName = event.target.value;
  }
  handleReferralSourceEmailChange(event) {
    this.referralSourceEmail = event.target.value;
  }
  handleReferralSourcePhoneChange(event) {
    this.referralSourcePhone = event.target.value;
  }
  handleReferralSourceIDChange(event) {
    this.referralSourceID = event.target.value;
  }
  handleNotesChange(event) {
    this.notes = event.target.value;
  }
  handleAttachedFileDescriptionChange(event) {
    this.fileDescription = event.target.value;
  }
  handleUploadFinished(event) {
    // Get the list of uploaded files
    this.uploadedFiles = event.detail.files;
    alert("No. of files uploaded : " + this.uploadedFiles.length);
  }

  get acceptedFormats() {
    return [".pdf", ".png", ".jpg", ".docx", ".xlsx"];
  }

  get encryptedToken() {
    //use apex to get
  }

  get branchOptions() {
    return this.branchOptions;
  }

  get campaignOptions() {
    return this.campaignOptions;
  }

  get stateOptions() {
    return [
      { label: "Alabama", value: "Alabama" },
      { label: "Alaska", value: "Alaska" },
      { label: "Arizona", value: "Arizona" },
      { label: "Arkansas", value: "Arkansas" },
      { label: "California", value: "California" },
      { label: "Colorado", value: "Colorado" },
      { label: "Connecticut", value: "Connecticut" },
      { label: "Delaware", value: "Delaware" },
      { label: "Florida", value: "Florida" },
      { label: "Georgia", value: "Georgia" },
      { label: "Hawaii", value: "Hawaii" },
      { label: "Idaho", value: "Idaho" },
      { label: "Illinois", value: "Illinois" },
      { label: "Indiana", value: "Indiana" },
      { label: "Iowa", value: "Iowa" },
      { label: "Kansas", value: "Kansas" },
      { label: "Kentucky", value: "Kentucky" },
      { label: "Louisiana", value: "Louisiana" },
      { label: "Maine", value: "Maine" },
      { label: "Maryland", value: "Maryland" },
      { label: "Massachusetts", value: "Massachusetts" },
      { label: "Michigan", value: "Michigan" },
      { label: "Minnesota", value: "Minnesota" },
      { label: "Mississippi", value: "Mississippi" },
      { label: "Missouri", value: "Missouri" },
      { label: "Montana", value: "Montana" },
      { label: "Nebraska", value: "Nebraska" },
      { label: "Nevada", value: "Nevada" },
      { label: "New Hampshire", value: "New Hampshire" },
      { label: "New Jersey", value: "New Jersey" },
      { label: "New Mexico", value: "New Mexico" },
      { label: "New York", value: "New York" },
      { label: "North Carolina", value: "North Carolina" },
      { label: "North Dakota", value: "North Dakota" },
      { label: "Ohio", value: "Ohio" },
      { label: "Oklahoma", value: "Oklahoma" },
      { label: "Oregon", value: "Oregon" },
      { label: "Pennsylvania", value: "Pennsylvania" },
      { label: "Rhode Island", value: "Rhode Island" },
      { label: "South Carolina", value: "South Carolina" },
      { label: "South Dakota", value: "South Dakota" },
      { label: "Tennessee", value: "Tennessee" },
      { label: "Texas", value: "Texas" },
      { label: "Utah", value: "Utah" },
      { label: "Vermont", value: "Vermont" },
      { label: "Virginia", value: "Virginia" },
      { label: "Washington", value: "Washington" },
      { label: "West Virginia", value: "West Virginia" },
      { label: "Wisconsin", value: "Wisconsin" },
      { label: "Wyoming", value: "Wyoming" }
    ];
  }
}