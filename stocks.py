import quandl
from bokeh.plotting import figure
from bokeh.embed import components
import pandas as pd

quandl.ApiConfig.api_key = '115daC9Bm9f12ogqipdx'


def getData(stock, startDate, endDate, fields):
    return quandl.get_table("WIKI/PRICES",
                          qopts={"columns":["ticker", "date"] + fields},
                          ticker=[stock],
                          date={'gte': startDate, 'lte': endDate})

def createPlotFromWeb(stock, startDate, endDate, fields, width):
    if fields == ['']:
        return ('', '', 'select a field..')
    data = getData(stock, startDate, endDate, fields)
    if len(data) == 0:
        return ('', '', 'Did not find any data, <br>' +
                        'try changing ticker name or time range..')
    x = data['date']
    cols = ['black', 'orange', 'green', 'blue']
    p = figure(title=stock, x_axis_type="datetime", plot_width=width)
    p.toolbar.active_drag = None
    for f in fields:
        p.line(x, y=data[f], legend=f, color=cols[fields.index(f)])
        p.circle(x, y=data[f], legend=f, color=cols[fields.index(f)])
    script, div = components(p)
    return data.to_json(), script, div

def createPlotFromData(dat, width):
    data = pd.read_json(dat).sort_values('date')
    fields = list(set(data.columns).difference({'ticker', 'date'}))
    stock = data['ticker'][0]
    x = data['date']
    cols = ['black', 'orange', 'green', 'blue']
    p = figure(title=stock, x_axis_type="datetime", plot_width=width)
    p.toolbar.active_drag = None
    for f in fields:
        p.line(x, y=data[f], legend=f, color=cols[fields.index(f)])
        p.circle(x, y=data[f], legend=f, color=cols[fields.index(f)])
    script, div = components(p)
    return script, div