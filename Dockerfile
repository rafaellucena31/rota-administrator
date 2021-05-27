# ---- Base Node ----
FROM node:14
WORKDIR /usr/src/app/
COPY package.json ./
COPY . .
RUN npm install

# Will be done by ci/cd -> NODE_ENV: aws
ENV NODE_ENV aws

ARG VAR_URL_BASE_ROTA='https://clava.io/api'
ARG VAR_URL_BASE_AUTH='https://api.auth.io'
ARG VAR_PATH_AUTHORIZATION='/authorization'
ARG VAR_PATH_AUTHENTICATION='/authentication'

ENV URL_BASE_ROTA $VAR_URL_BASE_ROTA
ENV URL_BASE_AUTH $VAR_URL_BASE_AUTH
ENV PATH_AUTHORIZATION $VAR_PATH_AUTHORIZATION
ENV PATH_AUTHENTICATION $VAR_PATH_AUTHENTICATION


EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

RUN "/usr/src/app/replaceAwsEnvFile.sh"
RUN npm run build
CMD ["npm", "run", "start"]

