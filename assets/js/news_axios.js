
var html = '';
var NEWSARRAY = [];
var ORDERED_NEWSARRAY = [];
var RE_ORDERED_NEWSARRAY = [];

function compareDateOrder(a, b) {
    var r = 0;
    if (new Date(a.date).getTime() < new Date(b.date).getTime()) { r = -1; }
    else if (new Date(a.date).getTime() > new Date(b.date).getTime()) { r = 1; }

    return r;
}

function compareDateReOrder(b, a) {
    var r = 0;
    if (new Date(a.date).getTime() < new Date(b.date).getTime()) { r = -1; }
    else if (new Date(a.date).getTime() > new Date(b.date).getTime()) { r = 1; }

    return r;
}

getJSON = function () {
    axios.get('https://news-matsu-2021-02.microcms.io/api/v1/news', { headers: { 'X-API-KEY': 'b628bb04-48ce-4e28-aa89-646073b40368' } })
        .then(function (response) {
            console.log(response);
            console.log(response.data.contents)
            var data = response.data.contents;
            NEWSARRAY = data;
            fillNews(data);
        })
    axios.get('https://news-matsu-2021-02.microcms.io/api/v1/news?orders=publishedAt', { headers: { 'X-API-KEY': 'b628bb04-48ce-4e28-aa89-646073b40368' } })
        .then(function (response) {
            ORDERED_NEWSARRAY = response.data.contents;;
        })
    axios.get('https://news-matsu-2021-02.microcms.io/api/v1/news?orders=-publishedAt', { headers: { 'X-API-KEY': 'b628bb04-48ce-4e28-aa89-646073b40368' } })
        .then(function (response) {
            RE_ORDERED_NEWSARRAY = response.data.contents;;
        })
}
getJSON();

fillNews = function (data) {
    html = '';
    for (var i = 0, l = data.length; i < l; i++) {
        var _day = new Date(data[i].date);
        console.log(_day.getTime());
        html += `<p> ${_day.getFullYear()}.${_day.getMonth() + 1}.${_day.getDate()} </p>`;
        html += `<p> ${data[i].title} </p>`;
        html += ` ${data[i].content} `;
    }
    var ulbody = document.getElementById('newsArea');
    ulbody.innerHTML = '';
    ulbody.innerHTML = html;
}

fillNewsByDate = function (e, order) {
    console.log('click', e.currenttarget);
    var data = NEWSARRAY;
    data.sort(order);
    fillNews(data);
}


eventFunctions = function () {
    var buttonOrder = document.getElementById('order');
    var buttonreOrder = document.getElementById('reorder');
    // buttonOrder.addEventListener('click', function (e) { fillNewsByDate(e, compareDateOrder) }, false);
    // buttonreOrder.addEventListener('click', function (e) { fillNewsByDate(e, compareDateReOrder) }, false);
    buttonOrder.addEventListener('click', function (e) { fillNews(ORDERED_NEWSARRAY) }, false);
    buttonreOrder.addEventListener('click', function (e) { fillNews(RE_ORDERED_NEWSARRAY) }, false);
}

document.addEventListener('DOMContentLoaded', eventFunctions(), false);