# hotel_crm
# **Page of hotel**
***
# Project setup
## If you haven`t installed Vue.js install it running this command
```
npm install -g @vue/cli
```
## If you installed Vue.js, or you already have it, move to another steps
***
## Step 1: installing project
### Clone a repository
```
git clone https://github.com/FryMondo/hotel_crm.git
```
***
# Running an application
## Step 1: run server
### Move to directory "server"
```
cd src/server 
```
### Now run server
```
node server.js
```
***
## Step 2: run application
```
npm run serve
```
***
## Configuring a Database
### Step 1: Go to the "server.js" file and configure the settings for your database (lines 14-19)
```
const db = mysql.createConnection({
    host: 'localhost', (input your host)
    user: 'root', (input your user)
    password: 'password', (input your password)
    database: 'hotel_crm' (name of your database)
});
```
***
# Done :)