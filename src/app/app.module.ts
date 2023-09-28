import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule, Configuration } from 'api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { VdnChartModule } from 'vdn-chart';
import { FormsModule } from '@angular/forms';
import { VdnFormsModule } from 'vdn-maui';
import { TableModalComponent } from './table-modal/table-modal.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApiModule.forRoot(() => {
      const cfg = new Configuration();
      cfg.basePath = 'https://localhost:7024'
      return cfg;
    }),
    HttpClientModule,
    NgbModule,
    TranslateModule.forRoot(
      {
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      },
    ),
    VdnChartModule.forRoot(),
    FormsModule,
    VdnFormsModule.forRoot({ dateFormat: 'dd.MM.yyyy', dateTimeFormat: 'dd.MM.yyyy HH:mm:ss', preferLocale: false }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
