# RotaAdministrator

## Steps to Run

1. Clone the project git clone https://github.com/rafaellucena31/rota-administrator.git
2. cd rota-administrator
3. npm install
4. npm run dev

## Steps to build docker File
1. chmod +x replaceAwsEnvFile.sh
2. docker build --tag sparota:1.0 . (without customize Variables Enviroment)
3. docker run --publish 80:3000 --detach --name sparota sparota:1.0
4. http://localhost
5. docker rm --force sparota (stop and remove)

You can customize Variables Enviroment. For you ci/cd for example or tests...
docker build 
--build-arg VAR_URL_BASE_ROTA=https://clava.io/api/v2
--build-arg VAR_URL_BASE_AUTH=https://clava.io/api/v2/auth 
--build-arg VAR_PATH_AUTHORIZATION=authorization
--build-arg VAR_PATH_AUTHENTICATION=authentication -t .

Link to project online: https://rota-administrator.herokuapp.com/login
## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
