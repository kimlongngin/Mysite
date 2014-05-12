
exports.home = function(req, res)
{
	if(req.method==='GET')
	{
		res.render('home', {title:'Home'});
	}
}