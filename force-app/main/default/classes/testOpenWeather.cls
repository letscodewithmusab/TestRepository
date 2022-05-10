public with sharing class testOpenWeather {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Type, Rating, Phone 
            FROM Account];
    }

}