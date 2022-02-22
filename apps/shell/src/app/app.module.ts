import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CounterModule } from '@mfe-prototype/counter';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverShell' }),
    RouterModule.forRoot([
    {
        path: 'one',
        loadChildren: () => loadRemoteModule({
          remoteEntry: 'http://localhost:4201/one/remoteEntry.js',
          type: 'module',
          exposedModule: './Module'
        }).then(m => m.CoreModule)
    },
    {
        path: 'two',
        loadChildren: () => loadRemoteModule({
          remoteEntry: 'http://localhost:4202/two/remoteEntry.js',
          type: 'module',
          exposedModule: './Module'
        }).then(m => m.CoreModule)
    },
], { initialNavigation: 'enabledBlocking' }),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
    CounterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
