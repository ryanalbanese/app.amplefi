/*
 * Map Template & Facepage - v1.0.0
 * Developed for Amplefi, LLC
 * Developed and maintanined by Ryan Albanese
 */
// AJAX Table Request and Page Generation -- Clears All Dynamic Data Before Reloading
var getTable = function () {
    $.getJSON("https://test.amplefi.co/generator_tables?&callback=?", {
            client_id: client_id,
            form_id: form_id,
            key_id: key_id,
        },
        function (data) {
			$(".append-title").empty();
            $(".append-title").append('<div class="content-title"><p>Hospital In Focus</p></div>');
			$(".compare-buton").empty();
			$(".compare-button").append('<a id="" class="compare" href="'+key_id+'">Compare Hospital</a>');
            $.each(data.tables, function (i, item) {
                if (item.status == 'ok') {
                    $(".compare-button").show();					
                    $(".append-title").show();
                    $("#split-table").show();
                    if (item.type == 'header') {
                        $.each(item.row, function (e, item) {
                            $(".append-head").append('<th width="" >' + item.col + '</th>');
                        });
                    }
                    if (item.type == 'data') {
                        $.each(item.row, function (e, item) {
                            $(".append-data").append('<td>' + item.col + '</td>');
                        });
                    }
                }
            });
        });
}

// AJAX Chart Request and Page Generation -- Dynamically Creates Script Tags and Inserts in the DOM
var buildCharts = function(){
    function addCode(code) {
        var JS = document.createElement('script');
        JS.text = code;
        document.body.appendChild(JS);
    }
    $.getJSON("https://test.amplefi.co/generator_charts?&callback=?", {
            client_id: client_id,
            form_id: form_id,
            key_id: key_id,
            format: "json"
        },
        function (data) {
            if (data.status == "ok") {
                $(".append-chart-title").append('<div class="content-title"><p>Charting</p></div>');
                $(".append-chart-title").show();
                $.each(data.charts, function (i, item) {
                    $(".append-charts").append('<div id="' + item.id + '" style="min-width: 300px; width: 90%;height: 400px; margin-left: auto; margin-right: auto;margin-top: 40px;"></div><div class="content-title"><p></p></div>');
                    $(".load-container").hide();
                    addCode(item.func);
                });
            } else {
                $(".chart-failure").fadeIn(500);
                $(".load-container").hide();
            }
        });
}
$(document).on('click', ".compare", function(e) {
	event.preventDefault();
	window.location.hash = $(this).attr('href');
});
$(window).on('hashchange', function() {
	 $.getJSON("https://test.amplefi.co/generator_tables?&callback=?", {
            client_id: client_id,
            form_id: form_id,
            key_id: (location.hash.replace("#","")),
        },
        function (data) {
			$(".append-title").empty();
            $(".append-title").append('<div class="content-title"><p>Hospital In Focus</p></div>');
			$(".compare-buton").empty();
			$(".compare-button").append('<a id="" class="compare" href="'+key_id+'">Compare Hospital</a>');
            $.each(data.tables, function (i, item) {
                if (item.status == 'ok') {
                    $(".compare-button").show();					
                    $(".append-title").show();
                    $("#split-table").show();
                    if (item.type == 'header') {
                        $.each(item.row, function (e, item) {
                            $(".append-head").append('<th width="" >' + item.col + '</th>');
                        });
                    }
                    if (item.type == 'data') {
                        $.each(item.row, function (e, item) {
                            $(".append-data").append('<td>' + item.col + '</td>');
                        });
                    }
                }
            });
        });
	function addCode(code) {
        var JS = document.createElement('script');
        JS.text = code;
        document.body.appendChild(JS);
    }
    $.getJSON("https://test.amplefi.co/generator_charts?&callback=?", {
            client_id: client_id,
            form_id: form_id,
            key_id: (location.hash.replace("#","")),
            format: "json"
        },
        function (data) {
            if (data.status == "ok") {
                $(".append-chart-title").append('<div class="content-title"><p>Charting</p></div>');
                $(".append-chart-title").show();
                $.each(data.charts, function (i, item) {
                    $(".append-charts").append('<div id="' + item.id + '" style="min-width: 300px; width: 90%;height: 400px; margin-left: auto; margin-right: auto;margin-top: 40px;"></div><div class="content-title"><p></p></div>');
                    $(".load-container").hide();
                    addCode(item.func);
                });
            } else {
                $(".chart-failure").fadeIn(500);
                $(".load-container").hide();
            }
        });
});