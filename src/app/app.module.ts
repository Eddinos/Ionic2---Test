import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { User } from '../model/user';
import { Level } from '../pages/level/level';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    Level
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    Level
  ],
  providers: []
})
export class AppModule {}
