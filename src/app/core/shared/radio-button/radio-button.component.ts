import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.css'
})
export class RadioButtonComponent {
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>;

  @Input() name: string;

  @Input() value: any;

  @Input() class: string = '';

  @Input() id: string;

  @Input() checked: boolean = false;

  changeValue() {
    this.onSelect.emit(this.value);
  }
}
