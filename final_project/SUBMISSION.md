# IBM Express Book Review – submission evidence

Run `npm install` and `npm start` from `final_project` before executing these commands. Results below were recorded against the included sample data. `127.0.0.1` refers to the running local server.

## Question 1 — githubrepo

**Not completed:** The original IBM repository was cloned, not forked to the student's GitHub account. After forking, run:

```bash
curl -s https://api.github.com/repos/YOUR_GITHUB_USERNAME/expressBookReviews
```

The output must identify `fork: true` and the IBM parent repository. Do not submit a fabricated fork result.

## Question 2 — getallbooks

```bash
curl -s http://127.0.0.1:5000/
```

```json
{"1":{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}},"2":{"author":"Hans Christian Andersen","title":"Fairy tales","reviews":{}},"3":{"author":"Dante Alighieri","title":"The Divine Comedy","reviews":{}},"4":{"author":"Unknown","title":"The Epic Of Gilgamesh","reviews":{}},"5":{"author":"Unknown","title":"The Book Of Job","reviews":{}},"6":{"author":"Unknown","title":"One Thousand and One Nights","reviews":{}},"7":{"author":"Unknown","title":"Njál's Saga","reviews":{}},"8":{"author":"Jane Austen","title":"Pride and Prejudice","reviews":{}},"9":{"author":"Honoré de Balzac","title":"Le Père Goriot","reviews":{}},"10":{"author":"Samuel Beckett","title":"Molloy, Malone Dies, The Unnamable, the trilogy","reviews":{}}}
```

## Question 3 — getbooksbyISBN

```bash
curl -s http://127.0.0.1:5000/isbn/1
```
```json
{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}
```

## Question 4 — getbooksbyauthor

```bash
curl -s http://127.0.0.1:5000/author/Unknown
```
```json
{"4":{"author":"Unknown","title":"The Epic Of Gilgamesh","reviews":{}},"5":{"author":"Unknown","title":"The Book Of Job","reviews":{}},"6":{"author":"Unknown","title":"One Thousand and One Nights","reviews":{}},"7":{"author":"Unknown","title":"Njál's Saga","reviews":{}}}
```

## Question 5 — getbooksbytitle

```bash
curl -s http://127.0.0.1:5000/title/Things%20Fall%20Apart
```
```json
{"1":{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}}
```

## Question 6 — getbookreview

```bash
curl -s http://127.0.0.1:5000/review/1
```
```json
{}
```
The starter database has no initial reviews, so the correct initial result is an empty object.

## Question 7 — register

```bash
curl -s -X POST http://127.0.0.1:5000/register -H 'Content-Type: application/json' -d '{"username":"student1","password":"pass123"}'
```
```json
{"message":"User successfully registered. Now you can login"}
```

## Question 8 — login

```bash
curl -s -c cookies.txt -X POST http://127.0.0.1:5000/customer/login -H 'Content-Type: application/json' -d '{"username":"student1","password":"pass123"}'
```
```json
{"message":"User successfully logged in"}
```

## Question 9 — reviewadded

```bash
curl -s -b cookies.txt -X PUT 'http://127.0.0.1:5000/customer/auth/review/1?review=Excellent%20book'
```
```json
{"message":"Review added/updated successfully","reviews":{"student1":"Excellent book"}}
```

## Question 10 — deletereview

```bash
curl -s -b cookies.txt -X DELETE http://127.0.0.1:5000/customer/auth/review/1
```
```json
{"message":"Review deleted successfully","reviews":{}}
```

## Question 11 — general.js GitHub URL

After committing and pushing to your own public GitHub fork, submit:

`https://github.com/YOUR_GITHUB_USERNAME/expressBookReviews/blob/main/final_project/router/general.js`

Replace the placeholder only after confirming the URL opens the real file.
