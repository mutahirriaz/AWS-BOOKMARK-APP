import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class BookmarkBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const api = new appsync.GraphqlApi(this, "GRAPHQL_API" , {
      name: 'cdk-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig:{
        defaultAuthorization:{
          authorizationType: appsync.AuthorizationType.API_KEY
        }
      },
      xrayEnabled: true
    });

    const dynamoDBTable = new dynamodb.Table(this, 'Table', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    });

    const datasource = api.addDynamoDbDataSource('appsyncDatasource', dynamoDBTable);

    datasource.createResolver({
      typeName: 'Mutation',
      fieldName: 'addBookmark',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
        appsync.PrimaryKey.partition('id').auto(),
        appsync.Values.projecting()),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),      
    });

    datasource.createResolver({
      typeName: 'Query',
      fieldName: 'getBookmarks',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });

    datasource.createResolver({
      typeName: 'Mutation',
      fieldName: 'deleteBookmark',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbDeleteItem('id', 'id'),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    datasource.createResolver({
      typeName: 'Mutation',
      fieldName: 'updateBookmark',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
        appsync.PrimaryKey.partition('id').is('id'),
        appsync.Values.projecting(),
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

  }
}
