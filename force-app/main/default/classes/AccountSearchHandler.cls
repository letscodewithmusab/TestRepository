public with sharing class AccountSearchHandler {
    @AuraEnabled(cacheable=true)
    public static List<sobject> getRecords(String srhKey ,String objectName){
      string key = '\'' + String.escapeSingleQuotes(srhKey) + '%\''; 
      string query = 'SELECT Id,Name FROM' +objectName+ 'WHERE Name LIKE '+key+' LIMIT 4'; 
      String s = objectName;
      System.debug(s); 
      System.debug(Database.query(query));
      return Database.query(query); 
     
      //List<Contact> accountList = [SELECT Name FROM Contact Where Name like :key LIMIT 5];
      //return accountList;
    }
}