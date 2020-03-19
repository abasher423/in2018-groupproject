# IN2018 Group Project
## Resources for team members
* [Moodle Page](https://bit.ly/36a0hXo)
* [Project brief](https://bit.ly/37mVsvj)
* [Calendar](https://bit.ly/2RBC32O)

### Set up guide
Use  `git clone` to download this repository after that run `npm install` in both the client and the server directories to install dependencies. 

Make sure to also create a nodemon.json file in the server directory and add Mongo Atlas address there in the following format:

```
{
    "env": {
        "MONGO_ATLAS_ADDR": MONGO_ADDRESS
    }
}
```

### Running
To start the client run `npm start` in the client directory and to start the server use the same command in the server directory. 