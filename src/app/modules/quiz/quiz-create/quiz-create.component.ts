import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuizService } from '../../../core/services/quiz.service';
import { RouterOutlet } from '@angular/router';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { QuizCreateState } from '../../../core/enums/quiz-create-state';
import { debounceTime } from 'rxjs';
import { RadioButtonComponent } from "../../../core/shared/radio-button/radio-button.component";

@Component({
  selector: 'app-quiz-create',
  standalone: true,
  imports: [RouterOutlet, NgFor, FormsModule, ReactiveFormsModule, NgIf, NgClass, NgStyle, RadioButtonComponent],
  templateUrl: './quiz-create.component.html',
  styleUrl: './quiz-create.component.css'
})
export class QuizCreateComponent implements OnInit, AfterViewInit {
  quizForm: FormGroup;
  quizCreateState = QuizCreateState;
  isCaptionForm: boolean = true;

  scrollBarTop: number = 0;

  questionNum: number = 0;
  isQuestionSelected: boolean = false;
  scrollMode: boolean = true;

  submitError: boolean = false;

  @ViewChild('container') container: ElementRef<any>;
  @ViewChild('scroll') scroll: ElementRef<any>;
  @ViewChildren('questions') questions: QueryList<ElementRef<any>>;

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

    // this.addQuestion();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollBarTop = this.container.nativeElement.offsetTop;
    }, 100);

    this.scroll.nativeElement.style.width = '1%';

    this.quizForm.valueChanges.pipe(debounceTime(700)).subscribe(value => {
      const quizForm = JSON.stringify(this.quizForm.getRawValue());
      this.localStorage.setItem(this.quizCreateState.QuizForm, quizForm);
    });
    
    const jsonForm = this.localStorage.getItem(this.quizCreateState.QuizForm);
    if (jsonForm != undefined && jsonForm != null) {
      const quizForm = JSON.parse(jsonForm);
      
      this.quizForm.get('title')?.setValue(quizForm.title);
      this.quizForm.get('description')?.setValue(quizForm.description);
    }

    for (let i = 0; i < 10; i++) {
      let questionForm = this.fb.group({
        question: [`Ini adalah pertanyaan nomor ${i + 1}`, Validators.required],
        answers: this.fb.array([
          new FormControl(`Jawaban pertama untuk pertanyaan ke-${i + 1}`, [Validators.required]),
          new FormControl(`Jawaban kedua untuk pertanyaan ke-${i + 1}`, [Validators.required]),
          new FormControl(`Jawaban ketiga untuk pertanyaan ke-${i + 1}`, [Validators.required]),
        ]),
        answerKey: ['', Validators.required],
        image: ['']
      });

      this.quizes.push(questionForm);

      this.isScrollBarExist();
    }

    // setTimeout(() => {
    //   this.questions.toArray().forEach(q => {
    //     console.log(q.nativeElement.offsetTop)
    //   });

    //   const padTop = window.getComputedStyle(this.container.nativeElement, null).getPropertyValue('padding-top');
    //   const regexp = /[0-9]/g;
    //   const padTopNum = padTop.match(regexp)?.join('');
    //   console.log(parseInt(padTopNum!));
    // }, 100);
    
    this.cdr.detectChanges();
  }

  isScrollBarExist() {
    setTimeout(() => {
      let scrollHeight = this.container.nativeElement.scrollHeight;
      let clientHeight = this.container.nativeElement.clientHeight;

      if (scrollHeight > clientHeight) {
        this.scroll.nativeElement.style.display = 'block'
      } else {
        this.scroll.nativeElement.style.display = 'none'
      }
    }, 100);
  }

  onScroll() {
    if (this.scrollMode) {
      let scrollTop = this.container.nativeElement.scrollTop;
      let scrollHeight = this.container.nativeElement.scrollHeight;
      let clientHeight = this.container.nativeElement.clientHeight;
      let height = scrollHeight - clientHeight;
      let scrollValue = Math.round((scrollTop * 100) / height);

      if (scrollValue < 1) {
        scrollValue = 1;
      }

      this.scroll.nativeElement.style.width = scrollValue + '%';

      this.questions.toArray().forEach((q, i) => {
        let elTop = q.nativeElement.offsetTop - 68;
        let elBottom = elTop + q.nativeElement.clientHeight;

        if ((elTop < scrollTop && scrollTop < elBottom) && !this.isQuestionSelected) {
          this.questionNum = i;
        }
      });
    }
  }

  scrollTo(id: number) {
    this.questionNum = id;
    this.isQuestionSelected = true;

    if (this.scrollMode) {
      let scrollValue = 0;
      this.questions.toArray().slice(0, id).forEach((q, i, arr) => {
        scrollValue += q.nativeElement.clientHeight;

        if (i == arr.length - 1) {
          const padTop = window.getComputedStyle(q.nativeElement, null).getPropertyValue('padding-top');
          const regexp = /[0-9]/g
          const padTopNum = padTop.match(regexp)?.join('');  
          
          if (padTopNum) {
            scrollValue += parseInt(padTopNum);
          }
        }
      });

      this.container.nativeElement.scrollTop = scrollValue; 
    }
  }

  changeMode() {
    this.scrollMode = !this.scrollMode;

    if (this.scrollMode) {
      this.scroll.nativeElement.style.display = 'block'

      setTimeout(() => {
        this.scrollTo(this.questionNum);
      }, 100);
    } else {
      this.scroll.nativeElement.style.width = '1%'
      this.scroll.nativeElement.style.display = 'none'
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
      answers: this.fb.array([new FormControl('', [Validators.required])]),
      answerKey: ['', Validators.required],
      image: ['']
    });

    this.quizes.push(question);

    this.isScrollBarExist();

    setTimeout(() => {
      this.scrollTo(this.quizes.controls.length - 1)
    }, 100);
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
    this.getAnswers(id).push(new FormControl('', [Validators.required]));

    this.isScrollBarExist();
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

  checkAnswer(qId: number, aId: number): boolean {
    const answerId = this.quizes.at(qId).get('answerKey')?.value;

    return answerId == aId.toString();
  }

  assignAnswer(id: number, result: any) {
    this.quizes.at(id).get('answerKey')?.setValue(result);
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
