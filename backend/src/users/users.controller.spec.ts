import { UsersController } from './users.controller';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './Auth.service';
import { UserEntity } from './entity.user';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) =>
        Promise.resolve({
          id,
          email: 'test@gmail.com',
          password: 'test',
        } as UserEntity),
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'test' }] as User[]);
      },
      // remove: () => {},
      // update: () => {},
    };
    fakeAuthService = {
      signIn: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
      signUp: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const email = 'test@gmail.com';
    const users = await controller.findAllUsers(email);
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual(email);
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('signin updates session object and returns user', async () => {
    const session = {};
    const user = await controller.signIn(
      {
        email: 'aaaa@gmail.com',
        password: '1212',
      },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session['userId']).toEqual(1);
  });
});
