/* eslint-disable no-await-in-loop */
import getUserInput, { close } from './services/input';
import userService from './services/userService';

async function registerMenu() {
  let userName: string;
  let password: string;

  do {
    userName = await getUserInput('Input your username\n');
    // check exisitng pass
    password = await getUserInput('Input your password\n');
    let passConfirm = await getUserInput('Re enter your password\n');
    while(password !== passConfirm) {
      console.log('Entered passwords do not Match');
      password = await getUserInput('Input your password\n');
      passConfirm = await getUserInput('Re enter your password\n');
    }
  } while(!userService.register(userName, password));
  console.log('Registration Successful');
}

async function main() {
  userService.load();

  let cont = true;

  while(cont) {
    const input : string = await getUserInput('Type R to register\nType S to sign in\nType Q to quit\n');
    if(input === 'R' || input === 'r') {
      await registerMenu();
    } else if(input === 'S' || input === 's') {
    // login menu
    } else if(input === 'Q') {
      cont = false;
    }
  }

  // close console input
  close();
  userService.save();
}

main();
