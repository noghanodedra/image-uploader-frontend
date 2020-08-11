import { allowedFileSize, allowedFileType } from './file-validators';
import { FormControl } from '@angular/forms';

describe('File Validators - allowedFileSize', () => {
  const ALLOWED_FILE_SIZE_KB = 500;
  it('should return allowedFileSize=true for invalid file size', () => {
    const file = {
      name: 'test.png',
      type: 'image/png',
      size: 501000,
    };
    const formControl: FormControl = new FormControl(file);
    const retVal = allowedFileSize(ALLOWED_FILE_SIZE_KB)(formControl);
    expect(retVal).toBeDefined();
    expect(retVal.allowedFileSize).toBeTruthy();
  });

  it('  should return null for valid file size', () => {
    const file = { name: 'test.png', type: 'image/png', size: 499000 };
    const formControl: FormControl = new FormControl(file);
    const retVal = allowedFileSize(ALLOWED_FILE_SIZE_KB)(formControl);
    expect(retVal).toBeNull();
  });
});

describe('File Validators - allowedFileType', () => {
  const ALLOWED_FILE_TYPES = ['JPG', 'PNG'];
  it('should return allowedFileType=true for invalid file type ', () => {
    const file = {
      name: 'test.txt',
      type: 'text/html',
      size: 501000,
    };
    const formControl: FormControl = new FormControl(file);
    const retVal = allowedFileType(ALLOWED_FILE_TYPES)(formControl);
    expect(retVal).toBeDefined();
    expect(retVal.allowedFileType).toBeTruthy();
  });

  it('should return null for valid file type', () => {
    const file = { name: 'test.png', type: 'image/png', size: 499000 };
    const formControl: FormControl = new FormControl(file);
    const retVal = allowedFileType(ALLOWED_FILE_TYPES)(formControl);
    expect(retVal).toBeNull();
  });
});
