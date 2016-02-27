/**
 * New node file
 */
var ejs= require('ejs');
var mysql = require('mysql');

function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : '',
	    database : 'fbash',
	    port	 : 3306
	});
	return connection;
}

exports.signup = function(req, res){
	
	var connection=getConnection();
	
	var firstName = req.param("firstName");
	var lastName = req.param("lastName");
	var email = req.param("email");
	var password = req.param("password");
	
	console.log("inside signup");
	console.log(firstName);
	
	var sqlQuery = "insert into users(fname,lname,email,password) values ('"+firstName+"','"+lastName+"','"+email+"','"+password+"');";
	
	
	console.log("\nSQL Query::"+sqlQuery);
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
			connection.end();
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			req.session.username = email;
			
			connection.end();
			
			var json_responses = {"success" : 1};
			res.send(json_responses);
//			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
};

exports.signin = function(req, res){
	
	var connection=getConnection();
	
	var email = req.param("email");
	var password = req.param("password");
	
	console.log("inside signin");
	
	var sqlQuery = "select password from users where email ='"+email+"'";
	
	
	console.log("\nSQL Query::"+sqlQuery);
	
	connection.query(sqlQuery,function(err,rows){
		if(err)
		{
			connection.end();
			console.log("ERROR: " + err.message);
		}
		else
		{
			console.log('Data received from Db:\n');
			console.log(rows);
			
			if (rows.length == 0)
			{
				console.log("Invalid username");
				connection.end();
				var json_responses = {"success" : -1};
				res.send(json_responses);
			}
			else
			{
//				for (var i = 0; i < rows.length; i++) {
//					  console.log(rows[i].password);
//					};
				
				var correctPassword = rows[0].password;
				
				if (correctPassword === password)
				{
					console.log("successful login");
					req.session.username = email;
					connection.end();
					var json_responses = {"success" : 1};
					res.send(json_responses);
				}
				else
				{
					 alert("wrong password");
					console.log("wrong password");
					connection.end();
					var json_responses = {"success" : 0};
					res.send(json_responses);
					
				}
			}	
		}
	});
	console.log("\nConnection closed..");
}; 

exports.signout = function(req, res){
	req.session.destroy();
	res.redirect('/');
//	var json_responses = {"success" : 1};
//	res.send(json_responses);
};
