export const Keywords_template = `
Using the given question with their domains including "construction: building and infrastructure," "real estate: property and housing," and "restaurants: culinary establishments," 
Extract key words relating to model names from the given question.

Question={Question}

Here are some examples of the question and the extracted words:
Question: Which properties were sold last year?
words:properties, sold

Question: Which properties were sold on the 20th of April 2017?
words:properties, sold

Question: Which property has the lowest standard price?
words: property, lowest standard price

Question: what were the top selling properties in the last month?
words: property, selling, sold.

Question: Which employees have the highest billable hours for a specific project?
words: employees, billable, hours, project


Only return the keywords. Dont return the domain
Final output should be in JSON format.
`;



export const TableNames_template = `
Using the given schema, answer questions with their domains including "construction: building and infrastructure," "real estate: property and housing," and "restaurants: culinary establishments," the LLM model is designed to answer questions for similar words, even if they are not explicitly present in the schema.
The model can infer from the question which parts of the schema can be used to provide relevant model names. The objective is to return only the relevant model names in JSON format.
(Don't print the domain)

Here are some examples of the question and the exact returned models:
Question: Which properties were sold last year?
models : sale.order, sale.order.line.

Question: Which properties were sold on the 20th of April 2017?
models : sale.order, sale.order.line.

Question: Which property has the lowest standard price?
models : product.product.

Schema= {schema}
Real Question = {Question}

Do not make up your own model names, only use model names from the schema.
If the question pertains to sales, revenue, marketing, customers or analytics , only return the relevant model names from the given vschema in JSON format, no explanations.


Final output should be in JSON format.
`;



////-------------------------------------------------

export const Date_template = `
Tables names={table_names}
schema= {schema}

Using the given schema, answer questions with their domains including "construction: building and infrastructure," "real estate: property and housing," and "restaurants: culinary establishments," the LLM model is designed to answer questions for similar words, even if they are not explicitly present in the schema.
The model can infer from the question which parts of the schema can be used to provide relevant model names.

Provide the start and end dates based on the requirements of a question involving the date field.

If the question asks for a duration like year, bi-yearly, quarterly, etc., use the given start date to determine the corresponding end date and return both dates in JSON format.
If a specific date is provided, use it as both the start and end date.

If the question does not involve a date field then return in JSON format = message: The question does not require a date field.

All outputs should be in JSON format.

Question: {Question}
Start Date: {start_date}

Here are some examples of questions and their output start and end date that you should take guidance from:
-----------------------------------------------------------------
Question: Which properties were sold last year?
StartDate: 2023-06-10
EndDate: 2022-06-10

Question: How many properties were sold in the last month?
StartDate: 2023-06-10
EndDate: 2023-05-10

Question: Which properties were sold in the last 2 quarters?
StartDate: 2023-06-10
EndDate: 2023-0-10

Question: How many properties were sold on December 12 2018?
StartDate: 2018-12-12
EndDate: 2018-12-12

Question: How many properties were sold between February 20th 2019 and April 15th 2020?
StartDate: 2019-02-20
EndDate: 2020-04-15

Question: How many properties were sold between 2018-04-25 and 2020-07-10?
StartDate: 2018-04-25
EndDate: 2020-07-10
----------------------------------------------------------------

Always return specific date values.
Return in JSON format = StartDate: [date], EndDate: [date].
Don't return the question.
`;




export const SQL_template = `
 Tables names={table_names}
 schema= {schema}

Using the given schema, answer questions with their domains including "construction: building and infrastructure," "real estate: property and housing," and "restaurants: culinary establishments," the LLM model is designed to answer questions for similar words, even if they are not explicitly present in the schema.
The model can infer from the question which parts of the schema can be used to provide relevant model names. The objective is to return an sql query statement using only the table names provided.

Use the given fields for the tabels:
Tables with fields={tables_with_fields}


If the question involves a date field, just write start date and end date where appropriate in the SQL query.

Here are some examples of  questions and their corresponding SQL queries that you should take guidance from:

Question: Which properties were sold last year?
SQL Query:SELECT *
FROM sale.order.line
JOIN sale.order ON sale.order.line.order_id = sale.order.order_id
WHERE sale.order.date_order between end_date and start_date;

Question: how many properties were sold last month?
SQL Query:SELECT COUNT(DISTINCT sale.order.line.order_id ) AS total_products_sold
FROM sale.order.line
JOIN sale.order ON sale.order.line.order_id = sale.order.order_id
WHERE sale.order.date_order between end_date and start_date;

Question: How many properties were sold last year?
SQL Query:SELECT COUNT(DISTINCT sale.order.line.order_id ) AS total_products_sold
FROM sale.order.line
JOIN sale.order ON sale.order.line.order_id = sale.order.order_id
WHERE sale.order.date_order between end_date and start_date;

Question: How many properties were sold in the last 2 quarters?
SQL Query:SELECT COUNT(DISTINCT sale.order.line.order_id ) AS total_products_sold
FROM sale.order.line
JOIN sale.order ON sale.order.line.order_id = sale.order.order_id
WHERE sale.order.date_order between end_date and start_date;

Question: How many properties were sold on 7th July 2019?
SQL Query:SELECT COUNT(DISTINCT sale.order.line.order_id ) AS total_products_sold
FROM sale.order.line
JOIN sale.order ON sale.order.line.order_id = sale.order.order_id
WHERE sale.order.date_order between end_date and start_date;

Question: Which property has the highest list price?
SQL Query:SELECT *
FROM product.product
ORDER BY list_price DESC
LIMIT 1;"

Question: Which employees have the highest billable hours for a specific project?
SQL Query: SELECT *
FROM hr.employee
JOIN project.task ON hr.employee.id = project.task.employee_id
WHERE project.task.project_id = 'specific_project_id'
ORDER BY hr.employee.hourly_cost DESC
LIMIT 1;

Important: Dont make up your own table and field names in the sql query. Use Exactly the same model names in the sql query as in the schema.
Only use the given fields.
Only print the SQL QUERY

  Question = {Question}

`;


export const ChartType_template = `
 SQL Query={SQL}
 Question= {Question}

 Using the given SQL query and the Question, determine the most appropriate chart type for its data representation.
 Choose from one of the following:
1) Bar Chart
2) Line Chart
3) Pie Chart
4) Doughnut Chart
5) Polar Area Chart
6) Scatter Chart
7) Bubble Chart
8) Radar Chart

Return in JSON format.
`;


export const ChartTitle_template = `
 SQL Query={SQL}
 Question= {Question}
 Chart Type= {ChartType}
 Using the given SQL query, the Question and the chart type, to determine an appropriate title for its chart.
 
Return in JSON format.
`;