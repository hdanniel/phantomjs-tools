var page = require('webpage').create(),
    system = require('system'),
    t, address;

if (system.args.length <= 0) {
    console.log('Usage: check_page.js <some URL> <warning> <critical>');
    phantom.exit();
}

t = Date.now();
address = system.args[1];
warning = system.args[2];
critical = system.args[3];
exit_code = 0;

page.onLoadStarted = function () {
        page.startTime = new Date();
};

page.open(address, function (status) {
    if (status !== 'success') {
        console.log('LOAD CRITICAL - Fail to load ' + address);
	exit_code = 2;
    } 
    else {
	//page.render('');
	page.endTime = new Date();
        t = Date.now() - t;
        if (t > critical) {
        	console.log('LOAD CRITICAL - ' + t + ' msec');
		exit_code = 2;
    	}
        else if (t > warning) {
        	console.log('LOAD WARNING - ' + t + ' msec');
		exit_code = 1;
    	}
	else  {
        	console.log('LOAD OK - ' + t + ' msec');
		exit_code = 0;
    	}
    }
    phantom.exit(exit_code);
});
