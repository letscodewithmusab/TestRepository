public class OpportunityTriggerHelper {
    
    public static void opportunityNameDate(list<Opportunity> oppList){   
        Set<Id> AccountIds = new Set<Id>(); 
        for (Opportunity myOpp : oppList) {
            accountIds.add(myOpp.AccountId);
        }
        Map<Id, Account> accountMap = new Map<Id, Account>([SELECT Name FROM Account WHERE Id IN :accountIds]);
        for (Opportunity myOpp :oppList) {
            myOpp.Name = accountMap.get(myOpp.AccountId).Name +  ' - ' + date.today().format();
        }
    }
    
    // method to get the sum of closed Opportunities    
    public static void sumOfClosedAmounts(set<id> AccList){
      
        // Creating a Account list the id is equal to set ids
        List<Account> opportunityAccounts = new List<Account>(); 
        list<Account> AccountList = new list<Account>(  [Select id,	Industry,Closed_Won_Amount__c,Closed_Lost_Amount__c,
                                                         (SELECT Amount,StageName, AccountId
                                                          FROM Opportunities WHERE StageName IN ('Closed Won','Closed Lost'))
                                                         from Account where id IN :AccList]); 
        for(Account acc : AccountList ){
            Double closedWonAmount=0.0;
            Double closedLostAmount =0.0;
            //for each account's opportunity 
            for(Opportunity myOpps : acc.Opportunities){ 
                if(myOpps.StageName == 'Closed Won'){
                    closedWonAmount += myOpps.Amount; 
                }
                if(myOpps.StageName == 'Closed Lost'){
                    closedLostAmount += myOpps.Amount;   
                }  
            }
            acc.Closed_Won_Amount__c = closedWonAmount;
            acc.Closed_Lost_Amount__c = closedLostAmount;
            opportunityAccounts.add(acc);
        }
        update opportunityAccounts;
    }
    
}