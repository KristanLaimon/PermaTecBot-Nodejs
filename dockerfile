FROM node:22

RUN useradd --create-home permabot
WORKDIR /home/permabot/
COPY --chown=permabot: . .
RUN npm install

USER permabot
EXPOSE 443 80 88 8443

CMD ["npm", "start"]
