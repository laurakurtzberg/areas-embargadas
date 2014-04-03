import csv
from flask import Flask
from flask import render_template
app = Flask(__name__)

i = 0

csv_path = './static/csv/areas-embargadas-test.csv'
csv_obj = csv.DictReader(open(csv_path, 'r'))
csv_list = list(csv_obj)
csv_dict = dict([[o['numero_tad'], o] for o in csv_list])

@app.route("/")
def index():
    return render_template('main.html',
        object_list=csv_list,
    )

@app.route('/state/<number>')
def state(number):
    return render_template('detail.html',
        object=number
    )

@app.route('/<number>/')
def detail(number):
    return render_template('detail.html',
        object=csv_dict[number],
    )

if __name__ == '__main__':
    app.run(
        host="0.0.0.0",
        port=8000,
        use_reloader=True,
        debug=True,
    )
