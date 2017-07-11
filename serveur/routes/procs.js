const express = require('express');
const router = express.Router() ; 
module.exports = router ; 
const Proc = require ('../models/proc'); 
const Even = require ('../models/proc'); 
const config = require('../config/database') ; 
var parseString = require('xml2js').parseString;


// Lister les processus : 
router.get('/listerAll' , function(req,res){
	Proc.getProcs(function(err,procs){
		if (err){
			throw err ; 
		}
		res.json(procs);
	});
});

  //GetStats
            //GetStats
                      //GetStats 
                               //GetStats
                                        //GetStats
                                                 //GetStats
   router.get('/getStats' , function(req,res){            //
	Proc.getProcs(function(err,procs){                     //
		if (err) {                                           //
			throw err ;                                       //
		}                                                      //
		  obj = procs ;                                         //                                 
		 var arr = [] ;                                          //
          for(var i=0 ; i<obj.length ; i++) // boucle qui parcoure les procs , parse la donnée brut et l'insère dans un nouveau tableau 
		 {                                                                                          //
            if (obj[i].datatype == "xml"){                                                         //                        // Vérifie le format Xml
               parseString(obj[i].databrut , function (err, result) {                             //
              arr.push(result.nationality);                                                      //
          });                                                                                   //
                                                                                               //
                                                                                              //
            } else if (obj[i].datatype == "json"){                                           //                              // Vérifie le format Json
                                                                                            //
             tab = JSON.parse(obj[i].databrut) ;                                           //
		 	arr.push(tab.nationality) ;                                                   //
         }   else {                                                                      //
         	console.log("Pas de recherche sur ce format de donnée") ;                   //                                 // Retourne une alert si pas xml ou Json
         }                                                                             //
                                                                                      //
          }                                                                          //
          console.log(arr);                                                         //                 
         function foo(arr) {                                                       //
    var a = [], b = [], prev;                                                     //
    arr.sort();                                                                  //
    for ( var i = 0; i < arr.length; i++ ) {                                    //
        if ( arr[i] !== prev ) {                                               //
            a.push(arr[i]);                                                   //
            b.push(1);                                                       //
        } else {                                                            //
            b[b.length-1]++;                                               //
        }                                                                 //
        prev = arr[i];                                                   //
    }                                                                   //
                                                                       //
    return [a, b];                                                    //
}                                                                    //
                                                                    //
    var result = foo(arr);                                         //
    var pourcentages = [];                                        //
    for (var i = 0; i < result[0].length ; i++){                 //      
	var perc = { nationalite : ""};                             //                        
    perc.nationalite = result[0][i];                           //
    perc.pourcentage = (result[1][i]/arr.length)*100;         //
	pourcentages.push(perc);                                 //
}                                                           //
   //console.log(pourcentages);                            //
    res.json(pourcentages)                               //  
                                               //GetStats 
	}) ;                              //GetStats
 });                         //GetStats
                    //GetStats
          //GetStats
//GetStats


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
router.delete('/removeProc/:id',function( req , res){
	

	
    Proc.removeProc(req.params.id, function(err,proc){
		if(err){
			throw err;
		}
		console.log("reda") ; 
		res.json(proc);


	}) ; 
});


// Get Processus By Id
router.get('/temporaire/:id',function( req , res){ 
//ici on va ajouter une endpoitn à chaque appel elle va inserer un evenemnt dans un proc, liste moi tous les proc d'abord
	Proc.getProcById(req.params.id,function(err,proc){
		
		if(err){
			throw err;
		}
		proc.evenements.push({"etat" : "success", "description" : "Produit disponible","date" : new Date()});
		proc.evenements.push({"etat" : "success", "description" : "Fond disponible","date" : new Date()});
		proc.evenements.push({"etat" : "success", "description" : "Achat reussi","date" : new Date()});
		Proc.addEvent(proc);
		console.log("succes");
		
	}) ; 
});



