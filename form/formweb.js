$(document).ready(function () {
    var cust;
    // set the modules being used
    require(['customer'], function (customer) {

        // initialize customer and account
        cust = customer.initWithKey(apiKey);
        //console.log(cust); DEBUG
    });


    // Set API key here!
    var apiKey = '0b8d0c7d3234fc3a53a511eef83e8ceb';

    var customerFirstName;
    var customerLastName;
    var customerHouseNumber;
    var customerStreetName;
    var customerCity;
    var customerState;
    var customerZip;

    var createdId; //The ID of the customer that was created

    $("#submit").click(function (){
        getInput();
        postCustomer();
    })

    function getInput() {
        customerFirstName = document.getElementById("fname").value;
        customerLastName = document.getElementById("lname").value;
        customerHouseNumber = document.getElementById("number").value;
        customerStreetName = document.getElementById("stname").value;
        customerCity = document.getElementById("city").value;
        customerState = document.getElementById("state").value;
        customerZip = document.getElementById("zipcode").value;
    }

    function postCustomer() {
        // build customer data
        //var newCustDetails = "{ \"first_name\": \"" + customerFirstName + "\", \"last_name\": \"" + customerLastName + "\", \"address\": { \"street_number\":" + customerHouseNumber + "\", \"street_name\":" + customerStreetName + "\", \"city\":" + customerCity + "\", \"state\":" + customerState + //"\", \"zip\":" + customerZip+"}";

        var custDetails = {
            'first_name': customerFirstName,
            'last_name': customerLastName,
            'address': {
                'street_number': customerHouseNumber,
                'street_name': customerStreetName,
                'city': customerCity,
                'state': customerState,
                'zip': customerZip
            }
        }

        // make the API call, returns response code
        createdId = cust.createCustomer(JSON.stringify(custDetails));

        // console logging and update web page
        console.log("[Customer - Create Customer] Customer ID: " + createdId);
    }
});