import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'app-one-pug',
          loadChildren: () =>
            import('app-one-pug/Module').then((m) => m.CoreModule),
        },
        {
          path: 'app-two-pug',
          loadChildren: () =>
            import('app-two-pug/Module').then((m) => m.CoreModule),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
