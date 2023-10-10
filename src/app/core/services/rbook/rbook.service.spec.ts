import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RbookService } from './rbook.service';
import { IPost } from '../../interfaces/rbook.interface';

let dummyPostList: IPost[] = [
  {
    postId: 1,
    id: '1',
    name: 'id labore ex et quam laborum',
    email: 'Eliseo@gardner.biz',
    body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
  },
  {
    postId: 1,
    id: '2',
    name: 'quo vero reiciendis velit similique earum',
    email: 'Jayne_Kuhic@sydney.com',
    body: 'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et',
  },
  {
    postId: 1,
    id: '3',
    name: 'odio adipisci rerum aut animi',
    email: 'Nikita@garfield.biz',
    body: 'quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione',
  },
];

describe('RbookService', () => {
  let rbookService: RbookService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RbookService],
    });

    rbookService = TestBed.get(RbookService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('getAllPosts() should return list of data', () => {
    rbookService.getAllPosts().subscribe((res) => {
      expect(res).toEqual(dummyPostList);
      expect(res.length).toBe(3);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/comments'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(dummyPostList);
  });
});
