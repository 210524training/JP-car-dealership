export default class Car {
  constructor(
      public carName: string, // model number/year
      public ownerName?: string,
      public payments?: number,
  ) {}
}
