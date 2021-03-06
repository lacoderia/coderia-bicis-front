<p class="module-name">{{ profileCtrl.MODULES.PAYMENTS.name }}</p>
<div id="payment" class="profile-payment-module animate-visibility" ng-controller="ProfilePaymentController as profilePaymentCtrl" ng-init="profilePaymentCtrl.init(<?php echo htmlspecialchars(json_encode(get_option('conekta_public'))); ?>, <?php echo get_cards(); ?>)">
    <span us-spinner spinner-key="payments-spinner"></span>

    <div ng-show="profilePaymentCtrl.paymentMessage">{{ profilePaymentCtrl.paymentMessage }}</div>

    <div ng-show="!profilePaymentCtrl.isNewCardVisible() && profilePaymentCtrl.hasCards() " class="card-list animate-visibility">
        <div>
            <a class="button-blue new-card-btn" ng-click="profilePaymentCtrl.showNewCard()">Agregar otra tarjeta</a>
        </div>
        <card ng-repeat="card in profilePaymentCtrl.cards | orderBy: 'getPrimary()': true">
            <div class="card">
                <div class="card-info top-border">
                    <div class="card-info-row">
                        <div class="card-info-cell full-width">
                            <span class=" card-number card-info-input">XXXX-XXXX-XXXX-{{ card.getLastNumbers() }}</span>
                        </div>
                    </div>
                    <div class="card-info-row">
                        <div class="card-info-cell full-width">
                            <div class="card-info-label card-expiration-date-label">Vencimiento: </div>
                            <span class="card-info-input card-expiration-date">{{ card.getExpYear() }}/{{ card.getExpMonth() }}</span>
                        </div>
                    </div>
                    <div class="card-info-row">
                        <div class="card-info-cell full-width">
                            <span type="text" class="card-name card-info-input">{{ card.getName() }}</span>
                        </div>
                    </div>
                    <div class="card-info-row">
                        <div class="card-info-cell full-width">
                            <a class="action-link" ng-repeat="button in profilePaymentCtrl.PAYMENT_METHODS_BUTTONS" ng-if="profilePaymentCtrl.showActionButtons(card.getPrimary(), button.action)"  ng-class="[button.class]" title=" {{ button.text }}" ng-click="profilePaymentCtrl.callButtonAction(button.action, card)"><span ng-class="[button.icon]"></span> {{ button.text }}</a>
                        </div>
                    </div>
                </div>
                <div class="card-info-brand"><span class="{{ card.getBrandClass() }} icon-card"></span></div>
                <div class="main-card " ng-if="card.getPrimary()"><span class="icon-main-card"></span> Principal</div>
            </div>
        </card>
    </div>

    <div class="no-card animate-visibility" ng-show="profilePaymentCtrl.isNewCardVisible() || !profilePaymentCtrl.hasCards()"  ng-class="{ true: 'active', false: ''}[profilePaymentCtrl.isNewCardActive()]" ng-mouseover="profilePaymentCtrl.setNewCardFormStatus(true)" ng-mouseout="profilePaymentCtrl.setNewCardFormStatus(false)">
        <div class="card-title">Agregar tarjeta de crédito</div>
        <div class="card-info">
            <form novalidate name="profilePaymentCtrl.newCardForm" class="form" ng-submit="profilePaymentCtrl.saveCard()">
                <span class="required-message">{{ formMessage }}</span>
                <div class="card-info-row">
                    <div class="card-info-cell full-width">
                        <input type="text" name="debitCardNumber" ng-model="profilePaymentCtrl.newCard.debitCardNumber" pattern="/^[0-9]+$/" ng-pattern="/^[0-9]+$/" ng-minlength="14" ng-maxlength="16" maxlength="16" class="number card-info-input" placeholder="* Número de la tarjeta de crédito" required>
                        <div class="required-message" ng-show="profilePaymentCtrl.newCardForm.$submitted || profilePaymentCtrl.newCardForm.debitCardNumber.$touched">
                            <span ng-show="profilePaymentCtrl.newCardForm.debitCardNumber.$error.required">El número de la tarjeta es requerido.</span>
                            <span ng-show="profilePaymentCtrl.newCardForm.debitCardNumber.$error.pattern">El número de la tarjeta no es válido.</span>
                            <span ng-show="profilePaymentCtrl.newCardForm.debitCardNumber.$error.minlength || profilePaymentCtrl.newCardForm.debitCardNumber.$error.maxlength">El número de la tarjeta no es válido</span>
                        </div>
                    </div>
                </div>
                <div class="card-info-row">
                    <div class="card-info-cell third-width">
                        <select name="expirationYear" ng-model="profilePaymentCtrl.newCard.expirationYear" required>
                            <option value="">* Año</option>
                            <option ng-repeat="year in profilePaymentCtrl.availableYears" value="{{ year - 2000 }}">{{ year }}</option>
                        </select>
                        <div class="required-message" ng-show="profilePaymentCtrl.newCardForm.$submitted || profilePaymentCtrl.newCardForm.expirationYear.$touched">
                            <span ng-show="profilePaymentCtrl.newCardForm.expirationYear.$error.required">Requerido.</span>
                        </div>
                    </div>
                    <div class="card-info-cell third-width">
                        <select name="expirationMonth" ng-model="profilePaymentCtrl.newCard.expirationMonth" required>
                            <option value="">* Mes</option>
                            <option ng-repeat="month in profilePaymentCtrl.MONTHS" value="{{ $index+1 }}">{{ month }}</option>
                        </select>
                        <div class="required-message" ng-show="profilePaymentCtrl.newCardForm.$submitted || profilePaymentCtrl.newCardForm.expirationMonth.$touched">
                            <span ng-show="profilePaymentCtrl.newCardForm.expirationMonth.$error.required">Requerido.</span>
                        </div>
                    </div>
                    <div class="card-info-cell third-width">
                        <input type="text" name="debitCardValidationNumber" ng-model="profilePaymentCtrl.newCard.debitCardValidationNumber" ng-pattern="/^[0-9]+$/" ng-minlength="3" ng-maxlength="4" maxlength="4" class="number card-info-input" placeholder="* CVV" required>
                        <div class="required-message" ng-show="profilePaymentCtrl.newCardForm.$submitted || profilePaymentCtrl.newCardForm.debitCardValidationNumber.$touched">
                            <span ng-show="profilePaymentCtrl.newCardForm.debitCardValidationNumber.$error.required">Requerido.</span>
                            <span ng-show="profilePaymentCtrl.newCardForm.debitCardValidationNumber.$error.pattern">No es válido.</span>
                            <span ng-show="profilePaymentCtrl.newCardForm.debitCardValidationNumber.$error.minlength || profilePaymentCtrl.newCardForm.debitCardNumber.$error.maxlength">No es válido</span>
                        </div>
                    </div>
                </div>
                <div class="card-info-row">
                    <div class="card-info-cell full-width">
                        <input class="card-info-input" name="debitCardHolder" ng-model="profilePaymentCtrl.newCard.debitCardHolder" placeholder="* Nombre en la tarjeta de crédito" required>
                        <div class="required-message" ng-show="profilePaymentCtrl.newCardForm.$submitted || profilePaymentCtrl.newCardForm.debitCardHolder.$touched">
                            <span ng-show="profilePaymentCtrl.newCardForm.debitCardHolder.$error.required">El nombre es requerido.</span>
                        </div>
                    </div>
                </div>
                <div class="card-info-row">
                    <div class="card-info-cell full-width">
                        <input type="tel" name="phoneNumber" ng-model="profilePaymentCtrl.newCard.phoneNumber" ng-pattern="/^[0-9]+$/" ng-minlength="8" ng-maxlength="10" maxlength="10" class="card-info-input" placeholder="* Número de teléfono" required>
                        <div class="required-message" ng-show="profilePaymentCtrl.newCardForm.$submitted || profilePaymentCtrl.newCardForm.phoneNumber.$touched">
                            <span ng-show="profilePaymentCtrl.newCardForm.phoneNumber.$error.required">El número de teléfono es requerido.</span>
                            <span ng-show="profilePaymentCtrl.newCardForm.phoneNumber.$error.pattern">El número de teléfono no es válido.</span>
                            <span ng-show="profilePaymentCtrl.newCardForm.phoneNumber.$error.minlength || profilePaymentCtrl.newCardForm.phoneNumber.$error.maxlength">El número de teléfono no es válido</span>
                        </div>
                    </div>
                </div>
                <div class="card-info-row">
                    <div class="card-info-cell full-width">
                        <ul class="payment-options">
                            <li><img alt="Visa" src="<?php echo get_stylesheet_directory_uri() . '/images/payment/visa.png'; ?>"></li>
                            <li><img alt="MasterCard" src="<?php echo get_stylesheet_directory_uri() . '/images/payment/mastercard.png'; ?>"></li>
                            <li><img alt="Carnet" src="<?php echo get_stylesheet_directory_uri() . '/images/payment/carnet.png'; ?>"></li>
                            <li><img alt="American Express" src="<?php echo get_stylesheet_directory_uri() . '/images/payment/amex.png'; ?>"></li>
                        </ul>
                    </div>
                </div>
                <div class="card-info-row">
                    <div class="card-info-cell full-width">
                        <a class="button-blue" ng-class="{ true: '', false: 'disabled' }[profilePaymentCtrl.newCardForm.$valid && profilePaymentCtrl.isNewCardVisible()]" ng-disabled="!profilePaymentCtrl.newCardForm.$valid" ng-click="profilePaymentCtrl.saveCard()"><span class="icon-lock"></span>&nbsp;&nbsp;agregar tarjeta</a>
                        <a class="button action-link" ng-click="profilePaymentCtrl.hideNewCard()">cancelar</a>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <!-- Listado de métodos de pago actuales -->
    <!--div ng-show="profilePaymentCtrl.cards && profilePaymentCtrl.cards.length && !profilePaymentCtrl.isNewCardVisible()">
        <h3 class="section-subtitle">Tarjetas registradas</h3>
        <div class="cards-list">
            <div class="cards-headers">
                <div class="type"></div>
                <div class="number">Tarjeta o Cuenta</div>
                <div class="main">Principal</div>
                <div class="control"></div>
            </div>
            <div ng-repeat="card in profilePaymentCtrl.cards | orderBy:card.getPrimary()" class="card-item">
                <div class="card-resume" ng-click="profilePaymentCtrl.toggleCardInfo(card)">
                    <div class="type"><span class="icon-credit-card"></span></div>
                    <div class="number">XXXX-XXXX-XXXX-{{ card.getLastNumbers() }}</div>
                    <div class="main"><span class="icon-principal" ng-if="card.getPrimary()"></span></div>
                    <span><span class="control-arrow" ng-class="{ true:'icon-arrow-down', false:'icon-arrow-right'}[card.getShowInfo()]"></span></span>
                </div>
                <div class="card-info" ng-show="card.getShowInfo()">
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th class="brand"></th>
                                <th class="holder-name">Nombre</th>
                                <th class="more-info">Fecha de expiración</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="brand"><span ng-class="card.getBrandClass()"></span></td>
                                <td class="holder-name">{{ card.getName() }}</td>
                                <td class="more-info">{{ card.getExpMonth() }}/{{ card.getExpYear() }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <a ng-repeat="button in profilePaymentCtrl.PAYMENT_METHODS_BUTTONS" ng-if="profilePaymentCtrl.showActionButtons(card.getPrimary(), button.action)"  ng-class="[button.class]" title=" {{ button.text }}" ng-click="profilePaymentCtrl.callButtonAction(button.action, card)"><span ng-class="[button.icon]"></span> {{ button.text }}</a>
                    </div>

                </div>
            </div>
        </div>

        <fieldset>
            <div>
                <a ng-click="profilePaymentCtrl.showNewCard()"><span class="icon-credit-card"></span> Agregar una tarjeta</a>
            </div>
        </fieldset>

    </div-->

    <!-- Forma para nueva tarjeta >
    <div ng-show="profilePaymentCtrl.isNewCardVisible()">
        <span>Tarjetas de débito y crédito aceptadas</span>
        <ul class="payment-options">
            <li><img alt="Visa" src="<?php echo get_stylesheet_directory_uri() . '/images/payment/visa.png'; ?>"></li>
            <li><img alt="MasterCard" src="<?php echo get_stylesheet_directory_uri() . '/images/payment/mastercard.png'; ?>"></li>
            <li><img alt="Carnet" src="<?php echo get_stylesheet_directory_uri() . '/images/payment/carnet.png'; ?>"></li>
            <li><img alt="American Express" src="<?php echo get_stylesheet_directory_uri() . '/images/payment/amex.png'; ?>"></li>
        </ul>
        <form novalidate name="profilePaymentCtrl.newCardForm" class="form" ng-submit="profilePaymentCtrl.saveCard()">
            <span class="required-message">{{ formMessage }}</span>
            <fieldset>
                <div>
                    <label>Nombre en la tarjeta:</label>
                    <input type="text" name="debitCardHolder" ng-model="profilePaymentCtrl.newCard.debitCardHolder" placeholder="Nombre en la tarjeta" required/>
                    <div class="required-message" ng-show="profilePaymentCtrl.newCardForm.$submitted || profilePaymentCtrl.newCardForm.debitCardHolder.$touched">
                        <span ng-show="newCardForm.debitCardHolder.$error.required">El nombre es requerido.</span>
                    </div>
                </div>
                <div>
                    <label>Número en la tarjeta:</label>
                    <input type="text" name="debitCardNumber" ng-model="profilePaymentCtrl.newCard.debitCardNumber" pattern="/^[0-9]+$/" ng-pattern="/^[0-9]+$/" ng-minlength="14" ng-maxlength="16" maxlength="16" placeholder="Número en la tarjeta" required/>
                    <div class="required-message" ng-show="profilePaymentCtrl.newCardForm.$submitted || profilePaymentCtrl.newCardForm.debitCardNumber.$touched">
                        <span ng-show="profilePaymentCtrl.newCardForm.debitCardNumber.$error.required">El número de la tarjeta es requerido.</span>
                        <span ng-show="profilePaymentCtrl.newCardForm.debitCardNumber.$error.pattern">El número de la tarjeta no es válido.</span>
                        <span ng-show="profilePaymentCtrl.newCardForm.debitCardNumber.$error.minlength || profilePaymentCtrl.newCardForm.debitCardNumber.$error.maxlength">El número de la tarjeta no es válido</span>
                    </div>
                </div>
                <div>
                    <label>Fecha de expiración:</label>
                    <select name="expirationMonth" ng-model="profilePaymentCtrl.newCard.expirationMonth" required>
                        <option value="">Mes</option>
                        <option ng-repeat="month in profilePaymentCtrl.MONTHS" value="{{ $index+1 }}">{{ month }}</option>
                    </select>
                    <select name="expirationYear" ng-model="profilePaymentCtrl.newCard.expirationYear" required>
                        <option value="">Año</option>
                        <option ng-repeat="year in profilePaymentCtrl.availableYears" value="{{ year - 2000 }}">{{ year }}</option>
                    </select>
                    <div class="required-message" ng-show="profilePaymentCtrl.newCardForm.$submitted || (profilePaymentCtrl.newCardForm.expirationMonth.$touched && profilePaymentCtrl.newCardForm.expirationYear.$touched)">
                        <span ng-show="profilePaymentCtrl.newCardForm.expirationMonth.$error.required || profilePaymentCtrl.newCardForm.expirationYear.$error.required">La fecha de expiración es requerida.</span>
                    </div>
                </div>
                <div>
                    <label>Número de validación:</label>
                    <input type="text" name="debitCardValidationNumber" ng-model="profilePaymentCtrl.newCard.debitCardValidationNumber" ng-pattern="/^[0-9]+$/" ng-minlength="3" ng-maxlength="4" maxlength="4" placeholder="Ej. 123" required/>
                    <div class="required-message" ng-show="profilePaymentCtrl.newCardForm.$submitted || profilePaymentCtrl.newCardForm.debitCardValidationNumber.$touched">
                        <span ng-show="profilePaymentCtrl.newCardForm.debitCardValidationNumber.$error.required">El número de validación es requerido.</span>
                        <span ng-show="profilePaymentCtrl.newCardForm.debitCardValidationNumber.$error.pattern">El número de validación no es válido.</span>
                        <span ng-show="profilePaymentCtrl.newCardForm.debitCardValidationNumber.$error.minlength || profilePaymentCtrl.newCardForm.debitCardNumber.$error.maxlength">El número de validación no es válido</span>
                    </div>
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input type="text" name="phoneNumber" ng-model="profilePaymentCtrl.newCard.phoneNumber" ng-pattern="/^[0-9]+$/" ng-minlength="8" ng-maxlength="10" maxlength="10" placeholder="Teléfono" required/>
                    <div class="required-message" ng-show="profilePaymentCtrl.newCardForm.$submitted || profilePaymentCtrl.newCardForm.phoneNumber.$touched">
                        <span ng-show="profilePaymentCtrl.newCardForm.phoneNumber.$error.required">El número de teléfono es requerido.</span>
                        <span ng-show="profilePaymentCtrl.newCardForm.phoneNumber.$error.pattern">El número de teléfono no es válido.</span>
                        <span ng-show="profilePaymentCtrl.newCardForm.phoneNumber.$error.minlength || profilePaymentCtrl.newCardForm.phoneNumber.$error.maxlength">El número de teléfono no es válido</span>
                    </div>
                </div>

            </fieldset>

            <fieldset class="actions">
                <a class="button-blue" ng-click="profilePaymentCtrl.hideNewCard()">cancelar</a>
                <button class="button-blue" ng-disabled="!profilePaymentCtrl.newCardForm.$valid">registrar</button>
            </fieldset>

        </form>
    </div-->

</div>