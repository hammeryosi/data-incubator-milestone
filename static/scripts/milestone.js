var data = null,
    gotData = false,
    plotWidth;


$(document).ready(function() {
	var plt = $('#plot-panel');
    plotWidth = plt.width();
	plt.hide();
	setDefTimes();

	$('#milestone-form').submit(function (event) {
        event.preventDefault();
        var stock = $('#stock-input').val(),
            date1 = $('#date1').val(),
            date2 = $('#date2').val();

        var checkList = ['open', 'close', 'high', 'low'],
            fields = [];
        for (var i in checkList) {
            if (document.getElementById(checkList[i] + "-checkbox").checked) {
                fields.push(checkList[i]);
            }
        }

        plt.show();
        plotWidth = plt.width();

        $.post($SCRIPT_ROOT + '/get_stock_data',
            {'stock': stock, 'date1': date1, 'date2': date2,
            'fields': fields.join(','), 'plot-width': plotWidth},
            function (res) {
                var result = res.result;
                data = result.data;
                gotData = true;
                plt.empty().append(result.div)
                plt.append(result.script)
            });
    });
});


var setDefTimes = function() {
    var d = new Date();
    var month = d.getMonth()+1;
	var day = d.getDate();
	var output = d.getFullYear() + '-' +
    	(month<10 ? '0' : '') + month + '-' +
    	(day<10 ? '0' : '') + day;
	$('#date2').val(output);
	d.setMonth(d.getMonth() - 1);
	var month = d.getMonth()+1;
	var day = d.getDate();
		output = d.getFullYear() + '-' +
    	(month<10 ? '0' : '') + month + '-' +
    	(day<10 ? '0' : '') + day;
	$('#date1').val(output);
};

$(window).resize(function() {
    if (gotData) {
        var plt = $('#plot-panel');
        var width = plt.width();
        $.post($SCRIPT_ROOT + '/redraw_graph',
            {'data': data, 'plot-width': width},
        function (res) {
            var result = res.result;
            plt.empty().append(result.div);
            plt.append(result.script);
        })
    }
});


