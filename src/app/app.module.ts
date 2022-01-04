import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
// import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AddNewSiteComponent } from './add-new-site/add-new-site.component';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddNewSiteComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    // DynamicDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  // entryComponents: [AddNewSiteComponent]
})
export class AppModule { }
