import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import Offer from '../../modules/offer';
import dynamo from '../dynamo';

class CarRepo {
  constructor(
      private docClient: DocumentClient = dynamo,
  ) {}

  async createOffer(offer: Offer): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'offers',
      Item: offer,
      ReturnConsumedCapacity: 'TOTAL',
      ConditionExpression: 'carName <> :carname AND userName <> :username',
      ExpressionAttributeValues: {
        ':carname': offer.carName,
        ':username': offer.userName,
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

  async getAll(): Promise<Offer[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'offers',
      ProjectionExpression: '#name, #user, #offer',
      ExpressionAttributeNames: {
        '#name': 'carName',
        '#user': 'userName',
        '#offer': 'offerAmount',
      },
    };

    const data = await this.docClient.scan(params).promise();

    if(data.Items) {
      return data.Items as Offer[];
    }

    return [];
  }

  async removeOffer(carName: string, userName: string) {
    const params: DocumentClient.DeleteItemInput = {
      TableName: 'offers',
      Key: {
        carName,
        userName,
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
