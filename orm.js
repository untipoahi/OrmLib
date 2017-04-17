var extend = require('extend'),
cleanObj = require('clean-obj'),
modelling = require('modelling');

var defaults = {
    models: {}
};

var OrmConnect = function(){
    this.isInitialized = false;
}

OrmConnect.prototype.addConfig = function(options){
    if(this.isInitialized)
        return new Error('This instance of orm is already initialized');
    this.settings = extend(true, defaults, defaults, options);
    //allow removing attributes, by marking thme as null
    cleanObj(this.settings.models, true);

    for(var i in this.settings.policies) {
        this.settings.policies[i] = this.settings.policies[i].bind(this);
    }

    if(this.settings.alien) {
        for(var i in alien) {
            if(this.settings.models[i]) delete this.settings.models[i];
        }
    }
};

OrmConnect.prototype.init = function(){
    if(this.isInitialized)
        return new Error('This instance of orm is already initialized');
    if(this.settings.orm) {
        this.orm = this.settings.orm;
        for(var i in this.settings.policies) {
            this.orm.setPolicy(true, i, this.settings.policies[i]);
        }
    } else {
        this.orm = new modelling({
            models: this.settings.models,
            adapters: this.settings.adapters,
            connections: this.settings.connections,
            app: this.settings.app
        });
    }
}

OrmConnect.prototype.getModels = function(name) {
    return this.orm._orm.collections;
};

module.exports = OrmConnect;
