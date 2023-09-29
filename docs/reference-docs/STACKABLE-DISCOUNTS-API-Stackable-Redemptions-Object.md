---
title: Stackable Redemptions Object
type: basic
categorySlug: voucherify-api
parentDocSlug: stackable-discounts-api
slug: stackable-redemptions-object
hidden: false
order: 3
---

## Stackable Redemptions Response Body
| Attributes |  Description |
|:-----|:--------|
| redemptions</br>`array` |  |
| parent_redemption</br>`object` | <p>This is an object representing a stacked redemption.</p> <h3>Stacked Redemption</h3><table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique redemption ID.</p> <strong>Example:</strong> <p>r_0bc92f81a6801f9bca</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented by the JSON. This object stores information about the <code>redemption</code>.</p></td></tr><tr><td style="text-align:left">date</br><code>string</code></td><td style="text-align:left"><p>Timestamp in ISO 8601 format indicating when the redemption occured.</p> <strong>Example:</strong> <p>2022-10-03T12:24:58.008Z</p></td></tr><tr><td style="text-align:left">customer_id</br><code>string</code></td><td style="text-align:left"><p>Unique customer ID of the redeeming customer.</p> <strong>Example:</strong> <p>cust_i8t5Tt6eiKG5K79KQlJ0Vs64</p></td></tr><tr><td style="text-align:left">tracking_id</br><code>string</code></td><td style="text-align:left"><p>Hashed customer source ID.</p> <strong>Example:</strong> <p>track_fxEMFiLowFHg==</p></td></tr><tr><td style="text-align:left">metadata</br><code>object</code></td><td style="text-align:left"><p>The metadata object stores all custom attributes in the form of key/value pairs assigned to the redemption.</p></td></tr><tr><td style="text-align:left">result</br><code>string</code></td><td style="text-align:left"><p>Redemption result.</p> Available values: <code>SUCCESS</code>, <code>FAILURE</code></td></tr><tr><td style="text-align:left">order</td><td style="text-align:left"><p>Defines the details of the order that is related to the redemption.</p> See: <a href="#order">Order</a></td></tr><tr><td style="text-align:left">customer</br><code>object</code></td><td style="text-align:left"><p>Defines the customer making the stacked redemption.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>The unique ID of a customer that is assigned by Voucherify.</p> <strong>Example:</strong> <p>cust_eWgXlBBiY6THFRJwX45Iakv4</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Customer's first and last name.</p></td></tr><tr><td style="text-align:left">email</br><code>string</code></td><td style="text-align:left"><p>Customer's email address.</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>The merchant’s customer ID if it is different from the Voucherify customer ID. It is really useful in case of an integration between multiple systems. It can be a customer ID from a CRM system, database or 3rd-party service.</p></td></tr><tr><td style="text-align:left">metadata</br><code>object</code></td><td style="text-align:left"><p>The metadata object stores all custom attributes assigned to the customer. A set of key/value pairs that you can attach to a customer object. It can be useful for storing additional information about the customer in a structured format.</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of object represented is <code>customer</code>.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">related_object_type</br><code>string</code></td><td style="text-align:left"><p>Defines the related object.</p> Available values: <code>redemption</code></td></tr><tr><td style="text-align:left">related_object_id</br><code>string</code></td><td style="text-align:left"><p>Unique related object ID assigned by Voucherify, i.e. r_0c5d07222e08a34ace for a redemption.</p></td></tr><tr><td style="text-align:left">voucher</br><code>null</code></td><td style="text-align:left"></td></tr></tbody></table> |
| order | <p>Contains the order details associated with the redemption.</p> See: [Order](#order) |
## Order
| Attributes |  Description |
|:-----|:--------|
| id</br>`string` | <p>Unique order ID, assigned by Voucherify.</p> **Example:** <p>ord_OLWs41pBk7VFn6ZTyX9U6keh</p> |
| source_id</br>`string` | <p>The merchant’s order ID if it is different from the Voucherify order ID. It is really useful in case of integration between multiple systems. It can be an order ID from CRM, database or 3rd party service.</p> |
| created_at</br>`string` | <p>Timestamp representing the date and time when the order was created in ISO 8601 format.</p> **Example:** <p>2022-10-06T11:40:48.705Z</p> |
| updated_at</br>`string` | <p>Timestamp representing the date and time when the order was updated in ISO 8601 format.</p> **Example:** <p>2022-10-06T11:47:20.760Z</p> |
| status</br>`string` | <p>Order status.</p> Available values: `CREATED`, `PAID`, `CANCELED`, `FULFILLED` |
| amount</br>`integer` | <p>Order amount before applying any discount.</p> |
| discount_amount</br>`integer` | <p>Sum of all order-level discounts applied to the order.</p> |
| items_discount_amount</br>`integer` | <p>Sum of all product-specific discounts applied to the order.<br><code>sum(items, i =&gt; i.discount_amount)</code></p> |
| total_discount_amount</br>`integer` | <p>Sum of all order-level AND all product-specific discounts applied to the order.<br><code>total_discount_amount</code> = <code>discount_amount</code> + <code>items_discount_amount</code></p> |
| total_amount</br>`integer` | <p>Order amount after applying all the discounts.<br><code>total_amount</code> = <code>amount</code> - <code>total_discount_amount</code></p> |
| applied_discount_amount</br>`integer` | <p>This field shows the sum of all order-level discounts applied.</p> |
| items_applied_discount_amount</br>`integer` | <p>Sum of all product-specific discounts applied.<br><code>sum(items, i =&gt; i.applied_discount_amount)</code></p> |
| total_applied_discount_amount</br>`integer` | <p>Sum of all order-level AND all product-specific discounts applied to the order.<br><code>total_applied_discount_amount</code> = <code>applied_discount_amount</code> + <code>items_applied_discount_amount</code></p> |
| items</br>`array` | <p>Array of order items that have been applied to the order. Each order item can show the effects of particular discounts on the item-level.</p> Array of: <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>The type of object represented by JSON. This object stores information about the <code>order_item</code>.</p></td></tr><tr><td style="text-align:left">product_id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the product and is assigned by Voucherify.</p> <strong>Example:</strong> <p>prod_5h0wc453_1</p></td></tr><tr><td style="text-align:left">sku_id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the SKU and is assigned by Voucherify.</p> <strong>Example:</strong> <p>sku_prod_5h0wc453_1_1</p></td></tr><tr><td style="text-align:left">quantity</br><code>integer</code></td><td style="text-align:left"><p>Quantity of the item in the cart.</p></td></tr><tr><td style="text-align:left">amount</br><code>integer</code></td><td style="text-align:left"><p>Represents a total pre-discount amount of order item (<code>price</code> * <code>quantity</code>).</p></td></tr><tr><td style="text-align:left">discount_amount</br><code>integer</code></td><td style="text-align:left"><p>The item-level discount applied to the item.</p></td></tr><tr><td style="text-align:left">applied_discount_amount</br><code>integer</code></td><td style="text-align:left"><p>The item-level discount applied to the item.</p></td></tr><tr><td style="text-align:left">price</br><code>integer</code></td><td style="text-align:left"><p>Unit price of an item. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p></td></tr><tr><td style="text-align:left">subtotal_amount</br><code>integer</code></td><td style="text-align:left"><p>Final order item amount after the applied item-level discount.  If there are no item-level discounts applied, this item is equal to the <code>amount</code>.<br><code>subtotal_amount</code>=<code>amount</code>-<code>discount_amount</code></p></td></tr><tr><td style="text-align:left">product</br><code>object</code></td><td style="text-align:left"><p>This object stores more information about the related product.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the product and is assigned by Voucherify.</p> <strong>Example:</strong> <p>prod_5h0wc453_1</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>A unique product identifier from your inventory system.</p> <strong>Example:</strong> <p>illy-arabica</p></td></tr><tr><td style="text-align:left">name</br><code>string</code></td><td style="text-align:left"><p>Product name.</p> <strong>Example:</strong> <p>Brewing System</p></td></tr><tr><td style="text-align:left">price</br><code>integer</code></td><td style="text-align:left"><p>Unit price of a product. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p></td></tr></tbody></table></td></tr><tr><td style="text-align:left">sku</br><code>object</code></td><td style="text-align:left"><p>This object stores more information about the related SKU.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>A unique identifier that represents the SKU and is assigned by Voucherify.</p> <strong>Example:</strong> <p>sku_prod_5h0wc453_1_1</p></td></tr><tr><td style="text-align:left">source_id</br><code>string</code></td><td style="text-align:left"><p>A unique SKU identifier from your inventory system.</p> <strong>Example:</strong> <p>illy-arabica-250g</p></td></tr><tr><td style="text-align:left">sku</br><code>string</code></td><td style="text-align:left"><p>SKU name.</p></td></tr><tr><td style="text-align:left">price</br><code>integer</code></td><td style="text-align:left"><p>Unit price of a SKU. Value is multiplied by 100 to precisely represent 2 decimal places. For example, $100 is written as 10000.</p></td></tr></tbody></table></td></tr></tbody></table> |
| metadata</br>`object` | <p>The metadata object stores all custom attributes assigned to the order. A set of key/value pairs that are att to an order object. Stores additional information about the order in a structured format.</p>  |
| customer</br>`object` | <p>Object containing information about the customer that is making the purchase.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique customer ID of the customer making the purchase.</p> <strong>Example:</strong> <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of object represented by the <code>customer</code> object.</p></td></tr></tbody></table> |
| referrer</br>`object` | <p>Object containing information about the referrer.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">id</br><code>string</code></td><td style="text-align:left"><p>Unique referrer ID, who referred the customer making the purchase.</p> <strong>Example:</strong> <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p></td></tr><tr><td style="text-align:left">object</br><code>string</code></td><td style="text-align:left"><p>Type of object represented by the <code>referrer</code> object.</p></td></tr></tbody></table> |
| customer_id</br>`string` | <p>Unique customer ID of the customer making the purchase.</p> **Example:** <p>cust_7iUa6ICKyU6gH40dBU25kQU1</p> |
| referrer_id</br>`string` | <p>Unique referrer ID.</p> **Example:** <p>cust_nM4jqPiaXUvQdVSA6vTRUnix</p> |
| object</br>`string` | <p>The type of object represented by JSON. This object stores information about the <code>order</code>.</p> |
| redemptions | <p>Lists details related to the redemption</p> See: [Stacked Redemption](#stacked-redemption) |
## Stacked Redemption
| Attributes |  Description |
|:-----|:--------|
| redemption_ID</br>`object` | <p>The property name is the unique parent redemption ID; i.e. <code>r_0ba186c4824e4881e1</code>. This object contains information about the redemption of multiple incentives.</p> <table><thead><tr><th style="text-align:left">Attributes</th><th style="text-align:left">Description</th></tr></thead><tbody><tr><td style="text-align:left">date</br><code>string</code></td><td style="text-align:left"><p>Timestamp representing the date and time when the redemption was created in ISO 8601 format.</p> <strong>Example:</strong> <p>2022-09-02T17:06:56.649Z</p></td></tr><tr><td style="text-align:left">related_object_type</br><code>string</code></td><td style="text-align:left"><p>The source of the incentive.</p></td></tr><tr><td style="text-align:left">related_object_id</br><code>string</code></td><td style="text-align:left"><p>Unique ID of the parent redemption.</p> <strong>Example:</strong> <p>r_0ba186c4824e4881e1</p></td></tr><tr><td style="text-align:left">stacked</br><code>array</code></td><td style="text-align:left"><p>Contains a list of unique IDs of child redemptions, which belong to the stacked incentives.</p></td></tr></tbody></table> |

[block:html]
{
  "html": "<style>\n[title=\"Toggle library\"] { \n  display: none; }\n.LanguagePicker-divider { \n  display: none; }\n.Playground-section3VTXuaYZivJK > .APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.LanguagePicker-languages1qVVo_v6AlP9 {\n  display: none; }\n.headline-container-article-info2GaOf2jMpV0r {\n  display: none; }\n.APISectionHeader3LN_-QIR0m7x {\n  display: none; }\n.APIResponseSchemaPicker-label3XMQ9E-slNcS {\n  display: none; }\n.PlaygroundC7DInM9NFvBg {\n  display: none; }\n.Modal-Header3VPrQs3MUWWd {\n  display: none; }\n.rm-ReferenceMain .rm-Article {\n  max-width: 2000px; }\n</style>"
}
[/block]