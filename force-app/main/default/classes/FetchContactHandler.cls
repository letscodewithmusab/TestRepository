public with sharing class FetchContactHandler {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String contactLastName){
      String key = '%'+ contactLastName + '%';
      List<Contact> contactList = [SELECT LastName,LeadSource FROM Contact Where LastName like :key];
      return contactList;
    }
}