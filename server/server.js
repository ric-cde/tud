const express = require('express');
const bodyParser = require('body-parser');
const e = require('express');
const port = 3000;
const hostname = "localhost";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function parseArticles (articleList) {
    return articleList.map(article => {
        let articleProperties = [];
        for (let key in article) {
            articleProperties.push(`<strong>${key}:</strong> <mark>${article[key]}</mark>`);
        }
        return articleProperties.join(', ');
    }).join('<br />');
}

app.get('/articles', (req, res) => {
    res.send(articles);
    // res.send(parseArticles(articles));
});

app.get('/article/:num', (req, res) => {
    for (let article of articles) {
        if (article.articleID == req.params.num) {
            res.send(article);
        }
    }
})

app.delete('/article/:num', (req, res) => {
    let foundArticle = articles.filter(article => article.articleID == req.params.num);
    if (foundArticle == false) {
        console.log("Error, article not found.");
        res.send("Error, article not found");
        return;
    } else {
        articles = articles.filter(article => article.articleID != req.params.num);
        console.log("Article deleted.")
        console.log("Updating article list...");
        res.send(articles);
    }
})

app.post('/article', (req, res) => {
    let newArticle = req.body;
    console.log(req.body);
    articles.push(newArticle);
    res.send(articles);
});

app.listen(port, hostname, () => {
    console.log(`Server started on http://${hostname}:${port}/articles`)
})

let articles = [
    {
        articleID: "1",
        articleName: "Paul\'s Article",
    },
    {
        articleID: "2",
        articleName: "Jason\'s Article",
    },
    {
        articleID: "3",
        articleName: "Sophie\'s Article",
    },
]