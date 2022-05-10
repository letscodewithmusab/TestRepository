public with sharing class ContactLwcController {
    
    @AuraEnabled
public static Account createAccount(Account acc){
 //   Account account=(Account)JSON.deserialize(acc);
    insert acc;
    return acc;
}
}