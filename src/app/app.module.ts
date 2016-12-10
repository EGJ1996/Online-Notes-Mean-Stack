import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import {AUTH_PROVIDERS} from 'angular2-jwt';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {RecordingComponent} from './components/recorder/recorder.component';
import {NoteListComponent} from './components/recorder/notelist.component';
import {FriendComponent} from './components/recorder/friend.component';
import {CourseFilter} from './components/recorder/courseFilter';
import {Auth} from './services/auth.service';
import {RecService} from './services/recorder.service';
import {routing, appRoutingProviders} from './app.routing';
import {RouterModule} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {Ng2PaginationModule} from 'ng2-pagination';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
export const firebaseConfig = {
   apiKey: "AIzaSyCANeKOFGwosl9Kol-Q7Q9jY6JeEZBnx0Q",
    authDomain: "my-project-655d3.firebaseapp.com",
    databaseURL: "https://my-project-655d3.firebaseio.com",
    storageBucket: "my-project-655d3.appspot.com",
    messagingSenderId: "526344397491"
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    RecordingComponent,
    NoteListComponent,
    FriendComponent,
    CourseFilter
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    Ng2PaginationModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
   providers: [
    appRoutingProviders,
    AUTH_PROVIDERS,
    Auth,
    AuthGuard,
    RecService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
