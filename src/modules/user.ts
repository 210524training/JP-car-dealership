export default class User {
  constructor(
      public userName: string,
      public password: string,
      public role: 'Customer' | 'Employee',
  ) {}
}
