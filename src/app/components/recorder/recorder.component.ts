import { Component,ElementRef} from '@angular/core';
import {Auth} from '../../services/auth.service';
import {RecService} from '../../services/recorder.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as fire from 'firebase';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
    selector: 'record',
    templateUrl: './rec.view.html'
})

export class RecordingComponent { 
    downloadLink:any;
    desc:string;
    file:any;
    title:string;
    constructor(private element: ElementRef,private af:AngularFire,private active:ActivatedRoute,private rserv:RecService) {
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        this.addUs(usern);
    }
    uploadFile(){
         var storageRef=fire.storage().ref('/images/'+this.file.name);
        var task=storageRef.put(this.file);
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        storageRef.getDownloadURL().then(url=>{
        });
    }
    changeListner(event) {
        var reader = new FileReader();
        //var image = this.element.nativeElement.querySelector('.image');
        this.file=event.target.files[0];
       /*reader.onload = function(e:any) {
            var src = e.target.result;
            image.src = src;
        };*/

        reader.readAsDataURL(event.target.files[0]);
    }
    getTxt(){
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        console.log('Username is '+usern);
        var filename=this.file.name;
        var pindex=filename.indexOf('.');
        var fn=filename.substring(0,pindex);
        var storageRef=fire.storage().ref('/notes/'+filename);
        var n=storageRef.put(this.file);
        console.log('Filename is ' +fn);
        this.rserv.getTextNotes(usern).subscribe(data=>{
            var ide=data.length+1;
            this.rserv.getText(this.file,fn,usern,this.title,this.desc,ide).subscribe(data=>{
            console.log('Text Received succesfully');
            console.log(data);
        });
        })
    }
    addUs(usern:string){
        console.log('Adding user');
        return this.rserv.addUser(usern).subscribe(data=>{
            console.log('User added succesfully');
        },err=>{
            console.log('There was an error adding the user');
        });
    }

}
