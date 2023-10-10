import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GmailHTTPService } from './gmail-enpoint.service';
import {
  getGmailDataUrl,
  getGLabelListUrl,
} from 'src/app/configs/endpoint.constant';

describe('GmailEnpointService', () => {
  let gService: GmailHTTPService;
  let httpMock: HttpTestingController;

  const fakeUserId = '123';
  const fakeMailId = '234';

  const dummyLableList: any = [
    {
      id: '2453',
      threadId: 'George',
    },
  ];

  const dummyMailData: any = {
    from: 'carlos',
    date: 'carlos date',
    subject: 'carlos subject',
    labelid: 'label id here',
    id: 12,
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GmailHTTPService],
    });

    gService = TestBed.get(GmailHTTPService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('getEmailListIds() should return data', () => {
    gService.getEmailListIds(fakeUserId).subscribe((res) => {
      expect(res).toEqual(dummyLableList);
    });

    const req = httpMock.expectOne(getGLabelListUrl(fakeUserId));
    expect(req.request.method).toBe('GET');
    req.flush(dummyLableList);
  });

  it('getEmailDataById() should return data', () => {
    gService.getEmailDataById(fakeUserId, fakeMailId).subscribe((res) => {
      expect(res).toEqual(dummyMailData);
    });

    const req = httpMock.expectOne(getGmailDataUrl(fakeUserId, fakeMailId));
    expect(req.request.method).toBe('GET');
    req.flush(dummyMailData);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
