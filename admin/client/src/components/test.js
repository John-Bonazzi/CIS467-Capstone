var request = require("request");

export function getCall(){


    alert("Inside get call");
var options = { method: 'GET',
  url: 'http://localhost:5000/admin',
  headers: 
   { 
     'Content-Type': 'application/x-www-form-urlencoded' },
  form: { name: 'test2', option: '0' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

}
