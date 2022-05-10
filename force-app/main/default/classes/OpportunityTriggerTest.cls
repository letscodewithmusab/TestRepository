@isTest
public class OpportunityTriggerTest {
    
    @isTest static void OpportuinityInsertTest(){
        Account acc = new Account(Name='Test Class');
        DataBase.insert(acc,false);
        list<Opportunity> myOpps = new list<Opportunity>();
        Opportunity opp = new Opportunity(AccountId = acc.id ,Name='abc', StageName='Closed Won',Closedate=System.today(),Amount = 20);
        myOpps.add(opp);
        Opportunity opp2 = new Opportunity(AccountId = acc.id ,Name='abc', StageName='Closed lost',Closedate=System.today(),Amount = 30);
        myOpps.add(opp2);
        Opportunity opp3 = new Opportunity(AccountId = acc.id ,Name='abc', StageName='Closed Won',Closedate=System.today(),Amount = 20);
        myOpps.add(opp3);
        
        Test.startTest();
        Database.SaveResult[] result = Database.insert(myOpps, false);
        Test.stopTest();
        for(Database.SaveResult r : result){
            if(r.isSuccess()){
                system.debug('Successfully inserted');
            }
            else{
                for(Database.Error db : r.getErrors() ){
                    system.debug(db.getStatusCode());
                    system.debug(db.getMessage());
                    system.debug(db.getFields());
                }
            }
        }
        
    }
    
    @isTest static void OpportunityUpdateTest(){
        Account acc = new Account(Name='Test Class');
        DataBase.insert(acc,false);
        Account acc2 = new Account(Name='Test Class 2');
        DataBase.insert(acc2,false); 
        
        list<Opportunity> myOpps = new list<Opportunity>();
        Opportunity opp = new Opportunity(AccountId = acc.id ,Name='abc', StageName='Closed Won',Closedate=System.today(),Amount = 20);
        myOpps.add(opp);
        Opportunity opp2 = new Opportunity(AccountId = acc.id ,Name='abc', StageName='Closed lost',Closedate=System.today(),Amount = 30);
        myOpps.add(opp2);
        Opportunity opp3 = new Opportunity(AccountId = acc.id ,Name='abc', StageName='Closed Won',Closedate=System.today(),Amount = 20);
        myOpps.add(opp3);
        Database.insert(myOpps,false);
        
        // list<Oppoortunity> OppList = [Select Amount,StageName,AccountId from Opportunity Where AccountId =: acc.id];
        list<Opportunity> oppList = new  list<Opportunity>();
        opp.StageName = 'Prospecting';
        oppList.add(opp);
        opp2.Amount=50;
        OppList.add(opp2);
        opp3.AccountId = acc2.Id;
        OppList.add(opp3);
        
        Test.startTest();
        Database.SaveResult[] result = Database.update(oppList, false);
        Database.DeleteResult[] deleteResult = Database.delete(myOpps,false);
        
        Test.stopTest();
        
    }
    
}