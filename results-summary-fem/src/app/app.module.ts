import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResultsSummaryComponent } from './results-summary/results-summary.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MemoryIconSvgComponent } from './memory-icon-svg/memory-icon-svg.component';
import { ReactionIconSvgComponent } from './reaction-icon-svg/reaction-icon-svg.component';
import { VerbalIconSvgComponent } from './verbal-icon-svg/verbal-icon-svg.component';
import { VisualIconSvgComponent } from './visual-icon-svg/visual-icon-svg.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsSummaryComponent,
    MemoryIconSvgComponent,
    ReactionIconSvgComponent,
    VerbalIconSvgComponent,
    VisualIconSvgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
