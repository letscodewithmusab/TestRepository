public class Hotelwrapper {
    public String recId {get;set;}
    public string state {get;set;}
    public string city {get;set;}
    public List<ClsRoom> lstrooms {get;set;}
    public Hotelwrapper(){
        this.lstrooms = new List<ClsRoom>();
    }
    public class ClsRoom{
        public string roomId {get;set;}
        public string hotelId {get;set;}
        public decimal tarrif {get;set;}
    }
}