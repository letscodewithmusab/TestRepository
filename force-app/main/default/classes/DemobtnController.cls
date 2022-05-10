public class DemobtnController {
     public String retUrl;
     public String recordId;

    public DemobtnController(ApexPages.StandardSetController controller) {
        system.debug('Hello ' + ApexPages.CurrentPage().getparameters().get('id'));
        recordId = ApexPages.CurrentPage().getparameters().get('id');
      //  runBatch();
    }
    

    
    public pageReference runBatch() {
    database.executebatch(new AccountRevenueUpdate(recordId));
        if(recordId == Null){
        retUrl = apexpages.currentpage().getParameters().get('vfRetURLInSFX');     
             PageReference pageRef = new PageReference(retUrl);
            return pageRef;
             }
        else{
        PageReference pageRef2 = new PageReference('https://musab-dev-ed.lightning.force.com/lightning/r/Account/'+recordId+'/view');
  pageRef2.setRedirect(true);
  return pageRef2;
        }

    }
}