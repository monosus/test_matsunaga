let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://news-matsu-2021-02.microcms.io/api/v1/news');
xhr.setRequestHeader('X-API-KEY', 'b628bb04-48ce-4e28-aa89-646073b40368');
// curl "https://tsubasa.microcms.io/api/v1/news" -H "X-API-KEY: 40f4566e-fb46-4ed3-ba45-a2c85fbece54"
//$curl "" - H "X-API-KEY: b628bb04-48ce-4e28-aa89-646073b40368"


xhr.onload = () => {
    let newsList = JSON.parse(xhr.response);
    console.log(newsList);
    newsList['contents'].forEach(item => createContents(item));
    function createContents(item) {
        const newsArea = document.getElementById('newsArea');
        const listItem = document.createElement('li');
        listItem.className = 'item';
        listItem.innerHTML = `<p>${item.date}</p><p class="title">${item.title}</p><p>${item.content}</p>`;
        newsArea.appendChild(listItem);
    };
}

xhr.send();