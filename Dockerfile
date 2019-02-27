FROM node:7
RUN mkdir /nodejs-mentoring
ADD . /nodejs-mentoring
WORKDIR /nodejs-mentoring
RUN npm i
EXPOSE 80
CMD ["npm", "express-app"]