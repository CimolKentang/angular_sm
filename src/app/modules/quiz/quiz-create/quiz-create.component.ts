import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuizService } from '../../../core/services/quiz.service';
import { RouterOutlet } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { QuizCreateState } from '../../../core/enums/quiz-create-state';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-quiz-create',
  standalone: true,
  imports: [RouterOutlet, NgFor, FormsModule, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './quiz-create.component.html',
  styleUrl: './quiz-create.component.css'
})
export class QuizCreateComponent implements OnInit, AfterViewInit {
  quizForm: FormGroup;
  quizCreateState = QuizCreateState;
  isCaptionForm: boolean = true;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private localStorage: LocalStorageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const jsonState = this.localStorage.getItem(this.quizCreateState.IsCaptionValid);
    if (jsonState != undefined && jsonState != null) {
      this.isCaptionForm = JSON.parse(jsonState);
    }
    
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      images: [''],
      questionNumber: [0],
      quizes: this.fb.array([])
    });

    this.addQuestion();
  }

  ngAfterViewInit(): void {        
    this.quizForm.valueChanges.pipe(debounceTime(700)).subscribe(value => {
      const quizForm = JSON.stringify(this.quizForm.getRawValue());
      this.localStorage.setItem(this.quizCreateState.QuizForm, quizForm);
    });
    
    const jsonForm = this.localStorage.getItem(this.quizCreateState.QuizForm);
    if (jsonForm != undefined && jsonForm != null) {
      const quizForm = JSON.parse(jsonForm);
      
      console.log(quizForm);
      this.quizForm.get('title')?.setValue(quizForm.title);
      this.quizForm.get('description')?.setValue(quizForm.description);
    }
  }

  get isCaptionValid() {
    return this.quizForm.get('title')?.valid && this.quizForm.get('description')?.valid;
  }

  goToQuestionForms() {
    if (this.isCaptionValid) {
      this.isCaptionForm = !this.isCaptionForm;
  
      const jsonState = JSON.stringify(this.isCaptionForm);
      this.localStorage.setItem(this.quizCreateState.IsCaptionValid, jsonState); 
    }
  }

  get quizes(): FormArray {
    return this.quizForm.get('quizes') as FormArray
  }

  getQuizNo(id: number): FormGroup {
    return this.quizes.at(id) as FormGroup;
  }

  addQuestion() {
    const question = this.fb.group({
      question: ['', Validators.required],
      answers: this.fb.array([this.fb.control('')]),
      answerKey: ['', Validators.required],
      image: ['']
    });

    this.quizes.push(question);
  }

  deleteQuestion(id: number) {
    if (this.quizes.controls.length > 1) {
      this.quizes.removeAt(id);
    }
  }

  getAnswers(id: number): FormArray {
    return this.quizes.at(id).get('answers') as FormArray;
  }

  addAnswer(id: number) {
    this.getAnswers(id).push(this.fb.control(''));
  }

  deleteAnswer(qId: number, aId: number) {
    if (this.getAnswers(qId).controls.length > 1) {
      if (this.quizes.at(qId).get('answerKey')?.value == aId.toString()) {
        this.cancelAnswer(qId);
      }

      this.getAnswers(qId).removeAt(aId);
    }
  }

  getAnswer(id: number): string {
    const answerId = this.quizes.at(id).get('answerKey')?.value;
    let answerKey = '';

    if (answerId) {
      answerKey = this.getAnswers(id).at(parseInt(answerId)).value;
    }

    return answerKey;
  }

  assignAnswer(id: number, result: any) {
    this.quizes.at(id).get('answerKey')?.setValue(result.toString());
  }

  cancelAnswer(id: number) {
    this.quizes.at(id).get('answerKey')?.setValue('');
  }

  questionHasAnswer(id: number): boolean {
    return this.quizes.at(id).get('answerKey')?.value != '';
  }

  submit() {
    console.log(this.quizForm.getRawValue());
  }
}
