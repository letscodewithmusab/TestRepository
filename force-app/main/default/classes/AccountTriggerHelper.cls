public with sharing class AccountTriggerHelper {
    
    public static void accAfterInsertTrigger(Account[] accountList){
        
        Contact[] newContacts = [SELECT LastName FROM Contact
                                 WHERE AccountId IN :accountList];
        
        for (Account a : accountList) {
            
            for(integer i=1; i<=a.TotalFamily__c; i++){
                newContacts.add(new Contact (LastName = a.Name, AccountId = a.Id ));
            }
            
        }
        insert newContacts;
  
    }
    
    
    public static void accAfterUpdateTrigger(){
        Account[] AccountList = [SELECT BillingCity,BillingCountry,BillingStreet,BillingState,
                                 (SELECT MailingStreet,MailingState,MailingCity,MailingCountry from Contacts) 
                                 From Account Where id In : trigger.new]; 
        
        list<contact> contactUpdate = new list<Contact>();
        
        for(Account myAccount : AccountList){
            
            for(Contact con : myAccount.Contacts){
                
                con.MailingCity = myAccount.BillingCity;
                con.MailingCountry = myAccount.BillingCountry;
                con.MailingStreet = myAccount.BillingStreet;
                con.MailingState = myAccount.BillingState;
                contactUpdate.add(con);
            }
        }
        update contactUpdate;
        
    }
    
    public static void accBeforeDelete(list<Account> accountsList){
        
        // Create a profileId object and store the ids of profiles
        Id profileid=Userinfo.getProfileId();  
        
        //Create a object for profile where I am taking the name of All Profiles
        profile profilname=[select Name from Profile where id=:profileid];
        
        //Iterating Account Records and checking condition for profile Name
        for(Account accountDuplicate:accountsList){
            if(profilname.Name !='System Administrator'){
                accountDuplicate.addError('No Access for Deletion');                                    
            }
            
        }
    }
}