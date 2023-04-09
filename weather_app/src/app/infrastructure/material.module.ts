import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from '../app-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCardModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatRadioModule,
    ReactiveFormsModule,   
    FormsModule, 
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatMenuModule,
  ],
  exports:[
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCardModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatMenuModule
  ]

})
export class MaterialModule { }
