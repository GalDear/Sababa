FROM node:14

WORKDIR /usr/share/
COPY . .

VOLUME /usr/share/

CMD [ "npm", "start"]

#For debugging
# docker run -it -p 8081:8081 -v ~/git_wa/HIT/Sababa/react_app/:/usr/share/j flask_app_server sh