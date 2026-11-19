FROM node:26.13.1-alpine AS base
RUN npm install --global yarn@1.22.22

FROM base AS build
WORKDIR /build
COPY package.* yarn.lock /build/
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM base AS prod
WORKDIR /app
COPY package.* yarn.lock /app/
RUN yarn install --frozen-lockfile --production
COPY --from=build /build/dist /app/dist
CMD yarn prod
