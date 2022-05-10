@isTest
public class ContactTriggerTest {
    
    @isTest static void contactValildationTest(){
       test.startTest();
        list<Contact> con = new list<Contact>();
       
        Contact objTest = new Contact(LastName='hello', Email='example123@gmail.com');
        con.add(objTest);
        Contact objTest2 = new Contact(LastName='Musab', Email='abc@gmail.com');
        con.add(objTest2);
        Database.insert(con,false);
      
        list<contact> newCon = new list<contact>();
        
        Contact obj = new Contact(LastName='hello2', Email='example123@gmail.com');
        newCon.add(obj);
        Database.insert(newCon,false);
        test.stopTest();
     /*   for(Database.SaveResult r : result){
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
        }*/
        
    }
}