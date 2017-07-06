var mongoose = require('mongoose') ; 
const config = require('../config/database');


//Evenement Schema
var eventSchema = mongoose.Schema({
    
    etat:{
		type: String , 
		required : true },

	description:{
		type: String , 
		required : true 
		 }, 
    
    date:{
    	type: Date , 
    	required : true
    	 } }) ; 

//Processus Schema
var procSchema = mongoose.Schema({
	name:{
		type: String , 
		required : true },

	entertime:{
		type: Date , 
		default : Date.now
		 }, 
    
    state:{
    	type: String , 
    	required : true
    	 } , 

    duration :{
    	type : Number , 
    	required : true
    } , 

    appsource : {
    	type : String , 
    	required : true 
    } , 

    appdestination : {
    	type : String , 
    	required : true
    } , 

    datatype : {
    	type : String  
    	} , 

    databrut : {
    	type : String 
    } , 

    evenements: {
        type : Array
    } }) ; 



var Proc = module.exports = mongoose.model('Proc', procSchema ) ; 
var Even = module.exports = mongoose.model('Even', eventSchema ) ; 

// Get Processus 
module.exports.getProcs = function(callback){
	Proc.find(callback) ; 
}

// Get Processus By Id
module.exports.getProcById = function(id,callback){
	Proc.findById(id, callback);
}

// Add a Processus
module.exports.addProc = function(proc,callback){
	Proc.create(proc, callback);
}

//Get a processus State 
module.exports.updateProcState = function(id ,proc, options , callback){
    var query = {_state: state} ; 
    var update = {
        state : proc.state
    }
    Proc.findOneAndUpdate(query,update,options,callback);
}

// Update a Processus
module.exports.updateProc = function(id , proc, options ,callback){
	var query = {_id: id};
	var update = {
		name: proc.name,  
		entertime: proc.entertime, 
		state: proc.state,
        duration : proc.duration,
        appsource : proc.appsource,
        appdestination : proc.appdestination,
        datatype : proc. datatype,
        databrut : proc. databrut , 
        evenements : proc.evenements
}

	Proc.findOneAndUpdate(query,update,options,callback);
}

module.exports.addEvent = function(proc){
        var query = {_id: proc._id};
        var update = {
            evenements : proc.evenements,
        };
        Proc.findOneAndUpdate(query,update,{},function(err,done){

    });

}

// Delete a 
module.exports.removeProc = function(id,callback){
	var query = {_id: id};
	Proc.remove(query, callback);
}

