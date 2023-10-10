import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostModel } from 'src/app/shared/models/post.model';
import { postListUrl } from 'src/app/configs/endpoint.constant';
import { IPost } from '../interfaces/rbook.interface';

@Injectable({
  providedIn: 'root',
})
export class RbookService {
  constructor(private router: Router, private http: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(postListUrl);
  }
  AddNewUser(): any {}
  DeleteUser(): any {}
}
