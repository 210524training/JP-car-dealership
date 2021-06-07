import User from '../modules/user';
import userService from '../services/userService';
import userRepo from '../dynamo/repos/userRepo';

describe('User service tests', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
  });

  test('Testing findUserName', () => {
    const testUser: User = new User('name', 'pass', 'Customer');
    userRepo.getUser = jest.fn().mockImplementationOnce(
      (userName, answer) => answer(testUser),
    );

    expect(userService.findUserName('name')).resolves.toBe(testUser);
  });

  test('Test register', () => {
    const testUser: User = new User('name', 'pass', 'Customer');
    userRepo.getUser = jest.fn().mockImplementationOnce(
      (userName, answer) => answer(testUser),
    );

    expect(userService.register('name', 'pass')).resolves.toBe(false);
  });

  test('Test login', () => {
    const testUser: User = new User('name', 'pass', 'Customer');
    userRepo.getUser = jest.fn().mockImplementationOnce(
      (userName, answer) => answer(testUser),
    );

    expect(userService.login('name', 'pass')).resolves.toBe(true);
  });
});
