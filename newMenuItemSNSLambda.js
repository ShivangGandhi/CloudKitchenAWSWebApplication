//This is the code for lamdba function written to trigger a notification when a new menu item is added on the menu.

const AWS = require("aws-sdk");
const sns = new AWS.SNS();

exports.handler = async (event) => {

    let message = ''
    let subject = ''

    if (event.Records[0].eventName == 'INSERT') {
        message = JSON.stringify(event.Records[0].dynamodb.NewImage)
        subject = 'New Menu Item Added'
    }
    else if (event.Records[0].eventName == 'REMOVE') {
        message = JSON.stringify(event.Records[0].dynamodb.OldImage)
        subject = 'Menu Item Deleted'
    }

    const params = {
        Message: message,
        Subject: subject,
        TopicArn: "arn:aws:sns:us-east-1:251244722880:menuItem"
    }

    await sns.publish(params).promise();
};