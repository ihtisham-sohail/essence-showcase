import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationPaneComponent } from './navigation-pane.component';
import { RbookComponent } from '../../components/rbook/rbook.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('NavigationPaneComponent', () => {
  let navFixture: ComponentFixture<NavigationPaneComponent>;
  let rbFixture: ComponentFixture<RbookComponent>;
  let router: Router;
  let initialState = { randomProp: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule],
      declarations: [NavigationPaneComponent, RbookComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    navFixture = TestBed.createComponent(NavigationPaneComponent);
    rbFixture = TestBed.createComponent(RbookComponent);
    router = TestBed.inject(Router);
    navFixture.detectChanges();
  });

  it('should create the navigation pane component', () => {
    const nav = navFixture.componentInstance;
    expect(nav).toBeTruthy();
  });

  it('should navigate to Gmail Route when clicking on route', () => {
    const navSpy = spyOn(router, 'navigateByUrl');
    const compiled = navFixture.debugElement.nativeElement;
    const linkEl = compiled.querySelector('#mail-link-div');

    expect(linkEl).toBeTruthy();
    expect(linkEl.textContent).toContain('Mail');

    linkEl.click();
    navFixture.detectChanges();

    expect(navSpy).toHaveBeenCalledWith(
      router.createUrlTree(['/mail']),
      jasmine.anything()
    );
  });

  it('should load the Rbook Component when routed', () => {
    const rbookComp = rbFixture.componentInstance;

    const navSpy = spyOn(router, 'navigateByUrl');
    const compiled = navFixture.debugElement.nativeElement;
    const linkEl = compiled.querySelector('#rbook-link-div');

    expect(linkEl).toBeTruthy();
    expect(linkEl.textContent).toContain('RBook');

    linkEl.click();
    navFixture.detectChanges();

    expect(navSpy).toHaveBeenCalledWith(
      router.createUrlTree(['/social']),
      jasmine.anything()
    );

    expect(rbookComp).toBeTruthy();
  });
});
