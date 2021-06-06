import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import Car from '../../modules/car';
import dynamo from '../dynamo';

class CarRepo {
  constructor(
      private docClient: DocumentClient = dynamo,
  ) {}

  async getAll(): Promise<Car[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'cars',
      ProjectionExpression: '#name, #own, #pay',
      ExpressionAttributeNames: {
        '#name': 'carName',
        '#own': 'owner',
        '#pay': 'payments',
      },
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      return data.Items as Car[];
    }

    return [];
  }

  async addCar(car: Car): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'cars',
      Item: car,
      ReturnConsumedCapacity: 'TOTAL',
      ConditionExpression: 'carName <> :carname',
      ExpressionAttributeValues: {
        ':carname': car.carName,
      },
    };

    try {
      const result = await this.docClient.put(params).promise();

      console.log(result); // good place for logging
      return true;
    } catch(error) {
      console.log(error); // also good place for logging
      return false;
    }
  }

  async removeCar(carName: string) {
    const params: DocumentClient.DeleteItemInput = {
      TableName: 'cars',
      Key: {
        carName,
      },
    };

    try {
      const result = await this.docClient.delete(params).promise();

      console.log(result); // good place for logging
      return true;
    } catch(error) {
      console.log(error); // also good place for logging
      return false;
    }
  }
}

export default new CarRepo();
