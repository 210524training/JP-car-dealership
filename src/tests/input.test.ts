import * as input from '../services/input';

describe('Input service test', () => {
  afterAll(() => {
    input.close();
  });

  test('Testing user input should return input when given input', async () => {
    const inputString: string = 'A';

    input.rlInterface.question = jest.fn().mockImplementationOnce(
      (questionText, answer) => answer(inputString),
    );
    // default is getUserInput
    await expect(input.default(inputString)).resolves.toBe(inputString);
  });
});
