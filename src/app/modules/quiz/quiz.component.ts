import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuizService } from '../../core/services/quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterModule, NgFor, FormsModule, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  
}
