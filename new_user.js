$(document).ready(function () {
    var cust;
    // set the modules being used
    require(['customer'], function (customer) {

        // initialize customer and account
        cust = customer.initWithKey(apiKey);
    });


    // Set API key here!
    var apiKey = '0b8d0c7d3234fc3a53a511eef83e8ceb';

    var customerFirstName;
    var customerLastName;

    $("#submit").click(function (){
        getInput();
    })

    $('#show').click(function (){
        showme();
    })

    function getInput() {
        customerFirstName = document.getElementById("first").value;
        customerLastName = document.getElementById("last").value;

        //postCustomer(apiKey, cust);
    }

    function showme() {
        getCustomer(apiKey, cust);
    }

    function postCustomer(key, cust) {
        // build customer data
        var newCustDetails = "{ \"first_name\": \"" + customerFirstName + "\", \"last_name\": \"" + customerLastName + "\", \"address\": { \"street_number\": \"1\", \"street_name\": \"Capital One Dr.\", \"city\": \"McLean\", \"state\": \"VA\", \"zip\": \"22102\" } }";

        // make the API call, returns response code
        var responseCode = cust.createCustomer(newCustDetails);

        // console logging and update web page
        console.log("[Customer - Create Customer] Response Code: " + responseCode);
        $('#postCustomer').html("Create Customer: Response Code <b>" + responseCode + "</b>")
    }

    function getCustomer(key, cust) {
        var allCustomers = cust.getCustomers();
        var myCustomer = null;

        // loop through all customers and log their info
        console.log("[Customer - Get All Customers]");
        for (var i = 0; i < allCustomers.length; i++) {

            var gotcha=allCustomers[i];
            var firstName = gotcha.first_name;
            var lastName = gotcha.last_name;
            
            console.log("Customer[" + i + "]: " + firstName + " " + lastName);

            // take note of the customer we created
            if (firstName == customerFirstName && lastName == customerLastName) {
                myCustomer = gotcha;
            }
        }

        // display the customer we created
        var fullName = myCustomer.first_name + " " + myCustomer.last_name;
        var streetName = myCustomer.address;
        console.log("[Customer - My Customer] " + fullName);
        $('#getCustomer').html("Results: <b>" + allCustomers.length + "</b>" + " customers retrieved, please see developer console for full list.<br/>");
        $('#getCustomer').append("My Customer: <b>" + fullName + "</b> Customer Street Name: " + streetName);
    }
});