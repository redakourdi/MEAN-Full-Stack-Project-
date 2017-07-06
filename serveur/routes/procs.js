const express = require('express');
const router = express.Router() ; 
module.exports = router ; 
const Proc = require ('../models/proc'); 
const Even = require ('../models/proc'); 
const config = require('../config/database') ; 


// Lister les processus : 
router.get('/listerAll' , function(req,res){
	Proc.getProcs(function(err,procs){
		if (err){
			throw err ; 
		}
		res.json(procs);
	});

// Get Processus By Id
router.get('/listerOne/:id',function( req , res){

	Proc.getProcById(req.params.id,function(err,proc){
		if(err){
			throw err;
		}
		console.log(proc);
	    console.log(req.params.id);
		res.json(proc);
	}) ; 
});

// Add a Processus 
router.post('/addProc',function( req , res){
	var proc = req.body;
	Proc.addProc(proc,function(err,proc){
		if(err){
			throw err;
		}
		res.json(proc);
	}) ; 
});

// Update a Processus 
router.put('/updateProc',function( req , res){
	var id= req.params._id;
	var proc = req.body;
	Proc.updateProc(id, proc,{},function(err,proc){
		if(err){
			throw err;
		}
		res.json(proc);
	}) ; 
});

// Delete a processus giving the ID
router.delete('/removeProc',function( req , res){
	var id= req.params._id;
	
    Proc.removeProc(id, function(err,proc){
		if(err){
			throw err;
		}
		res.json(proc);
	}) ; 
});
}); 

//Update a processus state
router.put('/updateProcState' , function(req , res){
	
})

// Get Processus By Id
router.get('/temporaire/:id',function( req , res){ 
//ici on va ajouter une endpoitn à chaque appel elle va inserer un evenemnt dans un proc, liste moi tous les proc d'abord
	Proc.getProcById(req.params.id,function(err,proc){
		
		if(err){
			throw err;
		}
		proc.evenements.push({"etat" : "warn", "description" : "Erreur de la commande","date" : new Date()});
		proc.evenements.push({"etat" : "warn", "description" : "Succes du règlement des frais","date" : new Date()});
		proc.evenements.push({"etat" : "success", "description" : "Avertissement sur la livraison","date" : new Date()});
		Proc.addEvent(proc);
		console.log("succes");
		
	}) ; 
});

