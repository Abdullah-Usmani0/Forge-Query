const modelSchema = [
    {
        "model": "res.partner",
        "description": "This is the model used to store partners, customers, and suppliers. It contains information like the partner's name, contact information, and customer/supplier status.",
        "fields": [
            { "name": "name", "description": "The name of the partner." },
            { "name": "email", "description": "Email address of the partner." },
            { "name": "phone", "description": "Phone number of the partner." },
            { "name": "customer_rank", "description": "Indicates if the partner is a customer." },
            { "name": "supplier_rank", "description": "Indicates if the partner is a supplier." },
            { "name": "country_id", "description": "Country of the partner." }
        ]
    },
    {
        "model": "res.users",
        "description": "This model contains information about the users in your Odoo system.",
        "fields": [
            { "name": "login", "description": "The login ID of the user." },
            { "name": "name", "description": "The name of the user." },
            { "name": "email", "description": "Email address of the user." }
        ]
    },
    {
        "model": "account.move",
        "description": "This model is used to store all accounting entries. It's especially important for financial reporting.",
        "fields": [
            { "name": "name", "description": "The reference of the move." },
            { "name": "date", "description": "The date of the move." },
            { "name": "amount_total", "description": "The total amount." },
            { "name": "partner_id", "description": "The partner involved." },
            { "name": "move_type", "description": "The type of the move (invoice, bill, etc.)." }
        ]
    },
    {
        "model": "sale.order",
        "description": "This model stores information about sales orders and the individual lines within those orders. It's key for sales analysis.",
        "fields": [
            { "name": "name", "description": "The name of the sales order." },
            { "name": "date_order", "description": "The date of the order." },
            { "name": "amount_total", "description": "The total amount of the order." },
            { "name": "partner_id", "description": "The customer who placed the order." },
            { "name": "state", "description": "The status of the order." }
        ]
    },
    {
        "model": "sale.order.line",
        "description": "",
        "fields": [
            { "name": "product_id", "description": "The product sold in the order line." },
            { "name": "product_uom_qty", "description": "The quantity of the product in the order line." }
        ]
    },
    {
        "model": "purchase.order",
        "description": "This model stores information about purchase orders and the individual lines within those orders. They're important for purchase analysis.",
        "fields": [
            { "name": "name", "description": "The name of the purchase order." },
            { "name": "date_order", "description": "The date of the order." },
            { "name": "amount_total", "description": "The total amount of the order." },
            { "name": "partner_id", "description": "The supplier from whom the order was placed." },
            { "name": "state", "description": "The status of the order." }
        ]
    },
    {
        "model": "purchase.order.line",
        "description": "",
        "fields": [
            { "name": "product_id", "description": "The product purchased in the order line." },
            { "name": "product_qty", "description": "The quantity of the product in the order line." }
        ]
    },
    {
        "model": "stock.move",
        "description": "These models are crucial for inventory management and analysis.",
        "fields": [
            { "name": "product_id", "description": "The product involved in the move, picking, or quant." },
            { "name": "product_uom_qty", "description": "The quantity of the product." },
            { "name": "location_id", "description": "The source location." },
            { "name": "location_dest_id", "description": "The destination location." },
            { "name": "state", "description": "The status of the move or picking." }
        ]
    },
    {
        "model": "stock.picking",
        "description": "These models are crucial for inventory management and analysis.",
        "fields": [
            { "name": "product_id", "description": "The product involved in the move, picking, or quant." },
            { "name": "product_uom_qty", "description": "The quantity of the product." },
            { "name": "location_id", "description": "The source location." },
            { "name": "location_dest_id", "description": "The destination location." },
            { "name": "state", "description": "The status of the move or picking." }
        ]
    },
    {
        "model": "stock.quant",
        "description": "These models are crucial for inventory management and analysis.",
        "fields": [
            { "name": "product_id", "description": "The product involved in the move, picking, or quant." },
            { "name": "product_uom_qty", "description": "The quantity of the product." },
            { "name": "location_id", "description": "The source location." },
            { "name": "location_dest_id", "description": "The destination location." },
            { "name": "state", "description": "The status of the move or picking." }
        ]
    },
    {
        "model": "crm.lead",
        "description": "This model is used to store data about leads and opportunities in the CRM module.",
        "fields": [
            { "name": "name", "description": "The name of the lead or opportunity." },
            { "name": "partner_id", "description": "The partner linked to this lead." },
            { "name": "probability", "description": "The probability to convert the lead into an opportunity." },
            { "name": "stage_id", "description": "The stage of the lead or opportunity." },
            { "name": "expected_revenue", "description": "The expected revenue from this lead or opportunity." }
        ]
    },
    {
        "model": "project.project",
        "description": "These models are used for project management and can provide insights into project progress and productivity.",
        "fields": [
            { "name": "name", "description": "The name of the project or task." },
            { "name": "user_id", "description": "The user assigned to the project or task." },
            { "name": "date_start", "description": "The start date of the project or task." },
            { "name": "date_end", "description": "The end date of the project or task." },
            { "name": "stage_id", "description": "The stage or status of the project or task." }
        ]
    },
    {
        "model": "project.task",
        "description": "",
        "fields": [
            { "name": "priority", "description": "The priority of the task." },
            { "name": "project_id", "description": "The project that the task belongs to." }
        ]
    },
    {
        "model": "product.product",
        "description": "These models store information about the products sold or purchased.",
        "fields": [
            { "name": "name", "description": "The name of the product." },
            { "name": "list_price", "description": "The sale price of the product." },
            { "name": "standard_price", "description": "The cost of the product." },
            { "name": "type", "description": "The type of the product (storable, consumable, or service)." },
            { "name": "qty_available", "description": "The quantity on hand for the product." },
            { "name": "virtual_available", "description": "The forecasted quantity for the product." }
        ]
    },
    {
        "model": "product.template",
        "description": "",
        "fields": []
    },
    {
        "model": "mail.message",
        "description": "These models store information about communications and activities, useful for analyzing user engagement.",
        "fields": [
            { "name": "subject", "description": "The subject of the message or activity." },
            { "name": "date", "description": "The date of the message or activity." },
            { "name": "author_id", "description": "The user who authored the message or activity." },
            { "name": "res_model", "description": "The model related to the message or activity." },
            { "name": "res_id", "description": "The ID of the record related to the message or activity." }
        ]
    },
    {
        "model": "mail.activity",
        "description": "",
        "fields": [
            { "name": "activity_type_id", "description": "The type of the activity." }
        ]
    }
]


export default modelSchema;