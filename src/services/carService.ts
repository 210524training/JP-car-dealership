import Car from '../modules/car';
import CarRepo from '../dynamo/repos/carRepo';

class CarService {
  constructor(
    private repo = CarRepo,
  ) {}

  async displayAllUnowned() {
    const cars: Car[] = await this.repo.findUnownedCars();

    // eslint-disable-next-line no-plusplus
    for(let i = 0; i < cars.length; i++) {
      console.log(`${i}: ${cars[i].carName}`);
    }
  }

  async displayMyCars(userName: string) {
    const cars: Car[] = await this.repo.findMyCars(userName);

    // eslint-disable-next-line no-plusplus
    for(let i = 0; i < cars.length; i++) {
      console.log(`${i}: ${cars[i].carName}`);
    }
  }

  async displayAllCars(): Promise<Car[]> {
    const cars: Car[] = await this.repo.getAll();

    // eslint-disable-next-line no-plusplus
    for(let i = 0; i < cars.length; i++) {
      let output = `${i}: ${cars[i].carName} `;
      output += ` Owner: ${cars[i].ownerName || 'No owner'} `;
      output += ` Payments left: ${cars[i].payments || '0'} `;
      console.log(output);
    }

    return cars;
  }

  async addCar(carName: string): Promise<boolean> {
    const newCar = new Car(carName);

    if(!await this.repo.addCar(newCar)) {
      console.log('Car was unable to be added to the lot');
      return false;
    }
    return true;
  }

  async removeCar(carId: number, cars: Car[]): Promise<boolean> {
    // check if car exists
    if(Number.isNaN(carId) || carId >= cars.length || carId < 0) {
      console.log('You have entered an invalid input, please try agiain');
      return false;
    }

    if(!await this.repo.removeCar(cars[carId].carName)) {
      console.log('Car could not be removed from lot');
      return false;
    }
    return true;
  }
}

export default new CarService();
