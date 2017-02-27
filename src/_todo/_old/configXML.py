
import json
import re


with open('package.json') as f:
    json_data = json.load(f)
    version = json_data['version']

with open('build/config.xml', 'r+') as f:
    content = f.read()
    f.seek(0)
    f.truncate()
    content = re.sub(
        'version="[0-9\.]+"',
        'version="{}"'.format(version),
        content
    )

    f.write(content)
