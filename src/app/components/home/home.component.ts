import { Component } from '@angular/core';
import {Auth} from '../../services/auth.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent { 
    constructor(private auth:Auth){
        var profile = JSON.parse(localStorage.getItem('profile'));
        if(profile){
           console.log('User is');
           console.log(profile['nickname']);
        }
    }
}
