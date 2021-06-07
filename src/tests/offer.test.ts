import carRepo from '../dynamo/repos/carRepo';
import offerRepo from '../dynamo/repos/offerRepo';
import Offer from '../modules/offer';
import offerService from '../services/offerService';

describe('Car service tests', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
  });

  test('Test add offer', () => {
    const offers: Offer[] = [];
    offerRepo.createOffer = jest.fn().mockImplementationOnce(
      (offer, answer) => answer(offers.push(offer)),
    );

    offerService.addOffer('testcar', 'testuser', 0);

    expect(offers.length).toBe(1);
  });

  test('Test display all offers', () => {
    const testOffer: Offer = new Offer('testcar', 'testuser', 0);
    const offers: Offer[] = [];
    offers.push(testOffer);
    offerRepo.getAll = jest.fn().mockImplementationOnce(
      (answer) => answer(offers),
    );

    expect(offerService.displayAllOffers()).resolves.toBe(offers);
  });

  test('Testing reject offer', () => {
    const testOffer: Offer = new Offer('testcar', 'testuser', 0);
    const offers: Offer[] = [];
    offers.push(testOffer);
    offerRepo.removeOffer = jest.fn().mockImplementationOnce(
      (answer) => answer(true),
    );

    expect(offerService.rejectOffer(0, offers)).resolves.toBe(true);
  });

  test('Testing accept offer', () => {
    const testOffer: Offer = new Offer('testcar', 'testuser', 0);
    const offers: Offer[] = [];
    offers.push(testOffer);
    carRepo.updateCar = jest.fn().mockImplementationOnce(
      (answer) => answer(true),
    );
    offerRepo.removeOffer = jest.fn().mockImplementationOnce(
      (answer) => answer(true),
    );

    expect(offerService.acceptOffer(0, offers)).resolves.toBe(true);
  });
});
