import os
import json
import pandas as pd
from flask import Flask, request, render_template

from functions import get_coordinates


REGION_TITLE = 'Регион'
FIRST_TITLE = 'Социо'
SECOND_TITLE = 'Экономика'
THIRD_TITLE = 'Экология'


app = Flask(__name__)
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        f = request.files['file']
        data_xls = pd.read_excel(f)
        data = json.loads(data_xls.to_json(force_ascii=False))

        dots = [] 
        for i in data[REGION_TITLE]:
            first = data[FIRST_TITLE][i]
            second = data[SECOND_TITLE][i]
            third = data[THIRD_TITLE][i]

            x, y, z = get_coordinates(first, second, third)

            dots.append({'id': int(i)+1,
                         'region': data[REGION_TITLE][i],
                         'x': x, 'y': y, 'z': z,})

        return render_template('prism.html', dots=dots,
                               first_title=FIRST_TITLE,
                               second_title=SECOND_TITLE,
                               third_title=THIRD_TITLE)

    return render_template('index.html')


if __name__ == '__main__':
    if os.name == 'posix':
        os.system('xdg-open http://127.0.0.1:8080')
    elif os.name == 'nt':
        os.system('start http://127.0.0.1:8080')

    app.run(host='127.0.0.1', port=8080)
