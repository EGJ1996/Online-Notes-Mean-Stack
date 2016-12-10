import {Component,OnInit,AfterViewInit} from '@angular/core';
import {RecService} from '../../services/recorder.service';
import {CourseFilter} from './courseFilter';

@Component({
    selector:'list-note',
    templateUrl:'./notelist.view.html'
})

export class NoteListComponent implements OnInit,AfterViewInit{
    textnotelist:any[]=[];
    audionotelist:any[]=[];
    summarynotelist:any[]=[];
    friendtnotes:any[]=[];
    friendanotes:any[]=[];
    friendsnotes:any[]=[];
    courses:any[]=[];
    filt:string="All";
    constructor(private rserv:RecService){}
    getCourses(){
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        this.rserv.getCourses(usern).subscribe(data=>{
            for(var i=0;i<data.length;i++){
                this.courses.push(data[i]);
            }
            console.log('Courses retrieved succesfully');
            console.log(this.courses);
        });
    }
    getNotes(){
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        return this.rserv.getTextNotes(usern).subscribe(data=>{
            console.log('Notes received succesfully');
            this.textnotelist=data;
            console.log('Note list is ');
            console.log(this.textnotelist);
        },err=>{console.log('There was an error receiving the list');console.log(err)});
    }
    getNotes1(){
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        return this.rserv.getAudioNotes(usern).subscribe(data=>{
            console.log('Notes received succesfully');
            this.audionotelist=data;
            console.log('Note list is ');
            console.log(this.audionotelist);
        },err=>{console.log('There was an error receiving the list');console.log(err)});
    }
    getNotes2(){
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        return this.rserv.getSumNotes(usern).subscribe(data=>{
            console.log('Notes received succesfully');
            if(data[0]!=null){
                 this.summarynotelist=data;
            }
            console.log('Note list is ');
            console.log(this.summarynotelist);
        },err=>{console.log('There was an error receiving the list');console.log(err)});
    }
    getFriendTNotes(){
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        this.rserv.getFriends(usern).subscribe(data=>{
            for(var i=0;i<data.length;i++){
                this.rserv.getTextNotes(data[i]).subscribe(data1=>{
                    
                    for(var j=0;j<data1.length;j++){
                        this.friendtnotes.push(data1[j]);
                    }
                    console.log('Friend tnotes');
                    console.log(this.friendtnotes);
                });
            }
        });
    }
      getFriendANotes(){
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        this.rserv.getFriends(usern).subscribe(data=>{
            for(var i=0;i<data.length;i++){
                this.rserv.getAudioNotes(data[i]).subscribe(data1=>{
                    for(var j=0;j<data1.length;j++){
                        this.friendanotes.push(data1[j]);
                    }
                });
            }
            console.log('Received friend text notes succesfully');
            console.log(this.friendanotes);
        });
    }
      getFriendSNotes(){
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        this.rserv.getFriends(usern).subscribe(data=>{
            for(var i=0;i<data.length;i++){
                this.rserv.getSumNotes(data[i]).subscribe(data1=>{
                    for(var j=0;j<data1.length;j++){
                        this.friendsnotes.push(data1[j]);
                    }
                });
            }
            console.log('Received friend text notes succesfully');
            console.log(this.friendsnotes);
        });
    }
    getSum(ev:any){
       var id=ev.target.id;
       var profile = JSON.parse(localStorage.getItem('profile'));
       var usern=profile['nickname'];
       this.rserv.getTNote(usern,id).subscribe(data=>{
           console.log('Note received succesfully');
           console.log(data);
           var lnk=data['link'];
           var ind=lnk.indexOf('text')+5;
           var fn=lnk.substring(ind,lnk.length);
           this.rserv.getSummary(usern,fn,data['course'],id,data['desc']).subscribe(data=>{
               console.log('Summary added succesfully');
               this.summarynotelist.push(data);
           });
       });
    }
    deleteNote(ev:any){
        var f=ev.target.id.substring(0,1);
        var id=ev.target.id.substring(1,ev.target.id.length);
        console.log('Method is');
        console.log(f);
        console.log('ID is');
        console.log(id);
        if(f=='s'){
            return this.deleteSumNote(id);
        }
        else if(f=='t'){
            return this.deleteTxtNote(id);
        }
        else{
            return this.deleteAudNote(id);
        }
    }
    deleteSumNote(id:Number){
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        this.rserv.getSNote(usern,id).subscribe(data=>{
            console.log('Summary notes received succesfully');
            var cs=data['course'];
            this.rserv.deleteSNote(usern,cs,id).subscribe(data=>{
                for(var i=0;i<this.summarynotelist.length;i++){
                    if(this.summarynotelist[i].id==id){
                        this.summarynotelist.splice(i,1);
                    }
                }
                console.log('Summary Note deleted succesfully');
            });
        });
    }
    deleteTxtNote(id:Number){
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        this.rserv.getTNote(usern,id).subscribe(data=>{
            console.log('Summary notes received succesfully');
            var cs=data['course'];
            this.rserv.deleteTNote(usern,cs,id).subscribe(data=>{
                for(var i=0;i<this.textnotelist.length;i++){
                    if(this.textnotelist[i].id==id){
                        this.textnotelist.splice(i,1);
                    }
                }
                console.log('Text Note deleted succesfully');
            });
        });
    }
    changeCourse(ev:any){
        var cs=ev.target.value;
       this.filt=cs;
    }
    deleteAudNote(id:Number){
        var profile = JSON.parse(localStorage.getItem('profile'));
        var usern=profile['nickname'];
        this.rserv.getANote(usern,id).subscribe(data=>{
            console.log('Summary notes received succesfully');
            var cs=data['course'];
            this.rserv.deleteANote(usern,cs,id).subscribe(data=>{
                for(var i=0;i<this.audionotelist.length;i++){
                    if(this.audionotelist[i].id==id){
                        this.audionotelist.splice(i,1);
                    }
                }
                console.log('Text Note deleted succesfully');
            });
        });
    }
    ngOnInit(){
        this.getNotes();
        this.getNotes1();
        this.getNotes2();
        this.getFriendTNotes();
        this.getFriendSNotes();
        this.getFriendANotes();
        this.getCourses();
    }
    ngAfterViewInit(){
        $(document).ready(function () {

	$('.star').on('click', function () {
      $(this).toggleClass('star-checked');
    });

    $('.ckbox label').on('click', function () {
      $(this).parents('tr').toggleClass('selected');
    });

    $('.btn-filter').on('click', function () {
      var $target = $(this).data('target');
      if ($target != 'all') {
        $('.table tr').css('display', 'none');
        $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
      } else {
        $('.table tr').css('display', 'none').fadeIn('slow');
      }
    });

 });
    }
}
