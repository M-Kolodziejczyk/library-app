/* Amplify Params - DO NOT EDIT
	API_LIBRARYAPP_CUSTOMERTABLE_ARN
	API_LIBRARYAPP_CUSTOMERTABLE_NAME
	API_LIBRARYAPP_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
var aws = require("aws-sdk");
var ddb = new aws.DynamoDB({ apiVersion: "2012-10-08" });

exports.handler = async (event, context) => {
  const tableName = process.env.API_LIBRARYAPP_CUSTOMERTABLE_NAME;
  const region = process.env.REGION;

  aws.config.update({ region: region });

  if (event.request.userAttributes.sub) {
    let ddbParams = {
      Item: {
        id: { S: event.request.userAttributes.sub },
        firstName: { S: event.request.userAttributes.given_name },
        lastName: { S: event.request.userAttributes.family_name },
        email: { S: event.request.userAttributes.email }
      },
      TableName: tableName
    };

    try {
      const res = await ddb.putItem(ddbParams).promise();
      console.log("Success", res);
    } catch (error) {
      console.log("Error: ", error);
    }

    console.log("Success: Everything executed correctly");
    context.done(null, event);
  } else {
    console.log("Nothing was written ti DDB");
    context.done(null, event);
  }
};
