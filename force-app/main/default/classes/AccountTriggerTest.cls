@isTest
public class AccountTriggerTest {
    
    @testSetup static void accountInsertTest(){
        list<Account> accountList = new list<Account>();
        Account acc = new Account();
        for(integer i=0; i<2; i++){
        acc.Name = 'ABC Account';
        acc.TotalFamily__c = 2; 
        accountList.add(acc);
       }
       database.insert(acc);
    } 
    
    @isTest static void accountUpdateTest(){
      list<Account> newAccountList = [Select BillingCity,BillingCountry,BillingStreet,BillingState from Account];
        list<Account> updateList = new list<Account>();
        for(Account a : newAccountList){
           a.BillingCity = 'Jaipur';
           a.BillingCountry = 'India';
           a.BillingState = 'Rajasthan';
           a.BillingStreet = 'A-32';
            updateList.add(a);
        }
        update updateList;
    }
    
    @isTest static void accountDeleteTest(){
        list<Account> newAccountList = [SELECT id from Account];
        try{
        delete newAccountList;
        }
        catch(exception e){
            
            system.assert(e.getMessage() == 'Error');
        }
    }
    
}