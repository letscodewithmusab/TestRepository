global class AccountTypeUpdate implements Database.Batchable<sObject>,Database.stateful {
    global Database.QueryLocator start(Database.BatchableContext BC) {
        // collect the batches of records or objects to be passed to execute
         System.debug('Inside start ');
        String query = 'SELECT Id, Type FROM Account';
        return Database.getQueryLocator(query);
    }
     
    global void execute(Database.BatchableContext BC, List<Account> accList) {
        for(Account acc : accList) {        
            acc.Type ='Referral';
        }
        try {
            // Update the Account Record
            update accList;
         
        } catch(Exception e) {
            System.debug(e);
        }
         
    }   
     
    global void finish(Database.BatchableContext BC) {
        system.debug('The Account Type is Updated');
    }
}