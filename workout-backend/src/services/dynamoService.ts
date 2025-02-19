import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, DeleteCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
  

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const getItem = async (tableName: string, key: object) => {
    return await docClient.send(new GetCommand({ TableName: tableName, Key: key }));
};

export const putItem = async (tableName: string, item: object) => {
    return await docClient.send(new PutCommand({ TableName: tableName, Item: item }));
};

export const updateItem = async (tableName: string, key: object, updateExpression: string, expressionValues: object, expressionNames: Record<string, string> = {}) => {
    return await docClient.send(new UpdateCommand({
        TableName: tableName,
        Key: key,
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionValues,
        ExpressionAttributeNames: expressionNames,
        ReturnValues: "UPDATED_NEW"
    }));
};

export const deleteItem = async (tableName: string, key: object) => {
    return await docClient.send(new DeleteCommand({ TableName: tableName, Key: key }));
};

export const scanTable = async (tableName: string) => {
    return await docClient.send(new ScanCommand({ TableName: tableName }));
};
