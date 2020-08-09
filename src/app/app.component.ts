import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ImageUploadService } from './services/image-upload.service';
import {
  allowedFileType,
  allowedFileSize,
} from './validators/file-validators';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'image-uploader-frontend';
  allowedImageFileSizeKB: number = environment.allowedImageFileSizeKB;
  allowedImageFileTypes = environment.allowedImageFileTypes;

  uploadForm: FormGroup = new FormGroup({
    description: new FormControl(null, Validators.required),
    file: new FormControl(null, [
      Validators.required,
      allowedFileType(this.allowedImageFileTypes?.split(',')),
      allowedFileSize(this.allowedImageFileSizeKB),
    ]),
  });
  success = false;
  loading = false;
  error: any;

  constructor(private imageUploadService: ImageUploadService) {}

  onSubmit(): void {
    this.success = false;
    this.loading = true;
    this.error = null;

    if (!this.uploadForm.valid) {
      this.markAllAsDirty(this.uploadForm);
      return;
    }

    this.imageUploadService
      .upload(this.toFormData(this.uploadForm.value))
      .subscribe(
        (res) => {
          this.success = true;
          this.loading = false;
          this.uploadForm.reset();
        },
        (error) => {
          this.error = error;
          this.success = false;
          this.loading = false;
        }
      );
  }

  hasError(field: string, error: string): boolean {
    const control = this.uploadForm.get(field);
    return control.dirty && control.hasError(error);
  }

  toFormData<T>(formValue: T): FormData {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return formData;
  }

  markAllAsDirty(form: FormGroup): void {
    for (const control of Object.keys(form.controls)) {
      form.controls[control].markAsDirty();
    }
  }
}
