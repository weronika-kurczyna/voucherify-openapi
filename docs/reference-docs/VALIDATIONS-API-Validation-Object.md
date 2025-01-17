---
title: Validation Object
type: basic
categorySlug: voucherify-api
parentDocSlug: validations-api
slug: validation-object
hidden: false
order: 3
---

## Vouchers Validate Response Body
Any of:

[Valid Voucher](#valid-voucher), [Invalid Voucher](#invalid-voucher)

## Valid Voucher
| Attributes |  Description |
|:-----|:--------|
| valid</br>`boolean` | <p>Indicates whether the voucher is valid within the context of the parameters provided in the request body.</p> |
| code</br>`string` | <p>Voucher code.</p> |
| applicable_to | <p>Contains list of items that qualify in the scope of the discount. These are definitions of included products, SKUs, and product collections. These can be discounted.</p> See: [Applicable To Result List](#applicable-to-result-list) |
| inapplicable_to | <p>Contains list of items that do not qualify in the scope of the discount. These are definitions of excluded products, SKUs, and product collections. These CANNOT be discounted.</p> See: [Inapplicable To Result List](#inapplicable-to-result-list) |
| campaign</br>`string` | <p>Voucher's parent campaign name.</p> |
| campaign_id</br>`string` | <p>Voucher's parent campaign's unique ID.</p> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the code. A set of key/value pairs that you can attach to a voucher object. It can be useful for storing additional information about the voucher in a structured format.</p> |
| discount | Any of: [Amount](#amount), [Unit](#unit), [Unit Multiple](#unit-multiple), [Percent](#percent), [Fixed](#fixed) |
| gift</br>`object` | <p>Contains current gift card balance information.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">amount</br><code>number</code></td><td style="text-align:left"><p>Total gift card income over the lifetime of the card. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p></td></tr><tr><td style="text-align:left">balance</br><code>number</code></td><td style="text-align:left"><p>Available funds. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 amount is written as 10000.</p></td></tr><tr><td style="text-align:left">effect</br><code>string</code></td><td style="text-align:left"><p>Defines how the credits are applied to the customer's order.</p> Available values: <code>APPLY_TO_ORDER</code>, <code>APPLY_TO_ITEMS</code></td></tr></tbody></table> |
| loyalty</br>`object` | <p>Contains the cost of reward in points.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">points_cost</br><code>number</code></td><td style="text-align:left"><p>Number of points that wlil be deducted from loyaty card for the associated reward.</p></td></tr></tbody></table> |
| reward</br>`object` | <p>Contains information about the reward that is being validated.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique reward ID assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">assignment_id</br><code>string</code></td><td style="text-align:left"><p>Unique reward assignment ID assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">points</br><code>number</code></td><td style="text-align:left"><p>Number of points applied to the reward.</p></td></tr></tbody></table> |
| order</br>`object` | <p>This is an object representing an order with calculated discounts applied using the voucher code.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique order ID, assigned by Voucherify. This parameter is returned only if you use the order ID parameter of an already created and synced order in the Voucherify application, i.e by sending the order.id parameter in the request body.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>The merchant’s order ID if it is different from the Voucherify order ID. It is really useful in case of integration between multiple systems. It can be an order ID from CRM, database or 3rd party service. This parameter is returned only if you use the order ID parameter of an already created and synced order in the Voucherify application, i.e by sending the order.id parameter in the request body.</p></td></tr><tr><td style="text-align:left">created_at</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the order was created in ISO 8601 format. This parameter is returned only if you use the order ID parameter of an already created and synced order in the Voucherify application, i.e by sending the order.id parameter in the request body.</p></td></tr><tr><td style="text-align:left">updated_at</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the order was updated in ISO 8601 format. This parameter is returned only if you use the order ID parameter of an already created and synced order in the Voucherify application, i.e by sending the order.id parameter in the request body.</p></td></tr><tr><td style="text-align:left">status</br><code>string</code></td><td style="text-align:left"><p>Order status. This parameter is returned if you use the order ID parameter of an already created and synced order in the Voucherify application, i.e by sending the order.id parameter in the request body or if you send the request body parameter when defining an order in the request body. This parameter can be passed but it's not required for validation at all. It's used in the redemption process. Normally after the redemption is done, the order is automatically to a PAID status. To avoid such default behaviour, the user can pass any of the other status options and it will be set the order status after the redemption instead of the default PAID.</p> Available values: <code>CREATED</code>, <code>PAID</code>, <code>CANCELED</code>, <code>FULFILLED</code></td></tr><tr><td style="text-align:left">amount</br><code>number</code></td><td style="text-align:left"><p>Order amount before applying any discount.</p></td></tr><tr><td style="text-align:left">initial_amount</br><code>number</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">discount_amount</br><code>number</code></td><td style="text-align:left"><p>Sum of all order-level discounts applied to the order.</p></td></tr><tr><td style="text-align:left">applied_discount_amount</br><code>number</code></td><td style="text-align:left"><p>This field shows the order-level discount applied.</p></td></tr><tr><td style="text-align:left">items_discount_amount</br><code>number</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">total_discount_amount</br><code>number</code></td><td style="text-align:left"><p>Sum of all order-level discounts.</p></td></tr><tr><td style="text-align:left">total_amount</br><code>number</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">items_applied_discount_amount</br><code>number</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">total_applied_discount_amount</br><code>number</code></td><td style="text-align:left"><p>This field sums up all order-level discounts applied to the order.</p></td></tr><tr><td style="text-align:left">items</br><code>array</code></td><td style="text-align:left">Array of <a href="#order-item">Order Item</a></td></tr><tr><td style="text-align:left">metadata</br><code>object</code></td><td style="text-align:left"><p>The metadata object stores all custom attributes assigned to the order. A set of key/value pairs that are att to an order object. Stores additional information about the order in a structured format.</p></td></tr><tr><td style="text-align:left">customer</br><code>string</code></td><td style="text-align:left"><p>Object containing information about the customer that is making the purchase.</p></td></tr><tr><td style="text-align:left">customer_id</br><code>string</code></td><td style="text-align:left"><p>Unique customer ID of the customer making the purchase.</p></td></tr><tr><td style="text-align:left">referrer</td><td style="text-align:left"><p>Object containing information about the referrer.</p> See: <a href="#referrer">Referrer</a></td></tr><tr><td style="text-align:left">referrer_id</br><code>string,null</code></td><td style="text-align:left"><p>Unique referrer ID.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented by JSON. This object stores information about the order.</p> Available values: <code>order</code></td></tr><tr><td style="text-align:left">redemptions</td><td style="text-align:left">See: <a href="#order-redemptions">Order Redemptions</a></td></tr></tbody></table> |
| session | <p>Schema model for session lock object. The session object contains information about the session key that was used to establish a session between multiple parallel validation and redemption requests.</p> See: [Session](#session) |
| start_date</br>`string` | <p>Activation timestamp defines when the voucher starts to be active in ISO 8601 format. Voucher is inactive before this date.</p> |
| expiration_date</br>`string` | <p>Expiration timestamp defines when the voucher expires in ISO 8601 format. Voucher is inactive after this date.</p> |
| tracking_id</br>`string` | <p>Hashed order source ID.</p> |

## Invalid Voucher
| Attributes |  Description |
|:-----|:--------|
| valid</br>`boolean` | <p>Indicates whether the voucher is valid within the context of the parameters provided in the request body.</p> |
| code</br>`string` | <p>Voucher code.</p> |
| error</br>`object` | <p>Detailed failure cause for the invalid voucher if the reason has a translation defined in the Dashboard → Project Settings → Error Messages.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">code</br><code>number</code></td><td style="text-align:left"><p>Voucher code.</p></td></tr><tr><td style="text-align:left">key</br><code>string</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">message</br><code>string</code></td><td style="text-align:left"><p>Customized error message.</p></td></tr><tr><td style="text-align:left">details</br><code>string</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">request_id</br><code>string</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">resource_id</br><code>string</code></td><td style="text-align:left"></td></tr><tr><td style="text-align:left">resource_type</br><code>string</code></td><td style="text-align:left"></td></tr></tbody></table> |
| tracking_id</br>`string` | <p>Hashed customer source ID.</p> |
| customer_id</br>`string` | <p>Unique customer ID of the customer making the purchase.</p> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the code. A set of key/value pairs that you can attach to a voucher object. It can be useful for storing additional information about the voucher in a structured format.</p> |
| reason</br>`string` |  |

## Applicable To Result List
| Attributes |  Description |
|:-----|:--------|
| data</br>`array` | <p>Contains array of items to which the discount can apply.</p> Array of [ApplicableTo](#applicableto) |
| total</br>`integer` | <p>Total number of objects defining included products, SKUs, or product collections.</p> |
| object</br>`string` | <p>The type of object represented by JSON.</p> Available values: `list` |
| data_ref</br>`string` | <p>The type of object represented by JSON.</p> Available values: `data` |

## Inapplicable To Result List
| Attributes |  Description |
|:-----|:--------|
| data</br>`array` | <p>Contains array of items to which the discount cannot apply.</p> Array of [InapplicableTo](#inapplicableto) |
| total</br>`integer` | <p>Total number of objects defining included products, SKUs, or product collections.</p> |
| object</br>`string` | <p>The type of object represented by JSON.</p> Available values: `list` |
| data_ref</br>`string` | <p>The type of object represented by JSON.</p> Available values: `data` |

## Amount
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines the type of voucher.</p> Available values: `AMOUNT` |
| amount_off</br>`number` | <p>Amount taken off the subtotal of a price. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 discount is written as 1000.</p> |
| amount_off_formula</br>`string` |  |
| effect | <p>Defines how the discount is applied to the customer's order.</p> See: [Discount Amount Vouchers Effect Types](#discount-amount-vouchers-effect-types) |

## Unit
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Discount type.</p> Available values: `UNIT` |
| unit_off</br>`integer` | <p>Number of units to be granted a full value discount.</p> |
| unit_off_formula</br>`string` |  |
| effect | <p>Defines how the unit is added to the customer's order.</p> See: [Discount Unit Vouchers Effect Types](#discount-unit-vouchers-effect-types) |
| unit_type</br>`string` | <p>The product deemed as free, chosen from product inventory (e.g. time, items).</p> |
| product | <p>Contains information about the product.</p> See: [Simple Product Discount Unit](#simple-product-discount-unit) |
| sku | See: [Simple Sku Discount Unit](#simple-sku-discount-unit) |

## Unit Multiple
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Discount type.</p> Available values: `UNIT` |
| effect</br>`string` | <p>Defines how the discount is applied to the customer's order.</p> Available values: `ADD_MANY_ITEMS` |
| units</br>`array` | Array of [One Unit](#one-unit) |

## Percent
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines the type of voucher.</p> Available values: `PERCENT` |
| percent_off</br>`number` | <p>The percent discount that the customer will receive.</p> |
| percent_off_formula</br>`string` |  |
| amount_limit</br>`number` | <p>Upper limit allowed to be applied as a discount. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $6 maximum discount is written as 600.</p> |
| effect | <p>Defines how the discount is applied to the customer's order.</p> See: [Discount Percent Vouchers Effect Types](#discount-percent-vouchers-effect-types) |
| is_dynamic</br>`boolean` | <p>Flag indicating whether the discount was calculated using a formula.</p> |

## Fixed
| Attributes |  Description |
|:-----|:--------|
| type</br>`string` | <p>Defines the type of voucher.</p> Available values: `FIXED` |
| fixed_amount</br>`number` | <p>Set a fixed valued for an order total or price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 discount is written as 1000. In case of the fixed amount being calculated by the formula, i.e. the fixed_amount_formula parameter is present in the fixed amount definition, this value becomes the fallback value. Such that in a case where the formula cannot be calculated due to missing metadata, for example, this value will be used as the fixed value.</p> |
| fixed_amount_formula</br>`string` |  |
| effect | <p>Defines how the discount is applied to the customer's order.</p> See: [Discount Fixed Vouchers Effect Types](#discount-fixed-vouchers-effect-types) |

## Order Item
| Attributes |  Description |
|:-----|:--------|
| sku_id</br>`string` | <p>A unique SKU ID assigned by Voucherify.</p> |
| product_id</br>`string` | <p>A unique product ID assigned by Voucherify.</p> |
| related_object</br>`string` | <p>Used along with the source_id property, can be set to either sku or product.</p> Available values: `product`, `sku` |
| source_id</br>`string` | <p>The merchant’s product/SKU ID (if it is different from the Voucherify product/SKU ID). It is really useful in case of integration between multiple systems. It can be an ID from an eCommerce site, a database or a 3rd party service.</p> |
| discount_quantity</br>`integer` | <p>Number of dicounted items.</p> |
| initial_quantity</br>`integer` |  |
| quantity</br>`integer` | <p>The quantity of the particular item in the cart.</p> |
| price</br>`number` | <p>Unit price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p> |
| amount</br>`number` | <p>The total amount of the order item (price * quantity).</p> |
| discount_amount</br>`number` | <p>Sum of all order-item-level discounts applied to the order.</p> |
| initial_amount</br>`number` |  |
| applied_discount_amount</br>`number` | <p>This field shows the order-item-level discount applied.</p> |
| subtotal_amount</br>`number` |  |
| product</br>`object` | <p>An object containing details of the related product.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the product and is assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>The merchant’s product ID (if it is different than Voucherify's product ID). It is really useful in case of integration between multiple systems. It can be an ID from an eCommerce site, a database or a 3rd party service.</p></td></tr><tr><td style="text-align:left">override</br><code>boolean</code></td><td style="text-align:left"><p>The override set to true is used to store the product information in the system. If product does not exist, it will be created with the use of source_id; if it does exist, the provided values for the name, price, and metadata will replace those already stored in the system.</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Product name.</p></td></tr><tr><td style="text-align:left">metadata</br><code>object</code></td><td style="text-align:left"><p>A set of custom key/value pairs that you can attach to a product. It can be useful for storing additional information about the product in a structured format.</p></td></tr><tr><td style="text-align:left">price</br><code>number</code></td><td style="text-align:left"><p>Product price. A positive integer in the smallest currency unit (that is, 100 cents for $1.00).</p></td></tr></tbody></table> |
| sku</br>`object` | <p>An object containing details of the related SKU.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the SKU and is assigned by Voucherify.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>The merchant’s SKU ID (if it is different than Voucherify's SKU ID). It is really useful in case of integration between multiple systems. It can be an ID from an eCommerce site, a database or a 3rd party service.</p></td></tr><tr><td style="text-align:left">override</br><code>boolean</code></td><td style="text-align:left"><p>The override set to true is used to store the product information in the system. If product does not exist, it will be created with the use of source_id; if it does exist, the provided values for the name, price, and metadata will replace those already stored in the system.</p></td></tr><tr><td style="text-align:left">sku</br><code>string</code></td><td style="text-align:left"><p>The SKU name.</p></td></tr><tr><td style="text-align:left">price</br><code>number</code></td><td style="text-align:left"><p>SKU price. A positive integer in the smallest currency unit (that is, 100 cents for $1.00).</p></td></tr></tbody></table> |
| object</br>`string` |  |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to an SKU. It can be useful for storing additional information about the SKU in a structured format.</p> |

## Referrer
All of:

1. [Customer](#customer)

## Order Redemptions


## Session
| Attributes |  Description |
|:-----|:--------|
| key</br>`string` | <p>The session unique ID assigned by Voucherify or your own unique session ID. Sending an existing ID will result in overwriting an existing session. If no session key is provided, then a new ID will be generated.</p> Available values: `LOCK` |
| type</br>`string` | <p>This parameter is required to establish a new session. The session locks the redemption quantity by 1.</p> Available values: `LOCK` |
| ttl</br>`number` | <p>Value for the period of time that the session is active. Units for this parameter are defined by the session.ttl_unit parameter.</p> |
| ttl_unit</br>`string` | <p>Defines the type of unit in which the session time is counted.</p> Available values: `DAYS`, `HOURS`, `MICROSECONDS`, `MILLISECONDS`, `MINUTES`, `NANOSECONDS`, `SECONDS` |

## ApplicableTo
| Attributes |  Description |
|:-----|:--------|
| object</br>`string` | <p>This object stores information about the product collection.</p> Available values: `product`, `sku`, `products_collection` |
| id</br>`string` | <p>Unique product collection ID assigned by Voucherify.</p> |
| source_id</br>`string` | <p>The source ID from your inventory system.</p> |
| product_id</br>`string` | <p>Parent product's unique ID assigned by Voucherify.</p> |
| product_source_id</br>`string` | <p>Parent product's source ID from your inventory system.</p> |
| strict</br>`boolean` |  |
| price</br>`number` | <p>New fixed price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, a $10 price is written as 1000. In case of the fixed price being calculated by the formula, i.e. the price_formula parameter is present in the fixed price definition, this value becomes the fallback value. Such that in a case where the formula cannot be calculated due to missing metadata, for example, this value will be used as the fixed price.</p> |
| price_formula</br>`number` | <p>Formula used to calculate the discounted price of an item.</p> |
| quantity_limit</br>`integer` | <p>The maximum number of units allowed to be discounted per order line item.</p> |
| aggregated_quantity_limit</br>`integer` | <p>The maximum number of units allowed to be discounted combined across all matched order line items.</p> |
| effect | <p>Defines how the discount is applied to the customer's order.</p> See: [Applicable To Effect](#applicable-to-effect) |

## InapplicableTo
All of:

1. [ApplicableTo](#applicableto)

## Discount Amount Vouchers Effect Types
Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`, `APPLY_TO_ITEMS_PROPORTIONALLY`, `APPLY_TO_ITEMS_PROPORTIONALLY_BY_QUANTITY`

## Discount Unit Vouchers Effect Types
Available values: `ADD_MISSING_ITEMS`, `ADD_NEW_ITEMS`, `ADD_MANY_ITEMS`

## Simple Product Discount Unit
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique product ID, assigned by Voucherify.</p> |
| source_id</br>`string` | <p>Product's source ID.</p> |
| name</br>`string` | <p>Product name.</p> |

## Simple Sku Discount Unit
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique SKU ID, assigned by Voucherify.</p> |
| source_id</br>`string` | <p>Product variant's source ID.</p> |
| name</br>`string` | <p>Sku name</p> |

## One Unit
| Attributes |  Description |
|:-----|:--------|
| unit_off</br>`number` | <p>Number of units to be granted a full value discount.</p> |
| unit_off_formula</br>`string` |  |
| effect</br>`string` | <p>Defines how the unit is added to the customer's order.</p> Available values: `ADD_NEW_ITEMS`, `ADD_MISSING_ITEMS` |
| unit_type</br>`string` | <p>The product deemed as free, chosen from product inventory (e.g. time, items).</p> |
| product | <p>Contains information about the product.</p> See: [Simple Product Discount Unit](#simple-product-discount-unit) |
| sku | <p>Contains information about the sku.</p> See: [Simple Sku Discount Unit](#simple-sku-discount-unit) |

## Discount Percent Vouchers Effect Types
Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`

## Discount Fixed Vouchers Effect Types
Available values: `APPLY_TO_ORDER`, `APPLY_TO_ITEMS`

## Customer
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>The ID of an existing customer that will be linked to redemption in this request.</p> |
| source_id</br>`string` | <p>A unique identifier of a customer that validates a voucher. It can be a customer ID or email from a CRM system, database or 3rd-party service. If you also pass a customer ID (unique ID assigned by Voucherify), the source ID will be ignored.</p> |
| name</br>`string` | <p>Customer's first and last name.</p> |
| description</br>`string` | <p>An arbitrary string that you can attach to a customer object.</p> |
| email</br>`string` | <p>Customer's email address.</p> |
| phone</br>`string` | <p>Customer's phone number. This parameter is mandatory when you try to send out codes to customers via an SMS channel.</p> |
| birthdate</br>`string` | <p>Customer's birthdate; format YYYY-MM-DD.</p> |
| address</br>`object` | <p>Customer's address.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">city</br><code>string</code></td><td style="text-align:left"><p>City</p></td></tr><tr><td style="text-align:left">state</br><code>string</code></td><td style="text-align:left"><p>State</p></td></tr><tr><td style="text-align:left">line_1</br><code>string</code></td><td style="text-align:left"><p>First line of address.</p></td></tr><tr><td style="text-align:left">line_2</br><code>string</code></td><td style="text-align:left"><p>Second line of address.</p></td></tr><tr><td style="text-align:left">country</br><code>string</code></td><td style="text-align:left"><p>Country.</p></td></tr><tr><td style="text-align:left">postal_code</br><code>string</code></td><td style="text-align:left"><p>Postal code.</p></td></tr></tbody></table> |
| metadata</br>`object` | <p>A set of custom key/value pairs that you can attach to a customer. The metadata object stores all custom attributes assigned to the customer. It can be useful for storing additional information about the customer in a structured format. This metadata can be used for validating whether the customer qualifies for a discount or it can be used in building customer segments.</p> |

## Applicable To Effect
Available values: `APPLY_TO_EVERY`, `APPLY_TO_CHEAPEST`, `APPLY_TO_MOST_EXPENSIVE`

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]
