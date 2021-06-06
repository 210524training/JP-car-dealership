export default class Car {
  constructor(
      public carName: string, // model number/year
      public owner?: string,
      public payments?: number,
  ) {}
}
