<?php
    wp_enqueue_script( 'Card' );
    wp_enqueue_script( 'Product' );
    wp_enqueue_script( 'SmoothiesService' );
    wp_enqueue_script( 'SmoothiesController' );

?>
<div id="smoothies" ng-controller="SmoothiesController as smoothiesCtrl" class="smoothies-component animate-visibility" ng-init="smoothiesCtrl.init(<?php echo get_smoothies(); ?>, <?php echo get_cards(); ?>)">
    <div ng-show="smoothiesCtrl.isPurchaseAvailable()">
        <div ng-hide="smoothiesCtrl.isPurchaseConfirmationVisible()">
            <h1 style="text-align: center; color: #fff;">¿Te preparamos algo para después de tu entrenamiento?</h1>
            <p style="text-align: center; color: #fff;">Haz tu pedido ahora para que lo tengamos listo cuando salgas de tu clase.</p>
            <div class="categories-list" ng-hide="smoothiesCtrl.isMenuVisible()">
                <div ng-repeat="category in smoothiesCtrl.productsCatalog" class="category-item" ng-click="smoothiesCtrl.selectCategory(category)">
                    <div class="category-image-container">
                        <img ng-src="{{category.picture}}" class="category-image">
                    </div>
                    <div class="category-name">{{category.name}}</div>
                </div>
            </div>
            <div class="smoothies-list animate-visibility" ng-show="smoothiesCtrl.isMenuVisible()">
                <div class="categories-picker-container smoothies-section">
                    <span
                        ng-repeat="category in smoothiesCtrl.productsCatalog" 
                        ng-click="smoothiesCtrl.selectCategory(category)"
                        ng-class="{ 'selected' : smoothiesCtrl.isSelectedCategory(category) }"
                    >
                        {{ category.name }}
                    </span>
                </div>
                <div class="products-container smoothies-section">
                    <div class="product-meta">
                        <div class="product-price">precio</div>
                        <div class="product-quantity">cantidad</div>
                    </div>
                    <div ng-repeat="item in smoothiesCtrl.getSelectedCategory().products" class="product">
                        <div class="product-info">
                            <div class="product-name">{{ item.product.getName() }}</div>
                            <div class="product-description">{{item.product.getDescription()}}</div>
                        </div>
                        <div class="product-price">${{ item.product.getPrice() }}</div>
                        <div class="product-quantity">
                            <div class="quantity-label">cant. </div>
                            <div class="quantity-less noselect" ng-click="smoothiesCtrl.removeProduct(item.product)">-</div>
                            <div class="quantity-number noselect">{{ item.quantity }}</div>
                            <div class="quantity-more noselect" ng-click="smoothiesCtrl.addProduct(item.product)">+</div>
                        </div>
                    </div>
                    <div class="order-total">
                        <div>total de la orden: {{ smoothiesCtrl.getOrderTotal() | currency:"$" }}</div>
                    </div>
                </div>
                <div class="comments-container smoothies-section">
                    <label for="comments">Comentarios o instrucciones:</label>
                    <textarea name="comments" ng-model="smoothiesCtrl.orderComments"></textarea>
                </div>
                <div class="cards-container smoothies-section">
                    <span style="margin-right:15px;">Elige un método de pago:</span>
                    <select class="filter" ng-model="smoothiesCtrl.selectedCard" ng-options="card.getBrand().charAt(0).toUpperCase()+card.getBrand().slice(1).toLowerCase()+' terminada en '+card.getLastNumbers() for card in smoothiesCtrl.cards track by card.getId()"></select>
                    <div ng-show="!smoothiesCtrl.selectedCard" class="no-payment-method-message">No cuentas con métodos de pago para realizar la compra.</div>
                </div>
                <div class="button-container smoothies-section">
                    <a class="et_pb_more_button et_pb_button" ng-click="smoothiesCtrl.processingPayment || smoothiesCtrl.placeOrder()">Confirmar pedido</a>
                </div>
            </div>
        </div>
        <div ng-show="smoothiesCtrl.isPurchaseConfirmationVisible()">
            <h1 style="text-align: center; color: #fff;">¡Recibimos tu pedido!</h1>
            <p style="text-align: center; color: #fff;">Lo tendremos listo para cuando finalices tu entrenamiento.</p>
        </div>
        <div class="social-container">
            <div class="a2a_kit a2a_kit_size_32 addtoany_list" style="text-align: center;">
                <span>Comparte con tus amigos: </span><a><span class="a2a_svg a2a_s__default a2a_s_facebook" ng-click="notificationCtrl.shareFB()"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#FFF" d="M17.78 27.5V17.008h3.522l.527-4.09h-4.05v-2.61c0-1.182.33-1.99 2.023-1.99h2.166V4.66c-.375-.05-1.66-.16-3.155-.16-3.123 0-5.26 1.905-5.26 5.405v3.016h-3.53v4.09h3.53V27.5h4.223z"></path></svg></span></a><a class="a2a_button_twitter"></a> 
            </div>
        </div>
    </div>
    <div ng-hide="smoothiesCtrl.isPurchaseAvailable()">
        <h1 style="text-align: center; color: #fff;">La barra Dafit no abrirá este día</h1>
        <p style="text-align: center; color: #fff;">Lamentamos cualquier inconveniente.</p>
    </div>
</div>