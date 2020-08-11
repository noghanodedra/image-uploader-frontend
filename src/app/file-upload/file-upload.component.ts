import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
})
export class FileUploadComponent implements OnInit, ControlValueAccessor {
  // tslint:disable-next-line: ban-types
  onChange: Function;
  file: File | null = null;

  constructor(private host: ElementRef<HTMLInputElement>) {}

  @HostListener('change', ['$event.target.files']) emitFiles(
    event: FileList
  ): void {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  ngOnInit(): void {}

  writeValue(value: null): void {
    this.host.nativeElement.value = '';
    this.file = null;
  }

  // tslint:disable-next-line: ban-types
  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }
  // tslint:disable-next-line: ban-types
  registerOnTouched(fn: Function): void {}
}
