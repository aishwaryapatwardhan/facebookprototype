/**
 * New node file
 */
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

exports.showSearch = function(req, res){
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("searchforuser",{search:req.session.search});
	}
	else
	{
		res.redirect('/');
	}
}

exports.getSearchedUsers = function(req, res){
	console.log(req.session.search);
	
	var connection=getConnection();
	var sqlQuery="select a.email,concat_ws(' ',a.fname,a.lname) as wholename,b.friend1, b.friend2, b.friend1name, b.friend2name, b.status from users a left outer join friends b on a.email=b.friend1 where CONCAT_WS(' ', a.fname, a.lname) LIKE '%"+req.session.search+"%' and a.email != '"+req.session.username+"' and b.friend2='"+req.session.username+"';";
	
	connection.query(sqlQuery,function(err,rows){
		if(err)
		{
			connection.end();
			console.log("ERROR: " + err.message);
		}
		else
		{			
			if (rows.length != 0)
			{
				console.log("rows exist");
				console.log(rows);
				
				var searchResults = [];
				
				for(var index=0; index<rows.length; index++)
				{
					searchResults.push({email : rows[index].email,
						                wholename : rows[index].wholename,
						                friend1 : rows[index].friend1,
						                friend2 : rows[index].friend2,
						                friend1name : rows[index].friend1name,
						                friend2name : rows[index].friend2name,
						                status : rows[index].status});
				}
				
				connection.end();
				
				var json_responses = {"results" : searchResults};
	            res.send(json_responses);
			}
		}
	});
};