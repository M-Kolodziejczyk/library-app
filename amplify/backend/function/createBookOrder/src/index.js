/* Amplify Params - DO NOT EDIT
	API_LIBRARYAPP_BOOKORDERTABLE_ARN
	API_LIBRARYAPP_BOOKORDERTABLE_NAME
	API_LIBRARYAPP_BOOKTABLE_ARN
	API_LIBRARYAPP_BOOKTABLE_NAME
	API_LIBRARYAPP_CUSTOMERTABLE_ARN
	API_LIBRARYAPP_CUSTOMERTABLE_NAME
	API_LIBRARYAPP_GRAPHQLAPIIDOUTPUT
	API_LIBRARYAPP_ORDERTABLE_ARN
	API_LIBRARYAPP_ORDERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const orderTable = process.env.API_LIBRARYAPP_ORDERTABLE_NAME;
const bookOrderTable = process.env.API_LIBRARYAPP_BOOKORDERTABLE_NAME;

const createOrder = async payload => {
  const { order_id, email } = payload;

  let params = {
    TableName: orderTable,
    Item: {
      id: order_id,
      __typename: "Order",
      customer: email,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
  };

  console.log(params);
  await documentClient.put(params).promise();
};

const createBookOrder = async payload => {
  let bookOrders = [];
  for (i = 0; i < payload.cart.length; i++) {
    const cartItem = payload.cart[i];
    bookOrders.push({
      PutRequest: {
        Item: {
          id: uuidv4(),
          __typename: "BookOrder",
          book_id: cartItem.id,
          order_id: payload.order_id,
          customer: payload.email,
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString()
        }
      }
    });
  }
  let params = {
    RequestItems: {}
  };
  params["RequestItems"][bookOrderTable] = bookOrders;
  console.log(params);
  await documentClient.batchWrite(params).promise();
};

exports.handler = async event => {
  try {
    let payload = event.arguments.input;
    payload.order_id = uuidv4();

    await createOrder(payload);

    await createBookOrder(payload);

    return "NEW";
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
};
