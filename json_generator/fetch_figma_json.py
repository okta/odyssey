#!/usr/bin/env python3

import os
import requests
import json
import matplotlib

current_dir = os.path.dirname(os.path.realpath(__file__))
output_dir = os.path.join(current_dir, 'output')

access_token = '49003-1feca536-8f09-482b-8f13-214009e4fec6'
figma_id = 'eACEns0vxN6DqP2MKLZ0NI'


def fetch_data(token, file_id):
    response = requests.get('https://api.figma.com/v1/files/' + file_id, headers={'X-Figma-Token': token})
    if response.status_code != 200:
        raise Exception('file was not found failed to fetch, status {}'.format(response.status_code))
        
    tree_structure = response.json()
    colors_node = None
    for node in tree_structure['document']['children'][0]['children']:
        if node['name'] == 'colors':
            for panel_node in node['children']:
                if panel_node['name'] == 'color':
                    colors_node = panel_node
                    break
                    
    colors_obj = {}
    for node in colors_node['children']:
        # first item is the prefix, second is the name. Ex: ['success', 'base']
        name_parts = node['name'].split('-')
        if name_parts[0] not in colors_obj:
            colors_obj[name_parts[0]] = {}
        if len(name_parts) > 1:
            colors_obj[name_parts[0]][name_parts[1]] = convert_argb_to_hex(node['fills'][0]['color'])
        else:
            colors_obj[name_parts[0]] = convert_argb_to_hex(node['fills'][0]['color'])
            
    print(colors_obj)
    save_to_file('colors.json', output_dir, colors_obj)
    
    
def convert_argb_to_hex(color_values):
    return matplotlib.colors.to_hex([float(color_values['r']), float(color_values['g']), float(color_values['b']), float(color_values['a'])], keep_alpha=True)
    
    
def save_to_file(file_path, directory, file_contents):
    if not os.path.exists(directory):
        os.makedirs(directory)
        
    with open(os.path.join(directory, file_path), 'w') as file_dest:
        file_dest.write(json.dumps(file_contents, indent = 4))
    
    
fetch_data(access_token, figma_id)
