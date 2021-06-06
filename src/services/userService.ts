import userRepo from '../dynamo/repos/userRepo';
import User from '../modules/user';

class UserService {
  public currentUser : User | undefined;

  constructor(
    private repo = userRepo,
  ) {}

  // find the user with the given name
  async findUserName(userName: string): Promise<User | undefined> {
    const user = await this.repo.getUser(userName);
    return user;
  }

  // adds new user to database
  // Returns true on successful registration, false otherwise
  async register(userName: string, password: string): Promise<boolean> {
    const user = await this.findUserName(userName);
    if(user) {
      console.log('User name already taken\n');
      return false;
    }

    return this.repo.addUser(new User(userName, password, 'Customer'));
  }

  // checks if a user exists in the DB and the password is correct then sets currentUser
  // returns true on successful login false otherwise
  async login(userName: string, password: string): Promise<boolean> {
    if(this.currentUser) {
      // good place for debug logging and error handling
      console.log('Error: A user is already logged in');
      return false;
    }

    const loginUser = await this.findUserName(userName);

    if(!loginUser) {
      console.log('User does not exist\n');
    } else if(loginUser.password !== password) {
      console.log('Password is incorrect\n');
    } else {
      this.currentUser = loginUser;
      return true;
    }
    return false;
  }

  // clears current user
  logout() {
    this.currentUser = undefined;
  }
}

export default new UserService();
