from flask import Flask, render_template, \
    redirect, request, jsonify
import stocks

app = Flask(__name__)

@app.route('/')
def main():
    return redirect('/index')

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/get_stock_data', methods=['POST'])
def getStockData():
    stock = request.form['stock']
    startDate = request.form['date1']
    endDate = request.form['date2']
    width = int(float(request.form['plot-width']))
    fields = request.form['fields'].split(',')
    data, script, div = stocks.createPlotFromWeb(stock, startDate,
                                                 endDate, fields, width)
    return jsonify(result={'data': data,
                           'script': script,
                           'div': div})

if __name__ == '__main__':
    app.run(host='0.0.0.0')
