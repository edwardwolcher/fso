URI=$(grep MONGODB_URI .env | xargs)
heroku config:set ${URI}
