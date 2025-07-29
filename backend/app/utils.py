import json

def load_json_data(file_path):
    with open(file_path, "r", encoding="utf-8") as f:  # <-- specify encoding
        return json.load(f)
    
def filter_data_by_topic(data, topic):
    return [item for item in data if item.get('topic') == topic]

def calculate_average_impact(data):
    impacts = [item['impact'] for item in data if item.get('impact') is not None]
    return sum(impacts) / len(impacts) if impacts else 0

def get_unique_sectors(data):
    return set(item['sector'] for item in data if item.get('sector'))