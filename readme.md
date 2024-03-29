<h1>Alberta Vipassana Foundation tax receipt app</h1>

This is a single-page react app created for the Alberta Vipassana Foundatoin. This project was created by Robbie Prokop.

This repository is built using React, SCSS, Axios, Redux, React-Dom, React-Router-Dom, and React-Toastify in the front end. For the backend I used NodeJS, ExpressJS, MOngoDB, and mongoose. I tried to make the code fairly modularized and use current industry "best practices" as I understand them. A big stretch goal of mine is to eventually get 80% + test coverage.

<!-- add demo gif here  -->
<!-- ## Demo

![](https://github.com/RobbieProkop/robbie-prokop_launchpad-react-code-challenge/blob/master/frontend/public/demo-gif.gif) -->

## Dashboard

<img src="https://github.com/RobbieProkop/vipassana-receipts/blob/master/frontend/public/dashboard.png" />

## Add Receipt Form

<img src="https://github.com/RobbieProkop/vipassana-receipts/blob/master/frontend/public/form.png" />

## Receipt Item

<img src="https://github.com/RobbieProkop/vipassana-receipts/blob/master/frontend/public/receipt-item.png" />

## Delete Confirmation

<img src="https://github.com/RobbieProkop/vipassana-receipts/blob/master/frontend/public/delete-confirmation.png" />

## Setup

To setup, please install all the dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## To do list

- change databse from MongoDB to MySQL or PostgreSQL
- add ability to manually change receiptNumber
- add filtering system to only display x number of receipts unless if you scroll down and click "load more" button.
- error sometimes appears where the receiptNumber does not increment properly. Make it so the next receiptNumber is the previous one + 1;
