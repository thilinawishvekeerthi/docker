import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// angular matarials
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule} from '@angular/material/icon';
import { MatBadgeModule} from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule} from '@angular/cdk/stepper';
import { MatRippleModule } from '@angular/material/core';
//components
import { HomeComponent } from './home/home.component';
import { NavigationCenterComponent } from './navigation-center/navigation-center.component';
import { GridSettingComponent } from './grid-setting/grid-setting.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingService } from './shared/service/loading.service';
import { GridDataService } from './shared/service/grid.data.service';
import { MergeDialogComponent } from './grid-setting/merge-dialog/merge-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationCenterComponent,
    GridSettingComponent,
    MergeDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // angular matarials
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatGridListModule,
    MatSidenavModule,
    MatIconModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatListModule,
    MatStepperModule,
    CdkStepperModule,
    MatRippleModule
  ],
  providers: [
    LoadingService,
    GridDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
