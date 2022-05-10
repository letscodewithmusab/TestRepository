public class Covid19 {
public integer recoverdInArea = 0;
    public static  integer recoverdInCountry = 0;
    
    public Covid19(integer recoverdInArea){
        this.recoverdInArea = recoverdInArea;
        recoverdInCountry += recoverdInArea;
    }
    
    public void treatPatient(){
        recoverdInArea ++ ;
        recoverdInCountry ++ ;
    }
    
    public integer getTreated(){
        return recoverdInArea;
    }
    
}