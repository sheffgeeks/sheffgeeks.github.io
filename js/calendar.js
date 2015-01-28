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
            event._id = i;
            return !event.deleted && ++i < LIMIT;
        }).map(function(event) {
            var start = moment(event.start.timestamp * 1000);
            if (start.isBefore(moment().add(7, 'd'))) {
                event.badgeStart = start.calendar();
            }
            event.organiser = event.summaryDisplay.slice(0, event.summaryDisplay.lastIndexOf(event.summary) - 2);
            if (event.description.length > 200) {
                var short = event.description.substring(0, 200);
                event.short = short.substring(0, short.lastIndexOf(' ')) + '...';
            } else {
                event.short = event.description;
            }
            event.short = event.short.replace('&nbsp;', ' ').replace('&amp;', '&');
            return event;
        });
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
