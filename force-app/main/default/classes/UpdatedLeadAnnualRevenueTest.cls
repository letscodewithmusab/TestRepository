@isTest
private class UpdatedLeadAnnualRevenueTest {

     @testSetup
    static void setup() {
        List<Account> accounts = new List<Account>();
        List<Contact> contacts = new List<Contact>();
        // insert 10 accounts
        for (Integer i=0;i<10;i++) {
            accounts.add(new Account(name='Account '+i));
        }
        insert accounts;
    }
    @isTest static void test() {
        Test.startTest();
        UpdateLeadAnnualRevenue obj = new UpdateLeadAnnualRevenue();
        Database.executeBatch(obj);
        Test.stopTest();
       
    }
}