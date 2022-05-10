public class OpportunityController {

    public static void updateProfile(List<id> oppIds){
        for(id oppId : oppIds ){
         //get opp record
        Opportunity opp = [SELECT id,Amount,Profile__c FROM Opportunity WHERE  id =: oppId];
            if(opp.Amount == Null){
                 opp.Profile__c = ' ';
            }
            if(opp.Amount < 10000){
                opp.Profile__c = 'Low';
            }
            if(opp.Amount > 50000){
                opp.Profile__c ='High';
                
            }
            else{
                opp.profile__c = 'Medium';
            }
            update opp;
        }
    }
}