const querySchema = {
    "dashboard": {
        "name": "string",
        "visualization_ids": [
            {
                "dashboard_id": "integer",
                "visualization_id": "integer",
                "position_x": "integer",
                "position_y": "integer",
                "width": "integer",
                "height": "integer"
            }
        ],
        "layout": "string",
        "allowed_user_ids": [
            "integer"
        ],
        "allowed_group_ids": [
            "integer"
        ]
    },
    "data_source": {
        "name": "string",
        "connection_type": "string",
        "external_db_type": "string",
        "current_odoo_database": "boolean",
        "host": "string",
        "port": "integer",
        "database": "string",
        "username": "string",
        "password": "string",
        "table_ids": [
            {
                "data_source_id": "integer",
                "name": "string",
                "description": "string",
                "field_ids": [
                    {
                        "table_id": "integer",
                        "name": "string",
                        "field_type": "string",
                        "is_dimension": "boolean",
                        "is_measure": "boolean"
                    }
                ]
            }
        ]
    },
    "visualization": {
        "name": "string",
        "description": "string",
        "data_source_id": "integer",
        "table_id": "integer",
        "table_filter": "string",
        "join_ids": [
            {
                "name": "string",
                "visualization_id": "integer",
                "source_table_id": "integer",
                "destination_table_id": "integer",
                "source_field_id": "integer",
                "source_field_id_relation": "string",
                "destination_field_id": "integer",
                "destination_field_id_relation": "string",
                "join_type": "string"
            }
        ],
        "field_ids": [
            "integer"
        ],
        "query_type": "string",
        "query": "string",
        "chart_type": "string",
        "x_axis_field_id": "integer",
        "y_axis_field_id": "integer",
        "filter_ids": [
            {
                "visualization_id": "integer",
                "field_id": "integer",
                "filter_type": "string",
                "filter_value": "string",
                "filter_value_2": "string"
            }
        ],
        "metric_ids": [
            {
                "visualization_id": "integer",
                "aggregate_function": "string",
                "field_id": "integer"
            }
        ],
        "group_by_ids": [
            "integer"
        ],
        "sort_by_ids": [
            "integer"
        ],
        "result_limit": "integer",
        "result_offset": "integer"
    }
}

export default querySchema;