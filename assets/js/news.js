const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('6542bf4ba03b48c9aa0e37edaae83b6f');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.topHeadlines({
  sources: 'bbc-news',
  language: 'en'
}).then(news => {
    news['articles'].forEach(item => console.log(item.title));
});