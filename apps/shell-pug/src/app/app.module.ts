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
          path: 'one',
          loadChildren: () =>
            import('app-one-pug/Module').then((m) => m.CoreModule),
        },
        {
          path: 'two',
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
