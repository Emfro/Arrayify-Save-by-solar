const http = require('http');
const url = require('url');


http.createServer((request, response) => {
  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });

  response.on('error', (err) => {
    console.error(err);
  });

  const adr = url.parse(request.url,true);  
  const resultbody = {success: false, result: []}; 
  
  if (request.method === "GET"){
    switch(adr.pathname){
    	//Switches between which api that is requested.
      case "/arrayify": 
        var present = false;
        var q = adr.query;
        var array = q.array.split(',');
        
        	// Checking if foo or bar is in array, if so then present is set to true.
        for (var i = array.length - 1; i >= 0; i--) {
           if(array[i].toLowerCase().includes("foo")||array[i].toLowerCase().includes("bar")){
            present = true;
           }
        }
        if(present){
        	// Foo or Bar is in array, adding the array to resultbody.
          resultbody.success = true;
          resultbody.result = array;

          response.writeHeader(200, 'OK', {'Content-Type': 'application/json'});

          response.end(JSON.stringify(resultbody,null,1));

          
        } else {
           // Bar or Foo is not in array, then statusCode 400.
          response.writeHeader(400, 'Bad Request', {'Content-Type': 'application/json'});

          response.end('');
          
        }
        break;
      default:
      		// No available api was requested.
          response.writeHeader(200, {'Content-Type': 'application/json'});

          response.end('Available api: \n arrayify');
    }

         
  } else {
  	// Not found
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);

