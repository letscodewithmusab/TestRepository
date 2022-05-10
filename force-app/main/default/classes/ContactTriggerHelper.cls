public class ContactTriggerHelper {
    
    public static void ConAfterInsert(Contact[] contactList){
        list<messaging.Email> emailList = new list<messaging.Email>();
        EmailTemplate TempEmail =[Select id from EmailTemplate where Name = 'Welcome Contact Template'];
        for(Contact newContact : contactList){
            Messaging.SingleEmailMessage insertContact = new Messaging.SingleEmailMessage();
            insertContact.setToAddresses(new String[] {newContact.Email});
            insertContact.setTargetObjectId(newContact.Id);
            insertContact.setTemplateId(tempEmail.Id); 
            if(newContact.Email != null){
                emailList.add(insertContact);
            }
        }
        if(emailList.size() >0){
            messaging.sendEmail(emailList);
        }
    }
    
    public static void duplicateEmailValidation(list<Contact> myContactList){
        
        // Set to store email ids
        Set <String> emailSet = new Set<String>();   
        // set to store existing emails that matched emailSet
        Set<String> existingEmails = new set<String>(); 
        // Iterate through each Contact and add their email to their respective Sets
        for (contact con:myContactList) {
            emailSet.add(con.email);
        }
        // get the existing emails which match the emails in emailSet
        for(Contact con : [select Email from contact where email in : emailSet]) {
            existingEmails.add(con.Email);
        }
        // for each contact in trigger.new
        for(contact contactList :myContactList) {
            if(existingEmails.contains(contactList.Email)) {
                contactList.Email.adderror('This email is already registered');
            }
        }
        
        
    }   
}