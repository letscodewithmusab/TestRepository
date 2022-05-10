public class AccountSelectClassController {

    //Our collection of the class/wrapper objects wrapAccount 
    public list<wrapAccount> wrapAccountList{get; set;}
    public list<Account> selectedAccounts{get;set;}
    
    public AccountSelectClassController(){
        if(wrapAccountList == Null){
            wrapAccountList = new List<wrapAccount>();
            for(Account a : [select Id, Name,BillingState, Website, Phone from Account limit 10]){
                wrapAccountList.add(new wrapAccount(a));
            }
        }
        system.debug(wrapAccountList);
    }
    
    public void processSelected(){
        selectedAccounts =  new List<Account>();
        for(wrapAccount wrapObj : wrapAccountList){
            if(wrapObj.selected == true){
                selectedAccounts.add(wrapObj.acc);
            }
        }
    }
     
    // Wrapper or Container Class
    public class wrapAccount {
        public Account acc {get;set;}
        public Boolean selected {get;set;}
        
        public wrapAccount(Account a){
           acc = a;
           selected = false;
        }
    }    

}