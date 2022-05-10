public with sharing class BatchDemoButton {

    @AuraEnabled
    public static void demoMethod(String recordIds) {
        system.debug( 'recordIds' + recordIds);
        Id jobId = Database.executeBatch(new AccountRevenueUpdate(recordIds));
}

}