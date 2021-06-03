import readline from 'readline';

export const rlInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function close() {
  rlInterface.close();
}

export default function getUserInput(question: string) : Promise<string> {
  return new Promise<string>(
    (resolve) => {
      rlInterface.question(question,
        (answer) => resolve(answer));
    },
  );
}
