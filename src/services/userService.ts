import fs from 'fs';
import User from '../modules/user';

class UserService {
  constructor(
      public users: User[] = [],
  ) {}

  findUserName(userName: string): User | undefined {
    return this.users.find((user) => user.userName === userName);
  }

  // Returns true on successful registration, false otherwise
  register(userName: string, password: string): boolean {
    if(this.findUserName(userName)) {
      console.log('User name already taken');
      return false;
    }

    this.users.push(new User(userName, password, 'Customer'));
    return true;
  }

  save() {
    const usersString = JSON.stringify(this.users);
    fs.writeFileSync('users.json', usersString);
  }

  async load() {
    const data = fs.readFileSync('users.json');
    this.users = JSON.parse(data.toString());
  }
}

export default new UserService();
