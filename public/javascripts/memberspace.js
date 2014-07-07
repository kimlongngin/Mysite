
/* 
	1./ This javascript file use to make style on the file tag 
	2./ This javascript file use to browse image file and preview on the view file
*/

$(document).ready(function(){
	
	$(".gallery:gt(0) a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'fast',slideshow:10000, hideflash: true});
});

function CallFile(filename){
	document.getElementById(filename).click();
	
	/*var lg=document.getElementById(input).value;
			    var lastFive = lg.substr(lg.length - 10); 
				input.innerHTML=".."+lastFive;
				alert(lastFive);
*/	//window.location.href = "http://localhost:8080/memberspaceAdd.jade";
            
}
	
function readURL(input,imagefile,displayfile) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(imagefile)
                .attr('src', e.target.result)
                .width(80)
                .height(80);
        };
        
        reader.readAsDataURL(input.files[0]);

      	/*  alert(input.value)*/
      	
      	//  alert(imagefile.value)

        var lg=input.value;
	    var lastFive = lg.substr(lg.length - 10); 
		displayfile.innerHTML=".."+lastFive;

		//alert(displayfile.innerHTML);


		var optlogo = document.getElementById('optlogo');
		var optpublish = document.getElementById('optpublish');
		var optimagedefi = document.getElementById('optimagedefi');
	    var optlafin = document.getElementById('optlafin');

    	optlogo.options[optlogo.options.length] = new Option(input.value);
    	optpublish.options[optpublish.options.length] = new Option(input.value);
    	optimagedefi.options[optimagedefi.options.length] = new Option(input.value);
    	optlafin.options[optlafin.options.length] = new Option(input.value);

   		
    	
    }
}


function readURLEdit(input,imagefile,displayfile) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(imagefile)
                .attr('src', e.target.result)
                .width(80)
                .height(80);
        };
        
        reader.readAsDataURL(input.files[0]);

      	/*  alert(input.value)*/
      	
      	//  alert(imagefile.value)

        var lg=input.value;
	    var lastFive = lg.substr(lg.length - 30); 
		displayfile.innerHTML=".."+lastFive;

		//alert(displayfile.innerHTML);

   		
    	
    }
}


function report(period) {

	 
	window.location.href = "http://localhost:8080/newquizz?num="+period;
} 

function sendReport(value) {
	window.location.href = "http://localhost:8080/challengPhoto?num="+value;
}

function sendReportQuizz(value) {
	window.location.href = "http://localhost:8080/challengeQuizz?num="+value;
}

function sendReportGoods(value) {
	window.location.href = "http://localhost:8080/challengeGoods?num="+value;
}

