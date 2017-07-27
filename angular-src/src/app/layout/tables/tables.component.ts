import { Component, OnInit } from '@angular/core';
import { ProcService } from '../../shared/services/proc.service';
import {Router} from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

    critere = {};
   
    procs : any ; 
    closeResult: string;
    races: any = [];


    constructor(

    	private procService:ProcService ,
    	private router : Router , 
        private modalService: NgbModal

        ) { }
    

    ngOnInit() {

    this.procService.getProcs().subscribe((res) => {
    	if(res){
    		this.procs = res ; 
            for ( let proc of this.procs)
            {
                proc.state = this.getProcState(proc);
            }
    		console.log(this.procs)
    	} else {
    		console.log(res)
    		return false ; 
    	}
    });
}
    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    saveFile(proc:any) {
        var blob = new Blob([proc.databrut], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, proc.name+"."+proc.datatype); 

    }

     txt(proc:any) {
        var blob = new Blob([proc.databrut], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, proc.name+".txt"); 

    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

 

  
     private getProcState(proc) : string{
     let etat = "success" ; 
     for (let e of proc.evenements){
       if(e.etat == "error")
       {
         etat="error";
         break;
       }
       else if(e.etat == "warn")
         {
             etat = "warn";
         }
     }
     return etat;
   }


}

