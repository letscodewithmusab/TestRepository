global class AccountRevenueUpdate implements Database.Batchable<sObject>,Database.Stateful {
    
    global string recordId;
    public AccountRevenueUpdate(string recordId)
    {
        this.recordId = recordId;
    }
    public AccountRevenueUpdate(){

    }
    
    global Database.QueryLocator start(Database.BatchableContext bc) {
        system.debug(recordId);
        String query = 'SELECT NumberOfEmployees from Account';
        if(recordId != Null){
            query += ' Where Id =:recordId';
        }
       // system.debug('Query' + query);
        return Database.getQueryLocator(query);

      /*  
        if(recordId != Null){
        return Database.getQueryLocator([SELECT NumberOfEmployees from Account where Id =: recordId]);
        }
        else{
            return Database.getQueryLocator([SELECT NumberOfEmployees from Account]);
        }*/
    }
    
    global static void execute(Database.BatchableContext bc, List<Account> accList){
        system.debug('Account List' + accList);
        for(Account acc:accList){
           acc.NumberOfEmployees= 6;
            }
        update accList;
    }
    
    global void finish(Database.BatchableContext bc){
       system.debug('NumberOfEmployees is Updated');
    }
    
    global void execute(SchedulableContext sc){
        AccountRevenueUpdate b = new AccountRevenueUpdate (recordId);
        database.executebatch(b);
    }
}