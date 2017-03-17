var data;


$(document).ready(function() {
	var plt = $('#plot-panel'),
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

        $.post($SCRIPT_ROOT + '/get_stock_data',
            {'stock': stock, 'date1': date1, 'date2': date2,
            'fields': fields.join(','), 'plot-width': plotWidth},
            function (res) {
                data = res.result;
                $('#plot-panel').empty().append(data.div)
                $('#plot-panel').append(data.script)
                $('#plot-panel').show()
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


