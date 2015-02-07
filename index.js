var Q = require('q');
var _ = require('lodash');
var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

module.exports = function(options) {
    var api = new HueApi(options.hostname, options.username);

    var exec = function(alert, alertConfig, e) {
        var stateOn = lightState.create().on().white(500, 100);
        var stateOff = lightState.create().on().white(500, 100);

        return Q()
        .then(function() {
            return api.setLightState(alertConfig.light, stateOff);
        })
        .delay(2000)
        .then(function() {
            return api.setLightState(alertConfig.light, stateOn);
        })
        .delay(2000)
        .then(function() {
            return api.setLightState(alertConfig.light, stateOff);
        })
    };

    return {
        id: "hue",
        title: "Philips Hue",
        execute: exec,
        options: {
            to: {
                type: "number",
                label: "Light",
                help: "Light ID"
            }
        }
    };
};
