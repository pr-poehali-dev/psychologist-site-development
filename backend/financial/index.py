import json
import os
from typing import Dict, Any, List
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для работы с финансовыми отчетами
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with attributes: request_id, function_name
    Returns: HTTP response dict with financial data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database connection not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    
    if method == 'GET':
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute('''
            SELECT id, date, operation_type, amount, description, category, created_at
            FROM financial_reports
            ORDER BY date DESC, created_at DESC
        ''')
        reports = cursor.fetchall()
        
        for report in reports:
            if report['date']:
                report['date'] = report['date'].isoformat()
            if report['created_at']:
                report['created_at'] = report['created_at'].isoformat()
            if report['amount']:
                report['amount'] = float(report['amount'])
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'reports': reports}),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        date = body_data.get('date')
        operation_type = body_data.get('operation_type')
        amount = body_data.get('amount')
        description = body_data.get('description', '')
        category = body_data.get('category', '')
        
        if not date or not operation_type or not amount:
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing required fields: date, operation_type, amount'}),
                'isBase64Encoded': False
            }
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute('''
            INSERT INTO financial_reports (date, operation_type, amount, description, category)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id, date, operation_type, amount, description, category, created_at
        ''', (date, operation_type, amount, description, category))
        
        new_report = cursor.fetchone()
        conn.commit()
        
        if new_report['date']:
            new_report['date'] = new_report['date'].isoformat()
        if new_report['created_at']:
            new_report['created_at'] = new_report['created_at'].isoformat()
        if new_report['amount']:
            new_report['amount'] = float(new_report['amount'])
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'report': new_report}),
            'isBase64Encoded': False
        }
    
    if method == 'DELETE':
        params = event.get('queryStringParameters', {})
        report_id = params.get('id')
        
        if not report_id:
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing id parameter'}),
                'isBase64Encoded': False
            }
        
        cursor = conn.cursor()
        cursor.execute('DELETE FROM financial_reports WHERE id = %s', (report_id,))
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True}),
            'isBase64Encoded': False
        }
    
    conn.close()
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
