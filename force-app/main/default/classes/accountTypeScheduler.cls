global class accountTypeScheduler implements Schedulable {
   global void execute(SchedulableContext SC) {
        AccountTypeUpdate b = new AccountTypeUpdate ();
       
        //Parameters of ExecuteBatch(context,BatchSize)
        database.executeBatch(b,200);
    // database.executeBatch(new AccountTypeUpdate());
      
   }
      global void callBatch(){
          System.debug('Inside ===schedule');
          database.executeBatch(new AccountTypeUpdate());
          
      }
}