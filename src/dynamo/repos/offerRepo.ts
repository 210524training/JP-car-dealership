import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import log from '../../log';
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

      log.debug('succesfull addition to offer table');
      log.debug(result);
      return true;
    } catch(error) {
      log.error(error);
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

    try {
      const data = await this.docClient.scan(params).promise();
      log.debug('Succesfull scan of offer table');
      log.debug(data);
      if(data.Items) {
        return data.Items as Offer[];
      }
    } catch(error) {
      log.error(error);
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

      log.debug('Succesfull removal from offer table');
      log.debug(result);
      return true;
    } catch(error) {
      log.error(error);
      return false;
    }
  }
}

export default new CarRepo();
