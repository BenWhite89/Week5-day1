Lab 18: Return of the Chirps: A New Angle

Covalence

Info/Setup

This project will be building on project 1
Copy your package.json and client and server folders to this project folder
Make sure this project folder has a .gitignore file with an entry for node_modules
Run npm install on this project to install all your dependencies you need
You should already have html files in your client folder for welcome, list, single view, and single update
You will be transitioning this site to use AngularJS
Objectives

In your Express server code, remove all the route handlers for client routes (non-API routes)
Make sure you are statically serving the client folder
Rename index.html to welcome.html
Create an index.html file in the client folder, bringing in the AngularJS and angular routing scripts from a CDN
Also bring in a new JS file you are going to create called app.js
Create an Angular application as demonstrated in class. You should use routing. Specifically, the following routes should exist:
/: show welcome page
/chirps: show list page
/chirps/some_id: show single view page
/chirps/some_id/update: show single update page
Remember, when you set up a route, you need to specify the html page to show, and the controller to make active
The controller for the welcome page can be empty for now. We may add functionality in later.
The controller for the list page should make two GET requests to the API for all chirps and all users
When you get the chirps back, they should be shown on the screen as before, but this time using ng-repeat!
Chirps should link to the single view for that chirp when clicked upon
Use ng-repeat to populate the options of the user select box
The controller for the single chirp page should make a GET request to the API for the single chirp
Use bindings to make the data show on the screen
Clicking the delete button should make a DELETE request to the server and redirect back to the list page when successful
The controller for the update chirp page should make a GET request to the API for the single chirp
The message of the chirp should be placed in the input box in the view using data binding
When the update button is clicked, rely on data-binding to get the new message and send the PUT request to the server
When the server indicates a successful update, redirect back to the single page or the list page
Tips/Hints

Remember, the html files for the views only need the html for the content of that page.
DO NOT have the <html>, <head>, <body> tags. etc. Basically, only include what would normally be within the body tags.
Your index.html will be the full html file, with script and stylesheet imports.
To succeed in this lab, you need to understand $scope, data-binding, ng-repeat, ng-click, $http, and angular routing.