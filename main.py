from flask import Flask, render_template, send_file, request
import time
import json
from module.school import School

with open('./key.txt', 'r') as f:
    key = f.readline()
    f.close()

app = Flask(__name__)

@app.route('/')
def mainmenu():
    return render_template('mainmenu.html')
@app.route('/file/<path:path>')
def file(path):
    return send_file(f'./file/{path}')

@app.route('/api/<string:name>')
def api_meal(name):
    if name == 'meal':
        date = request.args.get('day',time.strftime('%Y%m%d',time.localtime(time.time())))
        data = School.getMeal(date, key)
    elif name == 'schedule':
        date = request.args.get('day',time.strftime('%Y%m%d',time.localtime(time.time())))
        grade = request.args.get('grade',1)
        class_ = request.args.get('class',1)
        data = School.getSchedule(grade,class_,date, key)
    return json.dumps(data)

@app.route('/login')
def login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)