
exports.register = function(req, res){

	if(req.method==='GET'){
		res.render('register', { title: 'Register', result:result});
	}
  	
};

