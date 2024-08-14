import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../core/shared/navbar/navbar.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-quiz-layout',
  standalone: true,
  imports: [RouterModule, NavbarComponent, NgStyle],
  templateUrl: './quiz-layout.component.html',
  styleUrl: './quiz-layout.component.css'
})
export class QuizLayoutComponent implements AfterViewInit, AfterContentChecked {
  @ViewChild('wrapper') wrapper: ElementRef<any>
  @ViewChild('container') container: ElementRef<any>
  @ViewChild('navbar') navbar: NavbarComponent;

  height: number = 0;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.getContainerHeight();
    this.changeDetector.detectChanges();
  }

  ngAfterContentChecked(): void {
    // this.changeDetector.detectChanges();
  }

  getContainerHeight() {
    let navbarHeight = this.navbar.navcontainer.nativeElement.offsetHeight;
    let wrapperHeight = this.wrapper.nativeElement.offsetHeight;

    this.height = wrapperHeight - navbarHeight;
  }
}
