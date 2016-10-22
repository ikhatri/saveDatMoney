define('customer', function (require) {
    "use strict";
    var Config = require('capital_one');
    
	var Customer = {
		initWithKey: function(apiKey) {
			Config.setApiKey(apiKey);
			return this;
		},
		urlWithEntity: function() {
			return Config.baseUrl+"/customers/";
		},
		urlWithAcctEntity: function() {
			return Config.baseUrl+"/accounts/";
		},
		apiKey: function() {
			return Config.apiKey;
		},
		/**
		  # @Method: getCustomers
		  # @Brief: Gets all customers the API key has acccess to.
		  # @Returns an array of JSON Objects.
		**/
		getCustomers: function() {
			var customers;
			var request = $.ajax({ 
				url: this.urlWithEntity(), 
				data: 'key='+this.apiKey(), 
				async: false,
				dataType: 'json'
			});

			request.done(function(results) {
				customers = results;
			});
			return customers;
		},
		/**
		  # @Method: getCustomerById
		  # @Brief: Gets the specified customer's information.
		  # @Parameters: CustomerId
		  # @Returns a object with the customer data
		**/
		getCustomerById: function(custId) {
			var customer;
			var request = $.ajax({ 
				url: this.urlWithEntity()+custId,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});

			request.done(function(results) {
				customer = results;
			});
			return customer;
		},
		/**
		  # @Method: Get the customer for the given account.
		  # @Parameters: AccountId
		  # @Returns a object with the specified customer data.
		**/
		getCustomerByAcountId: function(accId) {
			var customer;
			var request = $.ajax({ 
				url: this.urlWithAcctEntity()+accId+'/customer',
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});
			
			request.done(function(results) {
				customer = results;
			});
			return customer;
		},
		/**
		  # @Method: updateCustomer
		  # @Brief: Updates a customer by id with given JSON data. 
		  # @Parameters: CustomerId, Customerobject.
		  # @Note: Json is as follows: 
		  #  {
		  #   "address": {
		  #     "street_number": "",
		  #     "street_name": "",
		  #     "city": "",
		  #     "state": "",
		  #     "zip": ""
		  #   }
		  # }
		  # @Returns the ID of the updated customer. 
		**/
		updateCustomer: function(custId, json) {
			var respCode;
			var updatedCustId;
			var request = $.ajax({
				url: this.urlWithEntity()+custId+'?key='+this.apiKey(),
				data: json,
				contentType: 'application/json',
				async: false,
				type: 'PUT'
			});

			request.complete(function(jqXHR, textStatus) {
				respCode = jqXHR.status;
				updatedCustId = JSON.parse(jqXHR.responseText).objectCreated._id;
			});
			return updatedCustId;
		},
		/**
		  # @Method: createCustomer
		  # @Brief: Creates a customer with given JSON data. 
		  # @Parameters: Customerobject.
		  # @Note: Json is as follows: 
		  #
		  # {
		  #  "first_name": "",
		  #	 "last_name": "",
		  #  {
		  #   "address": {
		  #     "street_number": "",
		  #     "street_name": "",
		  #     "city": "",
		  #     "state": "",
		  #     "zip": ""
		  #   }
		  #  }
		  # }
		  #
		  # @Returns the ID of the created customer. 
		**/
		createCustomer: function(json) {
			var respCode;
			var createdCustId;
			var request = $.ajax({
				url: this.urlWithEntity()+'?key='+this.apiKey(),
				data: json,
				contentType: 'application/json',
				async: false,
				type: 'POST'
			});

			request.complete(function(jqXHR, textStatus) {
				respCode = jqXHR.status;
				createdCustId = JSON.parse(jqXHR.responseText).objectCreated._id;
				//console.log(jqXHR);
			});
			return createdCustId;
		}
	};
	return Customer;
});