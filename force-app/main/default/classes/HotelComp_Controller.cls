public with sharing class HotelComp_Controller {
    @AuraEnabled(cacheable=true)
    public static List<Room__c>  getHotelRooms(String recordId) {
   // system.debug('RecordId '+ recordId);

    List<Room__c> roomList = [SELECT Id,Tariff__c,Hotel__c from Room__c Where Hotel__c =: recordId];
    system.debug(roomList);
    return roomList;

    }

    @AuraEnabled
    public static void updateRecords(String recordId, list<Hotel__c> hotelList , List<Room__c> roomList){
        hotelList = [SELECT Id, City__c,Name,Street_Address__c,State__c from Hotel__c Where Id=:recordId];
       system.debug(hotelList);
      if(recordId!= Null){
      // System.debug(hotels.get(0).Street_Address__c);
       update hotelList;
      }
        roomList = [SELECT Id,Tariff__c,Hotel__c from Room__c Where Hotel__c =: recordId];
       system.debug(roomList);
       upsert roomList;

    }
        
       /* system.debug('recordIds'+recordId);
        WrapperClass wrapper = new WrapperClass();
        Hotel__c hotelObj = new Hotel__c();
        List<Room__c> pLIList = new List<Room__c>();
        Room__c pLI= new Room__c();
        
        if(!string.isEmpty(recordId)){
            hotelObj = [SELECT Id, City__c,Name,Street_Address__c,State__c,
                    (SELECT Id,	Hotel__c,Occupancy__c,Tariff__c FROM Rooms__r)
                    FROM Hotel__c WHERE Id =: recordId];
            
            pLI.Hotel__c = hotelObj.Id;
            if(hotelObj.Rooms__r.size() > 0){
                pLIList = hotelObj.Rooms__r;
            }else{
                pLIList.add(pLI);
            }
        }else{
            pLIList.add(pLI);
        }
        wrapper.productListing = hotelObj;
        wrapper.prodLineItemList = pLIList;
        return wrapper;
}

public class WrapperClass{
    @AuraEnabled
    public Hotel__c productListing{get;set;}
    @AuraEnabled
    public List<Room__c> prodLineItemList{get;set;}
    @AuraEnabled
    public Integer lineItemCount{get;set;}
}
*/
}