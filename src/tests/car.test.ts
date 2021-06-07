import carRepo from '../dynamo/repos/carRepo';
import Car from '../modules/car';
import carService from '../services/carService';

describe('Car service tests', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
  });

  test('Test display all owned cars', () => {
    const testCar: Car = new Car('car');
    const cars: Car[] = [];
    cars.push(testCar);
    carRepo.findOwnedCars = jest.fn().mockImplementationOnce(
      (answer) => answer(cars),
    );

    expect(carService.displayAllOwned()).resolves.toBe(cars);
  });

  test('Test display all unowned cars', () => {
    const testCar: Car = new Car('car');
    const cars: Car[] = [];
    cars.push(testCar);
    carRepo.findUnownedCars = jest.fn().mockImplementationOnce(
      (answer) => answer(cars),
    );

    expect(carService.displayAllUnowned()).resolves.toBe(cars);
  });

  test('Test display all cars', () => {
    const testCar: Car = new Car('car');
    const testCar2: Car = new Car('car2', 'testuser', 0);
    const cars: Car[] = [];
    cars.push(testCar);
    cars.push(testCar2);
    carRepo.getAll = jest.fn().mockImplementationOnce(
      (answer) => answer(cars),
    );

    expect(carService.displayAllCars()).resolves.toBe(cars);
  });

  test('Testing removeCar', () => {
    const testCar: Car = new Car('car');
    const cars: Car[] = [];
    cars.push(testCar);
    carRepo.removeCar = jest.fn().mockImplementationOnce(
      (answer) => answer(true),
    );

    expect(carService.removeCar(0, cars)).resolves.toBe(true);
  });

  test('Testing update car failing', () => {
    carRepo.updateCar = jest.fn().mockImplementationOnce(
      (answer) => answer(false),
    );

    expect(carService.updateCar('testcar', 'testuser', 0)).resolves.toBe(false);
  });
});
