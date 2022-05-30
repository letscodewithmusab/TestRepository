public class TryCatch {
    
    public static void insertAccount(String AccNumber){
        try{
            Account acc = new Account();
            acc.Name = 'Shubman Gill';
            acc.AccountNumber =AccNumber;
            insert acc;
        }
        catch(DmlException e){
            System.debug('The following exception has occurred: ' + e.getMessage());
        }
    }
    
}