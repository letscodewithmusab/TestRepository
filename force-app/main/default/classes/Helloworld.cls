public class Helloworld {
public string greeting = 'Hello world ';

 public void message(String msg) {
 system.debug(msg);
 
 }
    
    public string getday(integer day){
      string daystring = ' ';
        switch on day {
            when 0 {
                daystring = 'sunday';
            }
            
            when 1 {
                daystring = 'monday';
            }
            
            when 2 {
                daystring = 'tuesday';
            }
            when 3 {
                daystring = 'wednesday';
            }
            when 4 {
                daystring = 'thursday';
            }
            
            when 5 {
                daystring = 'friday';
            }
            
            when 6 {
                daystring = 'saturday';
            }
            
            when else {
                daystring = 'Sorry Did not Find';
            }
        }
        return daystring;
        
    }    

}