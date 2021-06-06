import Offer from '../modules/offer';
import OfferRepo from '../dynamo/repos/offerRepo';
import carService from './carService';

class OfferService {
  constructor(
    private repo = OfferRepo,
  ) {}

  async addOffer(carName: string, userName: string, offerAmount: number) {
    if(Number.isNaN(offerAmount)) {
      console.log('Please enter a number for offer amount (do not include any commas of symbols)');
      return;
    }

    if(!await this.repo.createOffer(new Offer(carName, userName, offerAmount))) {
      console.log('Unable to create offer');
    }
  }

  async displayAllOffers(): Promise<Offer[]> {
    const offers: Offer[] = await this.repo.getAll();

    // eslint-disable-next-line no-plusplus
    for(let i = 0; i < offers.length; i++) {
      let output = `${i}: ${offers[i].carName} `;
      output += ` Offeree: ${offers[i].userName} `;
      output += ` Offer amount: ${offers[i].offerAmount} `;
      console.log(output);
    }

    return offers;
  }

  async rejectOffer(offerIndex: number, offers: Offer[]): Promise<boolean> {
    // check if offer exists
    if(Number.isNaN(offerIndex) || offerIndex >= offers.length || offerIndex < 0) {
      console.log('You have entered an invalid offer index, please try agiain');
      return false;
    }

    if(!await this.repo.removeOffer(offers[offerIndex].carName, offers[offerIndex].userName)) {
      console.log('Car could not be removed from lot');
      return false;
    }
    return true;
  }

  async acceptOffer(offerIndex: number, offers: Offer[]): Promise<boolean> {
    // check if offer index exists
    if(Number.isNaN(offerIndex) || offerIndex >= offers.length || offerIndex < 0) {
      console.log('You have entered an invalid offer index, please try agiain');
      return false;
    }
    // update owner and payment for car on offer
    const offer = offers[offerIndex];
    if(await carService.updateCar(offer.carName, offer.userName, offer.offerAmount)) {
      // look through list of offers and delete ones with the same name if the updated was succesful
      // eslint-disable-next-line no-plusplus
      for(let i = 0; i < offers.length; i++) {
        if(offers[i].carName === offer.carName) {
          // eslint-disable-next-line no-await-in-loop
          await this.repo.removeOffer(offers[i].carName, offers[i].userName);
        }
      }
      return true;
    }
    return false;
  }
}

export default new OfferService();
