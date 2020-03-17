FROM node:12
WORKDIR /opt/app

COPY package*.json ./
COPY lerna.json ./

COPY packages/client/package*.json ./packages/client/
COPY packages/server/package*.json ./packages/server/

RUN npm ci --ignore-scripts --production --no-optional
RUN npx lerna bootstrap --ci --hoist --ignore-scripts -- --production --no-optional

COPY . .
# RUN cd packages/alice && npm run build

CMD [ "node", "packages/server/src/index.js" ]
