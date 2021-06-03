import User from '../modules/user';
import userService from '../services/userService';

describe('User service tests', () => {
  beforeEach(() => {
    userService.users = [];
  });

  test('Testing findUserName', () => {
    const testUser: User = new User('name', 'pass', 'Customer');
    userService.users.push(testUser);

    expect(userService.findUserName('name')).toBe(testUser);
  });
});
