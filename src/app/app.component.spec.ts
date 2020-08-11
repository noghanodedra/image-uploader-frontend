import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ImageUploadService } from '../app/services/image-upload.service';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';


describe('AppComponent', () => {

  let imageUploadService: ImageUploadService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, FileUploadComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [
        ImageUploadService,
      ],
    }).compileComponents();
    imageUploadService = TestBed.inject(ImageUploadService);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'image-uploader-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('image-uploader-frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.container div').textContent).toContain(
      'Image Uploader'
    );
  });


  it('should not call upload on submit when fields are empty', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    spyOn(imageUploadService, 'upload').and.callThrough();
    spyOn(app, 'markAllAsDirty').and.callThrough();

    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('submit', fakeEvent);
    expect(app.uploadForm.controls.description.valid).toBeFalsy();
    expect(app.uploadForm.controls.file.valid).toBeFalsy();
    expect(imageUploadService.upload).toHaveBeenCalledTimes(0);
    expect(app.markAllAsDirty).toHaveBeenCalledTimes(1);
  });

  it('should call upload on submit when fields are valid', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const file = new File(['sample'], 'sample.png', { type: 'image/png' });

    app.uploadForm.controls.description.setValue('test');
    app.uploadForm.controls.file.setValue(file);
    spyOn(app, 'markAllAsDirty').and.callThrough();
    spyOn(imageUploadService, 'upload').and.
                returnValue(of('success'));

    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('submit', fakeEvent);
    expect(imageUploadService.upload).toHaveBeenCalled();
    expect(imageUploadService.upload).toHaveBeenCalledTimes(1);
    expect(app.markAllAsDirty).toHaveBeenCalledTimes(0);

  });
});
