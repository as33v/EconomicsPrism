import json
import pandas as pd
from flask import Flask, request, render_template

from functions import get_coordinates


REGION_TITLE    = 'Регион'
SOCIAL_TITLE    = 'Социо'
ECONOMICS_TITLE = 'Экономика'
ECOLOGICS_TITLE = 'Экология'


app = Flask(__name__)
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        f = request.files['file']
        data_xls = pd.read_excel(f)
        data = json.loads(data_xls.to_json(force_ascii=False))

        dots = [] 
        for i in data[REGION_TITLE]:
            social = data[SOCIAL_TITLE][i]
            economics = data[ECONOMICS_TITLE][i]
            ecologics = data[ECOLOGICS_TITLE][i]

            x, y, z = get_coordinates(social, economics, ecologics)

            dots.append({'id': int(i)+1,
                         'region': data[REGION_TITLE][i],
                         'x': x, 'y': y, 'z': z,})

        return render_template('prism.html', dots=dots,
                               social_title=SOCIAL_TITLE,
                               economics_title=ECONOMICS_TITLE,
                               ecologics_title=ECOLOGICS_TITLE)

    return render_template('index.html')

