'use strict';

nbici.factory('SmoothiesService', ['$http', '$q', '$rootScope', 'LoggerService', 'API_URL_BASE', function($http, $q, $rootScope, LoggerService, API_URL_BASE){

    // Variables definition
    /**
     *
     */
    var service;


    var productsCatalog = [];
    var selectedCategoryId = undefined;
    var cards = undefined;

    // Service API Definition
    /**
     *
     * @param msg
     * @param data
     */
    var broadcast = function(msg, data) {
        $rootScope.$broadcast(msg, data);
    };

    /**
     * Returns the products catalog list
     * @returns {*[]}
     */
    var getProductsCatalog = function() {
        return angular.copy(productsCatalog);
    };

    var transformToCatalogObject = function(array){
        var list = [];

        try {
            for(var i=0; i<array.length; i++) {
                var category = {};
                category.id = array[i].id;
                category.name = array[i].name;
                category.picture = array[i].image_url;

                var products = [];
                for(var j=0; j<array[i].menu_items.length; j++) {
                    var product = array[i].menu_items[j];
                    products.push({
                        product: new Product(product.id, product.name, product.description, product.price, product.picture),
                        quantity: 0,
                    });
                }

                category.products = products;
                list.push(category);
            }
        } catch(error) {
            LoggerService.$logger().error(error);
        }

        return list;
    };

    /**
     * Set the products catalog list as an array
     * @param productsCatalog
     */
    var setProductsCatalog = function(productsCatalogList) {
        if(productsCatalogList){
            productsCatalog = transformToCatalogObject(productsCatalogList);
        }
    };

    var setSelectedCategory = function(category) {
        selectedCategoryId = category.id;
    };

    var getSelectedCategory = function() {
        for(var i=0; i<productsCatalog.length; i++) {
            if(productsCatalog[i].id == selectedCategoryId) {
                return productsCatalog[i];
            }
        }  
    };

    var addProduct = function(product) {
        for(var i=0; i<productsCatalog.length; i++) {
            for(var j=0; j<productsCatalog[i].products.length; j++) {
                if(productsCatalog[i].products[j].product.getId() == product.getId()){
                    productsCatalog[i].products[j].quantity = productsCatalog[i].products[j].quantity + 1;
                }
            }   
        }
    }

    var removeProduct = function(product) {
        for(var i=0; i<productsCatalog.length; i++) {
            for(var j=0; j<productsCatalog[i].products.length; j++) {
                if(productsCatalog[i].products[j].product.getId() == product.getId()){
                    productsCatalog[i].products[j].quantity = (productsCatalog[i].products[j].quantity - 1) < 0 ? 0 : (productsCatalog[i].products[j].quantity - 1)
                }
            }   
        }
    }

    var getOrderTotal = function() {
        var total = 0;
        for(var i=0; i<productsCatalog.length; i++) {
            for(var j=0; j<productsCatalog[i].products.length; j++) {
                total += productsCatalog[i].products[j].quantity * productsCatalog[i].products[j].product.getPrice();
            }   
        }
        return total;
    }

    /**
     *
     * @returns {Array}
     */
    var getCards = function() {
        return angular.copy(cards);
    };

    var transformToCardsObject = function(cards){
        var list = [];

        try {
            for (var i=0; i<cards.length; i++) {
                var item = cards[i];
                var card = new Card(item.active, item.brand, undefined, item.exp_month, item.exp_year, item.last4, item.name, item.phone, item.primary, false, item.uid);

                switch (item.brand){
                    case 'VISA':
                        card.setBrandClass('icon-cc-visa');
                        break;
                    case 'MC':
                        card.setBrandClass('icon-cc-mastercard');
                        break;
                    case 'AMERICAN_EXPRESS':
                        card.setBrandClass('icon-cc-amex');
                        break;
                }
                if (card.getActive()){
                    list.push(card);
                }
            }

        } catch(error){
            LoggerService.$logger().error(error);
        }

        return list;
    };

    /**
     *
     * @param cardsList
     */
    var setCards = function(cardsList) {
        try {
            cards = transformToCardsObject(cardsList);
        } catch(error) {
            LoggerService.$logger().error(error);
        }
    };

    /**
     *
     * @returns {Card}
     */
    var getPrimaryCard = function() {
        for(var i=0; i<cards.length; i++) {
            if(cards[i].getPrimary()){
                return cards[i];
            }
        }
    };

    var placeOrder = function(appointmentId, orderTotal, cardId, notes, menuItems) {
        var menuPurchaseServiceURL = API_URL_BASE + '/menu_purchases/charge';

        var params = {
            appointment_id: appointmentId,
            price: orderTotal,
            uid: cardId,
            notes: notes,
            menu_items: menuItems,
        };

        return $http.post(menuPurchaseServiceURL, params)
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    return data;
                } else {
                    return $q.reject(data);
                }
            }, function(error){
                return $q.reject(error.data);
            });
    };

    service = {
        broadcast: broadcast,
        getProductsCatalog: getProductsCatalog,
        setProductsCatalog: setProductsCatalog,
        getSelectedCategory: getSelectedCategory,
        setSelectedCategory: setSelectedCategory,
        addProduct: addProduct,
        removeProduct: removeProduct,
        getOrderTotal: getOrderTotal,
        getCards: getCards,
        setCards: setCards,
        getPrimaryCard: getPrimaryCard,
        placeOrder: placeOrder,
    };

    return service;

}]);