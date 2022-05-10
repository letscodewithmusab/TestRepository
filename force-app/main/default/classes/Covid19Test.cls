@isTest
public class Covid19Test {
    
    @isTest
    public static void treatPatientTest(){
        // Here creating the instance of class
        Covid19 jaipur = new Covid19(10);
        integer treated = jaipur.getTreated();
        //check if count is 10 or not
      system.assertEquals(10, treated, 'treated count does not match');
        
         // Here creating the instance of class
        Covid19 Hyd = new Covid19(112);
         treated = Hyd.getTreated();
        //check if count is 112 or not
      system.assertEquals(112, treated, 'treated count does not match');
        
        //check if recoverdincountry is 122 or not
       system.assertEquals(122, Covid19.recoverdInCountry, 'treated count does not match'); 
        
        jaipur.treatPatient();
        treated = jaipur.getTreated();
        system.assert(treated == 11 , 'treated count does not match');
                system.assert(Covid19.recoverdInCountry == 123 , 'treated count does not match');

    }

}