/* eslint-disable no-await-in-loop */
import getUserInput from '../services/input';
import userService from '../services/userService';
import carService from '../services/carService';

async function customerMenu() {
  let cont = true;

  while(cont) {
    console.log(`Hello customer ${userService.currentUser && userService.currentUser.userName}`);
    const questionString = 'Type V to veiw cars on the lot\nType O to view cars you own\n'
      + 'Type P to view your remaining payments\nType Q to logout\n';
    const input : string = await getUserInput(questionString);
    if(input === 'Q' || input === 'q') {
      userService.logout();
      cont = false;
    }
  }
}

async function employeeMenu() {
  let cont = true;

  while(cont) {
    console.log(`Hello employee ${userService.currentUser && userService.currentUser.userName}`);
    const questionString = 'Type A to add cars to the lot\nType R to remove cars from the lot\n'
      + 'Type O to view offers\nType P to view all payments\nType Q to logout\n';
    const input : string = await getUserInput(questionString);
    if(input === 'A' || input === 'a') {
      const carname = await getUserInput('What is the name of the new car?\n');
      await carService.addCar(carname);
    } else if(input === 'R' || input === 'r') {
      const cars = await carService.displayAllCars();
      // ask which one they want to delete
      const carId = await getUserInput('Which car do you want deleted? Input the number that appears at the start of the line.\n');
      // delete car if valid number
      await carService.removeCar(Number(carId), cars);
    } else if(input === 'Q' || input === 'q') {
      userService.logout();
      cont = false;
    }
  }
}

async function registerMenu() {
  const userName = await getUserInput('Input your username\n');
  // double check the users password
  let password = await getUserInput('Input your password\n');
  let passConfirm = await getUserInput('Re enter your password\n');
  while(password !== passConfirm) {
    console.log('Entered passwords do not Match\n');
    password = await getUserInput('Input your password\n');
    passConfirm = await getUserInput('Re enter your password\n');
  }

  const registerSuccess = await userService.register(userName, password);
  if(!registerSuccess) {
    console.log('Registration failed');
  } else {
    console.log('Registration Successful');
  }
}

async function loginMenu() {
  const userName: string = await getUserInput('Input your username\n');
  const password: string = await getUserInput('Input your password\n');

  // userService.login will give messages for incorrect username or pass
  if(await userService.login(userName, password)) {
    if(userService.currentUser && userService.currentUser.role === 'Customer') {
      await customerMenu();
    } else {
      await employeeMenu();
    }
  }
}

export default async function mainMenu(): Promise<void> {
  let cont = true;

  while(cont) {
    const input : string = await getUserInput('Type R to register\nType S to sign in\nType Q to quit\n');
    if(input === 'R' || input === 'r') {
      await registerMenu();
    } else if(input === 'S' || input === 's') {
      await loginMenu();
    } else if(input === 'Q' || input === 'q') {
      cont = false;
    }
  }
}
