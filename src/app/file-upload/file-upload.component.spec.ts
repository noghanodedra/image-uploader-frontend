import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';
import { DebugElement, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngx-mix-test-disable-link-directive',
  template: `
    <div>
      <app-file-upload formControlName="file"></app-file-upload>
    </div>
  `,
})
class TestFileUploadComponent {
  file: FormControl = new FormControl();
}

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let testFileUploadComponent: TestFileUploadComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadComponent, TestFileUploadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.file).toBeDefined();

  });

  it('should listen for file change', () => {
    const fixture2: ComponentFixture<TestFileUploadComponent> = TestBed.createComponent(
      TestFileUploadComponent
    );
    testFileUploadComponent = fixture2.componentInstance;
    fixture2.detectChanges();
    const input = fixture2.debugElement.nativeElement.querySelector('input');
    spyOn(component, 'emitFiles');
    const fakeChangeEvent = new Event('change', { bubbles: true });
    input.dispatchEvent(fakeChangeEvent);
    fixture2.detectChanges();
    fixture2.whenStable().then(() => {
      expect(component.emitFiles).toHaveBeenCalled();
      expect(component.onChange).toHaveBeenCalled();
      expect(testFileUploadComponent.file.value).toBeDefined();
    });
    expect(component.file).toBeDefined();
  });



});
