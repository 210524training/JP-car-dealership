import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo';
import User from '../../modules/user';
import log from '../../log';

class UserRepo {
  constructor(
      private docClient: DocumentClient = dynamo,
  ) {}

  async addUser(user: User): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'users',
      Item: user,
      ReturnConsumedCapacity: 'TOTAL',
      ConditionExpression: 'userName <> :username',
      ExpressionAttributeValues: {
        ':username': user.userName,
      },
    };

    try {
      const result = await this.docClient.put(params).promise();
      log.debug('Succesful add to user table');
      log.debug(result);
      return true;
    } catch(error) {
      log.error(error);
      return false;
    }
  }

  async getUser(userName: string): Promise<User | undefined> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'users',
      Key: {
        userName,
      },
      ProjectionExpression: '#name, #pass, #role',
      ExpressionAttributeNames: {
        '#name': 'userName',
        '#pass': 'password',
        '#role': 'role',
      },
    };

    try {
      const data = await this.docClient.get(params).promise();
      log.debug('Succesful retrieval of user data');
      log.debug(data);
      return data.Item as User | undefined;
    } catch(error) {
      log.error(error);
      return undefined;
    }
  }
}

export default new UserRepo();
