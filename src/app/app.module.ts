import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { User } from '../model/user';
import { Level } from '../pages/level/level';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Level
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Level
  ],
  providers: []
})
export class AppModule {}
