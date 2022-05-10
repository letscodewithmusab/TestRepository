public class AnimalsCallouts {
    
    public static HttpResponse makeGetCallout(){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if(response.getStatusCode() == 200){
            // For priniting the values in JSON format
            //System.debug(response.getBody()); 
        Map<String,Object> results = (Map<String,Object>) JSON.deserializeUntyped(response.getBody());    
            
        List<Object> animals = (List<Object>) results.get('animals');
            system.debug('Recieved the following Animals:');
                 for(Object animal: animals) {
                System.debug(animal);
            }
        }
        
        return response;
    }
   
     public static HttpResponse makePostCallout() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setBody('{"name":"mighty moose"}');
        HttpResponse response = http.send(request);
        // Parse the JSON response
        if(response.getStatusCode() != 201) {
            System.debug('The status code returned was not expected: ' +
                response.getStatusCode() + ' ' + response.getStatus());
        } else {
            System.debug(response.getBody());
        }
        return response;
    }        
    
    
}