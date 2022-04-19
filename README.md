# node-strike

# TODO:
## Get Events Filters
OData supported operators:

logical operators: Or, And, Equal, GreaterThan, GreaterThanOrEqual, LessThan, LessThanOrEqual
arithmetic operators: None
functions: None
OData filtering syntax can be seen here. Ordering syntax can be seen here.

Query Parameters
$filter string
Filter the results using OData syntax. Supported properties: created, eventType, deliverySuccess

$orderby string
Order the results using OData syntax. Supported properties: created

$skip number
Skip the specified number of entries

$top number
Get the top X number of records. Default value: 50. Max value: 100

## Get Invoices Filters 
Required scopes:

partner.invoice.read

OData supported operators:

logical operators: Or, And, Equal
arithmetic operators: None
functions: None
OData filtering syntax can be seen here. Ordering syntax can be seen here.

Query Parameters
$filter string
Filter the results using OData syntax. Supported properties: invoiceId, created, currency, state, issuerId, receiverId, payerId, correlationId

$orderby string
Order the results using OData syntax. Supported properties: created

$skip number
Skip the specified number of entries

$top number
Get the top X number of records. Default value: 50. Max value: 100