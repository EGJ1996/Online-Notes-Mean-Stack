import { Component,ElementRef,OnInit,Input} from '@angular/core';
import {Auth} from '../../services/auth.service';
import {RecService} from '../../services/recorder.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as fire from 'firebase';
import {Router,ActivatedRoute} from '@angular/router';
import {Http,Headers,RequestOptions} from '@angular/http';
@Component({
    selector: 'users',
    templateUrl: './friends.html'
})

export class FriendComponent implements OnInit{
    @Input() users:any[]=[];
    @Input() sentrequests:any[]=[];
    @Input() recvrequests:any[]=[];
    @Input() friends:any[]=[]; 
    constructor(private element: ElementRef,private rserv:RecService ) {
    }
    isPresent(user:any,items:any){
        for(var i=0;i<items.length;i++){
            if(items[i]==user){
                return true;
            }
        }
        return false;
    }
    addUsers(){
        console.log('Receiving users');
          var profile = JSON.parse(localStorage.getItem('profile'));
          var usern=profile['nickname'];
          this.rserv.getUsers().subscribe(data=>{
              console.log('Users are ');
              console.log(data);
              data.forEach(item=>{
                  if(this.isPresent(item,this.users)==false && this.isPresent(item,this.friends)==false && 
                  this.isPresent(item,this.recvrequests)==false && this.isPresent(item,this.sentrequests)==false
                  && item!=usern){
                      this.users.push(item);
                  }
              });
            
          });
    }
    getRRequests(){
        console.log('Receiving received requests');
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        this.rserv.getRecvRequests(usern).subscribe(data=>{
            data.forEach(item=>{
                if(this.isPresent(item,this.recvrequests)==false){
                    this.recvrequests.push(item);
                }
            });
            this.getSRequests();
        });
    }
    getSRequests(){
        console.log('Receiving sent requests');
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        this.rserv.getSentRequests(usern).subscribe(data=>{
            data.forEach(item=>{
                if(this.isPresent(item,this.sentrequests)==false){
                    this.sentrequests.push(item);
                }
            });
            this.getFriends();
        });
    }
    sendRequest(ev:any){
        //console.log(ev.target.id);
         var profile = JSON.parse(localStorage.getItem('profile'));
         var usern=profile['nickname'];
         var tar=ev.target.id;
         return this.rserv.addRequest(usern,tar).subscribe(data=>{
             console.log('Request sent succesfully');
             for(var i=0;i<this.users.length;i++){
                 if(this.users[i]==tar){
                     this.users.splice(i,1);
                 }
             }
         });

    }
    deleteReq(fname:string){
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        this.rserv.removeRequest(usern,fname).subscribe(data=>{
            for(var i=0;i<this.recvrequests.length;i++){
                if(this.recvrequests[i]==fname){
                    this.recvrequests.splice(i,1);
                }
            }
            console.log('Request deleted succesfully');
        });
    }
    acceptFriend(ev:any){
        var tar=ev.target.id;
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        this.rserv.addFriend(usern,tar).subscribe(data=>{
            this.deleteReq(tar);
            this.friends.push(tar);
            console.log('Friend added succesfully');
        });
    }
    getFriends(){
        console.log('Receiving friends');
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        this.rserv.getFriends(usern).subscribe(data=>{
            console.log('Friend data received');
            console.log(data);
            data.forEach(item=>{
                if(this.isPresent(item,this.friends)==false){
                    this.friends.push(item);
                }
            });
            this.addUsers();
        })
    }
    removeFriend(ev:any){
        var profile = JSON.parse(localStorage.getItem('profile'));
        var tar=ev.target.id;
        var usern=profile['nickname'];
        this.rserv.removeFriend(usern,tar).subscribe(data=>{
            if(this.friends.length)
            for (var i=0;i<this.friends.length;i++){
                if(this.friends[i]==tar){
                    this.friends.splice(i,1);
                }
            }
            this.users.push(tar);
            console.log('Friend removed succesfully');
        });
    }
    ngOnInit(){
        this.getRRequests();
    }
}
