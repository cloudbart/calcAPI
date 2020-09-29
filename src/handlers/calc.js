console.log('Loading the Calculator function');

exports.handler = function(event, context, callback) {
    console.log('Invoked ARN: ', context.invokedFunctionArn);
    console.log('Function Version: ', context.functionVersion);
    console.log('Received calculation event:', JSON.stringify(event, null, 2));
    if (event.a === undefined || event.b === undefined || event.op === undefined) {
        return callback(new Error("400 Invalid Input"));
    }

    var result = {};
    result.a = Number(event.a);
    result.b = Number(event.b);
    result.op = event.op;

    if (isNaN(event.a) || isNaN(event.b)) {
        return callback(new Error("400 Invalid Operand"));
    }

    switch (event.op) {
        case "+":
            result.c = result.a + result.b;
            break;
        case "-":
            result.c = result.a - result.b;
            break;
        case "*":
            result.c = result.a * result.b;
            break;
        case "/":
            result.c = result.b === 0 ? NaN : Number(event.a) / Number(event.b);
            break;
        default:
            return callback(new Error("400 Invalid Operator"));
    }
    console.log('Calculation results:', JSON.stringify(result, null, 2));
    
    var response = {};
    response.InvokedARN = context.invokedFunctionArn;
    response.InvokedVersion = context.functionVersion;
    response.a = Number(event.a);
    response.b = Number(event.b);
    response.op = event.op;
    callback(null, response);
};
