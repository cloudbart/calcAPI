console.log('Loading the Calc function');

exports.handler = function(event, context, callback) {
    console.log('Received event:', JSON.stringify(event, null, 2));
    if (event.a === undefined || event.b === undefined || event.op === undefined) {
        callback(new Error("400 Invalid Input"));
    }
    
    var result = {};
    result.a = Number(event.a);
    result.b = Number(event.b);
    result.op = event.op;
    
    if (isNaN(event.a) || isNaN(event.b)) {
        callback(new Error("400 Invalid Operand"));
    }

    switch(event.op)
    {
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
            result.c = result.b===0 ? NaN : Number(event.a) / Number(event.b);
            break;
        default:
            callback(new Error("400 Invalid Operator"));
            break;
    }
    console.log('Calculation results:', JSON.stringify(result, null, 2));
    callback(null, result);
};
