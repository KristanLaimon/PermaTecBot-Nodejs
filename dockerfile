FROM node:22

RUN useradd --create-home permabot
WORKDIR /home/permabot/
COPY . . 
RUN npm install

EXPOSE 443 80 88 8443

USER permabot
CMD ["npm", "start"]
