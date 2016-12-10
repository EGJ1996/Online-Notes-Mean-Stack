import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RecService{
    constructor(private http:Http){}
    getText(nt:any,filename:string,user:string,ctitle:string,desc:string,id:Number){
        var header=new Headers();
        header.append('Content-Type','audio/mpeg');
        console.log('File is');
        console.log(nt);
        var newNote={"filename":filename,"title":ctitle,"desc":desc};
        var url='http://localhost:3000/api/textnote/'+filename+'/'+user+'/'+ctitle+'/'+desc+'/'+id;
        return this.http.post(url,nt,header).map(res=>res.json());
    }
    getTextNotes(uname:string){
        var url='http://localhost:3000/api/'+uname+'/textnotelist';
        return this.http.get(url).map(res=>res.json());
    }
    getAudioNotes(uname:string){
        var url='http://localhost:3000/api/'+uname+'/audionotelist';
        return this.http.get(url).map(res=>res.json());
    }
    getSumNotes(uname:string){
        var url='http://localhost:3000/api/'+uname+'/sumnotelist';
        return this.http.get(url).map(res=>res.json());
    }
    getSummary(user:string,file:string,cs:string,id:Number,desc:string){
        var newObj={'username':user,'filename':file,'course':cs,'id':id,'desc':desc};
        var header=new Headers();
        header.append('Content-Type','application/json');
        var url='http://localhost:3000/api/summary';
        return this.http.post(url,newObj,header).map(res=>res.json());
    }
    getTNote(uname:string,id:Number){
        var url='http://localhost:3000/api/'+uname+'/tnote/'+id;
        return this.http.get(url).map(res=>res.json());
    }
    getANote(uname:string,id:Number){
        var url='http://localhost:3000/api/'+uname+'/anote/'+id;
        return this.http.get(url).map(res=>res.json());
    }
    getSNote(uname:string,id:Number){
        var url='http://localhost:3000/api/'+uname+'/snote/'+id;
        return this.http.get(url).map(res=>res.json());
    }
    deleteTNote(uname:string,course:string,id:Number){
        var url='http://localhost:3000/api/'+uname+'/t/'+course+'/'+id;
        return this.http.delete(url).map(res=>res.json());
    }
    deleteANote(uname:string,course:string,id:Number){
        var url='http://localhost:3000/api/'+uname+'/a/'+course+'/'+id;
        return this.http.delete(url).map(res=>res.json());
    }
    deleteSNote(uname:string,course:string,id:Number){
        var url='http://localhost:3000/api/'+uname+'/s/'+course+'/'+id;
        return this.http.delete(url).map(res=>res.json());
    }
    getFriends(uname:string){
        console.log('Getting all the friends for '+uname);
        return this.http.get('http://localhost:3000/api/'+uname+'/friends')
        .map(res=>res.json());
    }
    removeFriend(uname:string,fname:string){
        var url='http://localhost:3000/api/'+uname+'/rmfriend/'+fname;
        return this.http.delete(url).map(res=>res.json());
    }
    addRequest(uname:string,fname:string){
        var url='http://localhost:3000/api/'+uname+'/sendreq/'+fname;
        return this.http.get(url).map(res=>res.json());
    }
    addFriend(uname:string,fname:string){
        var url='http://localhost:3000/api/'+uname+'/addfr/'+fname;
        return this.http.get(url).map(res=>res.json());
    }
    removeRequest(uname:string,fname:string){
        var url='http://localhost:3000/api/'+uname+'/rmreq/'+fname;
        return this.http.delete(url).map(res=>res.json());
    }
    getSentRequests(uname:string){
        var url='http://localhost:3000/api/'+uname+'/sentrequests';
        return this.http.get(url).map(res=>res.json());
    }
    getRecvRequests(uname:string){
        var url='http://localhost:3000/api/'+uname+'/recvrequests';
        return this.http.get(url).map(res=>res.json());
    }
    addUser(uname:string){
        var url='http://localhost:3000/api/adduser/'+uname;
        return this.http.get(url).map(res=>res.json());
    }
     getUsers(){
        var url='http://localhost:3000/api/users';
        return this.http.get(url).map(res=>res.json());
    }
    getCourses(uname:string){
        var url='http://localhost:3000/api/'+uname+'/courses';
        return this.http.get(url).map(res=>res.json());
    }
}
