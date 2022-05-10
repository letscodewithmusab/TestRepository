global class UpdateAccountAnnualRevenue implements Database.Batchable<sObject>,Database.Stateful {
   
    global Database.QueryLocator start(Database.BatchableContext bc) {
        
        return Database.getQueryLocator([SELECT NumberOfEmployees from Account]);
    }
    
    global void execute(Database.BatchableContext bc, List<Account> accList){
        for(Account listOfAccounts:accList){
           listOfAccounts.NumberOfEmployees= 5;
            }
        update accList;
    }
    
    global void finish(Database.BatchableContext bc){
       system.debug('NumberOfEmployees is Updated');
    }
}