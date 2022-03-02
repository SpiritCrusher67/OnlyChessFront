FROM node
ENV NODE_ENV=production
WORKDIR /front

COPY . .
RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]
