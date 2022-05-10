trigger ContactTrigger on Contact (Before insert,After insert) {

    
    if(trigger.isInsert && trigger.isBefore){
      //  ContactTriggerHelper.duplicateEmailValidation(trigger.new);
    }

    
    if(trigger.isInsert && trigger.isAfter){
    ContactTriggerHelper.ConAfterInsert(trigger.new);
    }
    
}