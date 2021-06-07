import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import log from '../../log';
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
        '#own': 'ownerName',
        '#pay': 'payments',
      },
    };

    try {
      const data = await this.docClient.scan(params).promise();
      log.debug('Succesfull scan of car table');
      log.debug(data);
      if(data.Items) {
        return data.Items as Car[];
      }
    } catch(error) {
      log.error(error);
    }

    return [];
  }

  async findOwnedCars(): Promise<Car[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'cars',
      ProjectionExpression: '#name, #own, #pay',
      FilterExpression: 'attribute_exists(#own)',
      ExpressionAttributeNames: {
        '#name': 'carName',
        '#own': 'ownerName',
        '#pay': 'payments',
      },
    };
    try {
      const data = await this.docClient.scan(params).promise();
      log.debug('Succesfull scan of car table');
      log.debug(data);
      if(data.Items) {
        return data.Items as Car[];
      }
    } catch(error) {
      log.error(error);
    }
    return [];
  }

  async findUnownedCars(): Promise<Car[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'cars',
      ProjectionExpression: '#name, #own, #pay',
      FilterExpression: 'attribute_not_exists(#own)',
      ExpressionAttributeNames: {
        '#name': 'carName',
        '#own': 'ownerName',
        '#pay': 'payments',
      },
    };
    try {
      const data = await this.docClient.scan(params).promise();
      log.debug('Succesfull scan of car table');
      log.debug(data);
      if(data.Items) {
        return data.Items as Car[];
      }
    } catch(error) {
      log.error(error);
    }
    return [];
  }

  async findMyCars(userName: string): Promise<Car[]> {
    const params: DocumentClient.QueryInput = {
      TableName: 'cars',
      IndexName: 'owner-index',
      KeyConditionExpression: 'ownerName = :o_name',
      ExpressionAttributeValues: {
        ':o_name': userName,
      },
    };

    try {
      const data = await this.docClient.query(params).promise();
      log.debug('Succesfull query of car table');
      log.debug(data);
      if(data.Items) {
        return data.Items as Car[];
      }
    } catch(error) {
      log.error(error);
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
      log.debug('Succesfull addition to car table');
      log.debug(result);
      return true;
    } catch(error) {
      log.error(error);
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
      log.debug('Succesfull removal from car table');
      log.debug(result);
      return true;
    } catch(error) {
      log.error(error);
      return false;
    }
  }

  async updateCar(car: Car): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'cars',
      Key: {
        carName: car.carName,
      },
      ReturnConsumedCapacity: 'TOTAL',
      UpdateExpression: 'SET ownerName = :n, payments = :p',
      ExpressionAttributeValues: {
        ':p': car.payments,
        ':n': car.ownerName,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    try {
      const result = await this.docClient.update(params).promise();
      log.debug('Succesfull update to car table');
      log.debug(result);
      return true;
    } catch(error) {
      log.error(error);
      return false;
    }
  }
}

export default new CarRepo();
