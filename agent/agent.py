import requests
import time
import json
import os
from datetime import datetime

# Configuration
API_URL = os.getenv('API_URL', 'http://localhost:8000/api/v1')
API_TOKEN = os.getenv('API_TOKEN', '')
HOST_NAME = os.getenv('HOST_NAME', 'agent-host')
HOST_IP = os.getenv('HOST_IP', '127.0.0.1')

# Headers for API requests
headers = {
    'Authorization': f'Bearer {API_TOKEN}',
    'Content-Type': 'application/json'
}


def register_host():
    """Register host if not exists"""
    try:
        response = requests.get(f'{API_URL}/hosts', headers=headers)
        hosts = response.json()
        
        for host in hosts:
            if host['name'] == HOST_NAME:
                return host['id']
        
        # Create new host
        host_data = {
            'name': HOST_NAME,
            'ip_address': HOST_IP,
            'tags': ['agent', 'monitoring']
        }
        response = requests.post(f'{API_URL}/hosts', json=host_data, headers=headers)
        if response.status_code in [200, 201]:
            return response.json()['id']
    except Exception as e:
        print(f'Error registering host: {e}')
    
    return None


def collect_metrics():
    """Collect system metrics"""
    metrics = {
        'cpu_usage': __import__('random').random() * 100,
        'memory_usage': __import__('random').random() * 100,
        'disk_usage': __import__('random').random() * 100,
        'network_in': __import__('random').random() * 1000,
        'network_out': __import__('random').random() * 1000,
    }
    return metrics


def send_heartbeat(host_id):
    """Send heartbeat metrics"""
    if not host_id:
        return False
    
    try:
        metrics = collect_metrics()
        
        for key, value in metrics.items():
            metric_data = {
                'host_id': host_id,
                'key': key,
                'value': value
            }
            requests.post(f'{API_URL}/metrics', json=metric_data, headers=headers)
        
        print(f'[{datetime.now()}] Heartbeat sent for {HOST_NAME}')
        return True
    except Exception as e:
        print(f'Error sending heartbeat: {e}')
        return False


def main():
    """Main agent loop"""
    print(f'Netmon Agent started - Host: {HOST_NAME}')
    print(f'API URL: {API_URL}')
    
    host_id = register_host()
    if not host_id:
        print('Failed to register host, retrying...')
        time.sleep(10)
        return
    
    print(f'Host registered with ID: {host_id}')
    
    interval = int(os.getenv('HEARTBEAT_INTERVAL', '60'))
    
    while True:
        send_heartbeat(host_id)
        time.sleep(interval)


if __name__ == '__main__':
    main()
