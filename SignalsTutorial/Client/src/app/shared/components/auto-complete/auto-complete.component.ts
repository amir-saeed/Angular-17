import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteComponent),
      multi: true,
    },
  ],
})
export class AutoCompleteComponent implements ControlValueAccessor {
  @Input() options: string[] = [];
  @Output() optionSelected = new EventEmitter<string>();

  private propagateChange = (_: any) => {};

  myControl = new FormControl();
  filteredOptions$: Observable<string[]>;

  constructor() {
    this.filteredOptions$ = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      map((value) => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }

  onSelect(option: string): void {
    this.optionSelected.emit(option);
  }

  writeValue(obj: any): void {
    this.myControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.myControl.disable();
    } else {
      this.myControl.enable();
    }
  }
}
