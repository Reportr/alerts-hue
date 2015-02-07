var hue = require("node-hue-api");
var _ = require("lodash");
var Q = require("q");

var displayBridges = function(bridges) {

};

hue.nupnpSearch().then(displayBridges).done();


var HueApi = require("node-hue-api").HueApi;

var hostname = null;
var newUserName = null;
var userDescription = "reportr hue alerts";

hue.nupnpSearch()
	.then(function(bridges) {
		var bridge = _.first(bridges);
		if (!bridge) throw "No bridge found";

		hostname = bridge.ipaddress;
	    console.log("Hue Bridges Found: " + hostname);

	    console.log("Press the button in your bridge in the next 10seconds");
	    return Q.delay(10000);
	})
	.then(function() {
		console.log("Registrating user...");
	    var api = new HueApi();
	    return api.registerUser(hostname, newUserName, userDescription);
	})
	.then(function(result) {
	    console.log("Created user: " + JSON.stringify(result));
	})
    .fail(function(err) {
	    console.log(err);
	})
    .done();
