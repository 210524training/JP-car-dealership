import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo';
import User from '../../modules/user';

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

      console.log(result); // good place for logging
      return true;
    } catch(error) {
      console.log(error); // also good place for logging
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

    const data = await this.docClient.get(params).promise();

    return data.Item as User | undefined;
  }
}

export default new UserRepo();
