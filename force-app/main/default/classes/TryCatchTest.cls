@isTest
public class TryCatchTest {
    @isTest static void testMethod1() {
        TryCatch.insertAccount('12346785');
      }
    
    @isTest static void testMethod2() {
       /*  Account testAcct2 =  new Account();
        testAcct2.Name = 'Shubman';
        testAcct2.AccountNumber = '1234568';
        try{
        insert testAcct2;
        TryCatch.insertAccount();
        }
        catch(DmlException e){
            System.debug('The following exception has occurred: ' + e.getMessage());
        }*/
         TryCatch.insertAccount('123456');
    }
}