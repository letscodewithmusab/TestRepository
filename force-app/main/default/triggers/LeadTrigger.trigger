trigger LeadTrigger on Lead (before insert, before update,after update) {
//system.debug('Lead Created successfully');

 /*   Switch on Trigger.operationType{
        when BEFORE_INSERT{
            for(Lead leadRecord : Trigger.new){
       // if lead source is blank , then make it 'other'
        if(string.isBlank(leadRecord.LeadSource)){
            leadRecord.LeadSource = 'Other';
        }
        
            if(string.isBlank(leadRecord.Industry) && Trigger.isInsert){
            leadRecord.addError('Industry Field Is mandatory');
          }    
        }
    }
        when AFTER_INSERT {
            for(Lead leadRecord : Trigger.new){
                //CREATE A TASK 
                Task leadTask = new Task(Subject='Follow up on lead status', whoId=leadRecord.Id);
                insert leadTask;
            }
        }
        
        when BEFORE_UPDATE {
            for(Lead leadRecord : Trigger.new){
       // if lead source is blank , then make it 'other'
        if(string.isBlank(leadRecord.LeadSource)){
            leadRecord.LeadSource = 'Other';
        }
                if((leadRecord.Status == 'Closed - Converted' || leadRecord.Status == 'Closed - Not Converted') && Trigger.oldMap.get(leadRecord.Id).Status == 'Open - Not Contacted' ){
            leadRecord.Status.addError('You cannot directly close an open lead Record');
            }
           }
        }
    }*/
}