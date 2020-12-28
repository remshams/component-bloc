import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { of } from 'rxjs';
import { UsersBloc } from 'src/app/_common/users/bloc';
import { createUsersFixture } from 'src/app/_common/users/fixture';
import { createUsersRestAdapterMock } from 'src/app/_common/users/mock';
import { usersRestAdapterToken } from 'src/app/_common/users/model';
import { UsersBlocComponent } from './component';

describe('UsersComponent', () => {
  let component: UsersBlocComponent;
  let fixture: ComponentFixture<UsersBlocComponent>;

  const users = createUsersFixture();
  const userNames = users.map(user => user.name);
  const usersRestAdapterMock = createUsersRestAdapterMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatListModule],
      declarations: [UsersBlocComponent],
      providers: [
        {
          provide: usersRestAdapterToken,
          useValue: usersRestAdapterMock
        },
        UsersBloc
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    usersRestAdapterMock.list.mockReturnValue(of(users));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('usernames', () => {
    it('should render user name list', () => {
      const matListItems = fixture.nativeElement.querySelectorAll('.usernames__element');

      expect(matListItems.length).toEqual(userNames.length);
      expect(matListItems[0].textContent).toEqual(userNames[0]);
    });
  });
});
