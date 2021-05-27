#!/bin/sh
if [ ! -z "$URL_BASE_ROTA" ]; then 
    sed -i "s,VAR_URL_BASE_ROTA,$URL_BASE_ROTA,g" .env.aws
fi

if [ ! -z "$URL_BASE_AUTH" ]; then 
    sed -i "s,VAR_URL_BASE_AUTH,$URL_BASE_AUTH,g" .env.aws
fi

if [ ! -z "$PATH_AUTHORIZATION" ]; then 
    sed -i "s,VAR_PATH_AUTHORIZATION,$PATH_AUTHORIZATION,g" .env.aws
fi

if [ ! -z "$PATH_AUTHENTICATION" ]; then 
    sed -i "s,VAR_PATH_AUTHENTICATION,$PATH_AUTHENTICATION,g" .env.aws
fi