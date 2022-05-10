trigger OpportunityTrigger on Opportunity (before insert,After insert,After Update, After Delete) {
    
  /*  if((trigger.isbefore && trigger.isInsert)){
        OpportunityTriggerHelper.opportunityNameDate(trigger.new);
    }*/
    
    // calling sumOfClosedAmount methods for getting sum on Account Field  
    if(trigger.isAfter &&  (trigger.isUpdate || trigger.isInsert)) {  
        set<id> accId = new set<id>();
        for(Opportunity myOpps :trigger.new){
            if(Trigger.isInsert){
                accId.add(myOpps.AccountId);
            }
            else if(trigger.isUpdate && myOpps.AccountId != trigger.oldMap.get(myOpps.id).AccountId){
                accId.add(myOpps.AccountId);
                accId.add(trigger.oldMap.get(myOpps.id).AccountId);
            }
            else if(trigger.isUpdate && myOpps.Amount != trigger.oldMap.get(myOpps.id).Amount){
                accId.add(myOpps.AccountId);
                //accId.add(trigger.oldMap.get(myOpps.id).AccountId);
            }
            else if(trigger.isUpdate && myOpps.StageName != trigger.oldMap.get(myOpps.id).StageName){
                accId.add(myOpps.AccountId);
                //accId.add(trigger.oldMap.get(myOpps.id).AccountId);
            }
        }
        if(accId.size()>0) OpportunityTriggerHelper.sumOfClosedAmounts(accId);
    }
    
    if(trigger.isDelete){
        set<id> accId = new set<id>();
        for(Opportunity myOpps :trigger.old){
            accId.add(myOpps.AccountId);
        }
        OpportunityTriggerHelper.sumOfClosedAmounts(accId);
    }
    
}