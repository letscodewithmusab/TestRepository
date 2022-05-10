trigger AccountTrigger on Account (After insert, After Update,Before delete) {
    
    if(trigger.isInsert){
        AccountTriggerHelper.accAfterInsertTrigger(trigger.new);
        
    }
    
    if(trigger.isUpdate){
        //System.debug('Isupdate');
        AccountTriggerHelper.accAfterUpdateTrigger();
        if(System.IsBatch() == false && System.isFuture() == false){
        database.executebatch(new AccountRevenueUpdate());
        }


    }
    if(trigger.isDelete){
        AccountTriggerHelper.accBeforeDelete(trigger.old);
    }
}