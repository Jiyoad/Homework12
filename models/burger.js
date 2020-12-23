var orm = require("../config/orm.js");

var burger = {
    all: function (callback) {
        orm.all("burgers", function (result) {
            callback(result);
        });
    },
    create: function (cols, vals, callback){
        console.log(vals);
        console.log("-------------------------vals---------------------------------");
        orm.create("burgers", cols, vals, function(result){
            callback(result);
            console.log(result);
            console.log("------------CREATE MODEL------------");
        });
    },
    update: function (objColVals, condition, callback){
        orm.update("burgers", objColVals, condition, function(result){
            callback(result);
        });
    },
    delete: function (condition, callback){
        orm.delete("burgers", condition, function(result){
            callback(result);
        });
    }
};
module.exports = burger;