/* eslint-disable no-await-in-loop */
import mainMenu from './menus/menus';
import { close } from './services/input';

async function main() {
  await mainMenu();

  // close console input
  close();
}

main();
