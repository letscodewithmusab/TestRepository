public with sharing class BulkContactsHandler {
  /*  public String getId = '';
    @AuraEnabled
    public static string getAcountId(String idOfAccount){
        getId = idOfAccount;
        return getId;
    }*/
    @AuraEnabled
    public static void insertContacts(List<Contact> ListOfContacts) {
     
        insert ListOfContacts;
    }
}