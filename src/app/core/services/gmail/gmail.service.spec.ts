import { TestBed, getTestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GmailService } from './gmail.service';
import { GmailHTTPService } from '../../http/gmail-enpoint/gmail-enpoint.service';
import {
  getGLabelListUrl,
  getGmailDataUrl,
} from 'src/app/configs/endpoint.constant';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../authentication/authentication.serivce';

describe('GmailService', () => {
  let gService: GmailService;

  let userId = 'fakeId';
  let fakeLabelId = 'fakeLabelId';

  const apiSpy = jasmine.createSpyObj('GmailHTTPService', [
    'getEmailListIds',
    'getEmailDataById',
  ]);

  const authSpy = jasmine.createSpyObj('AuthService', ['getUserId']);

  const labelRes = {
    messages: [
      {
        id: fakeLabelId,
        threadId: 'George',
      },
    ],
    nextPageToken: '',
  };

  const dummyMailData: any = {
    from: 'from user 1',
    date: '1/20/1970, 4:21:00 PM',
    subject: 'subject 1',
    labelId: fakeLabelId,
    id: 0,
  };

  const gmailRes = {
    internalDate: 1696860848,
    payload: {
      headers: [
        { name: 'Subject', value: 'subject 1' },
        { name: 'From', value: 'from user 1' },
      ],
    },
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GmailService,
        { provide: GmailHTTPService, useValue: apiSpy },
        { provide: AuthService, useValue: authSpy },
      ],
    });

    gService = TestBed.get(GmailService);
    gService.userId = userId;
  });

  it('getMailList() should return Mail List data', () => {
    const toggleSpy = spyOn<any>(gService, 'getMailDetails').and.callThrough();

    apiSpy.getEmailListIds.and.returnValue(of(labelRes));
    apiSpy.getEmailDataById.and.returnValue(of(gmailRes));

    gService.getMailList().subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res[0]).toEqual(dummyMailData);
      expect(toggleSpy).toHaveBeenCalled();
    });
  });

  it('getMailDetails() should return Specific Mail data', () => {
    apiSpy.getEmailDataById.and.returnValue(of(gmailRes));

    gService.getMailDetails(fakeLabelId).subscribe((res) => {
      expect(res).toEqual(dummyMailData);
      expect(res.from).toBeTruthy();
      expect(res.subject).toBeTruthy();
      expect(res.labelId).toBeTruthy();
    });
  });
});
