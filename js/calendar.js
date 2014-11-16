(function(elem, host, params, template) {

    var LIMIT = 5;
    var baseUrl = '//' + host;
    var area = 'area/' + params.areaID;

    function fetch() {
        var url = baseUrl + '/api1/' + area + '/events.jsonp';
        var script = document.createElement("script");
        script.type = 'text/javascript';
        var callbackName = 'calendarCallback' +
            ('' + Math.random()).substring(2);
        window[callbackName] = response;
        script.src = url + '?callback=' + callbackName;
        document.head.appendChild(script);
    }

    function response(res) {
        render(filter(res.data));
    }

    function filter(data) {
        var i = 0;
        return data.filter(function(event) {
            return !event.deleted && ++i < LIMIT;
        })
    }

    function render(events) {
        elem.innerHTML = _.template(template, {
            events: events
        });
    }

    render([]);
    fetch();

})(
    document.getElementById('calendar-events'),
    "opentechcalendar.co.uk",
    { areaID: 40 },
    document.getElementById('calendar-template').innerHTML
);
