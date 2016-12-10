import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component'; 
import {ProfileComponent} from './components/profile/profile.component';
import {RecordingComponent} from './components/recorder/recorder.component';
import {NoteListComponent} from './components/recorder/notelist.component';
import {FriendComponent} from './components/recorder/friend.component';
import {AuthGuard} from './auth.guard';
const appRoutes:Routes=[
    {
        path:'',
        component:HomeComponent
    },
    {
      path:'home',
      component:HomeComponent  
    },
    {
        path:'profile',
        component:ProfileComponent
    },
    {
        path:'notes',
        component:RecordingComponent
    },
    {
        path:'notelist',
        component:NoteListComponent
    },
    {
        path:'friends',
        component:FriendComponent
    }
]
export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);