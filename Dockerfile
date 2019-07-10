FROM node:10

WORKDIR /

COPY data/ /data/

RUN npm install

EXPOSE 8080

CMD ["node index.js"]
