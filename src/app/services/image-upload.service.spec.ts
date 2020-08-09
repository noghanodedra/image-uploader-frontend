import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule, HttpTestingController,
} from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ImageUploadService } from './image-upload.service';

describe('ImageUploadService', () => {
  let service: ImageUploadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageUploadService],
    });
    service = TestBed.inject(ImageUploadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Success Scenarios', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should return an Observable<any>', () => {
      service.upload(new FormData()).subscribe((resp) => {
        expect(resp).toEqual({});
      });

      const req = httpMock.expectOne(environment.uploadApiUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.cancelled).toBeFalsy();

      const expectedResponse = new HttpResponse({
        status: 201,
        statusText: 'Created',
        body: {},
      });
      req.event(expectedResponse);
    });
  });

});
