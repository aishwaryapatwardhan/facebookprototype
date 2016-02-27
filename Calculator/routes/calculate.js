exports.add = function(req, res){
	console.log('We are in add');
	var val1=req.param("number1");
	console.log("the number1 is"+val1);
	var val2=req.param("number2");
	console.log("the number2 is"+val2);
	
	if((isNaN(val1) !== true)&&(isNaN(val2) !== true)){
		var resu=+val1 + +val2;
		res.send(""+resu);
		console.log("the result is"+resu);
		
	}
	else{
		res.send("Addition can not be performed invalid input ");
		console.log("Please provide valid inputs");
	}
};

exports.sub = function(req, res){
	console.log('We are in subtract');
	var val1=req.param("number1");
	console.log("the number1 is"+val1);
	var val2=req.param("number2");
	console.log("the number2 is"+val2);
	
	if((isNaN(val1) !== true)&&(isNaN(val2) !== true)){
		var resu=+val1 - +val2;
		res.send(""+resu);
		console.log("the result is"+resu);
	
		
	}
	else{
		res.send("substraction can not be performed invalid input ");
		console.log("Please provide valid inputs");
	}
};

exports.mul = function(req, res){
	console.log('We are in mult');
	var val1=req.param("number1");
	console.log("the number1 is"+val1);
	var val2=req.param("number2");
	console.log("the number2 is"+val2);
	
	if((isNaN(val1) !== true)&&(isNaN(val2) !== true)){
		var resu=+val1 * +val2;
		res.send(""+resu);
		console.log("the result is"+resu);
		
	}
	else{
		res.send("Multiplication can not be performed invalid input ");
		console.log("Please provide valid inputs");
	}
};


exports.div = function(req, res){
	console.log('We are in mult');
	var val1=req.param("number1");
	console.log("the number1 is"+val1);
	var val2=req.param("number2");
	console.log("the number2 is"+val2);
	
	if((isNaN(val1) !== true)&&(isNaN(val2) !== true)){
		if(val2>0){
		var resu=+val1 / +val2;
		res.send(""+resu);
		console.log("the result is"+resu);
		}
		else
			{
			res.send("Divide by zero is not allowed!!");
			
			}
	}
	else{
		res.send("Division can not be performed invalid input ");
		console.log("Please provide valid inputs");
	}
};