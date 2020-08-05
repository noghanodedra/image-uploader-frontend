import { FormControl } from '@angular/forms';

export const allowedFileType = (types: Array<string>): any => {
  return (control: FormControl): any => {
    const file = control.value;
    if (file) {
      const extension = file.name.split('.')[1].toLowerCase();
      if (types?.toString().toLowerCase().indexOf(extension) < 0) {
        return {
          allowedFileType: true,
        };
      }
      return null;
    }
    return null;
  };
};

export const allowedFileSize = (maxSizeKB: number): any => {
  return (control: FormControl): any => {
    const file = control.value;
    if (file && file.size && Number(file.size / 1000) > maxSizeKB) {
      return {
        allowedFileSize: true,
      };
    }
    return null;
  };
};
