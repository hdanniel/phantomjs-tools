var page = require('webpage').create(),
    system = require('system'),
    address;

if (system.args.length <= 0) {
    console.log('Usage: check_page.js <some URL> <warning> <critical>');
    phantom.exit();
}

address = system.args[1];
warning = system.args[2];
critical = system.args[3];
exit_code = 0;

page.onLoadStarted = function () {
        page.startTime = new Date();
};

page.onResourceReceived = function(response) {
    //console.log('Response (#' + response.id + ', url "' + response.url + '"): ') ;
    page.resourcesTotal =  response.id;
};

page.open(address, function (status) {
    if (status !== 'success') {
        console.log('PAGE CRITICAL - Fail to load ' + address);
	exit_code = 2;
    } 
    else {
	//page.render('');
	page.endTime = new Date();
        page.loadTime = page.endTime - page.startTime;
       	console.log(page.resourcesTotal + ' requests');
        if (page.loadTime > critical) {
		message = "PAGE CRITICAL";
		exit_code = 2;
    	}
        else if (page.loadTime > warning) {
		message = "PAGE WARNING";
		exit_code = 1;
    	}
	else  {
		message = "PAGE OK";
		exit_code = 0;
    	}
    console.log(message + ' - Load Time: ' + page.loadTime + ' ms, ');
    }
    phantom.exit(exit_code);
});
