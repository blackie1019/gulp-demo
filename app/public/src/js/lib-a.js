function printMsg(msg){
    $("#output-div").html(msg);
    console.log("output:"+msg);
}

function testFunctionInA(msg){
    testFunctionInB(msg);
}

// document.addEventListener("DOMContentLoaded", function() {
    testFunctionInA("Hi I am Blackie");
// });