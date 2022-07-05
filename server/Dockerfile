FROM python:3.8-alpine
COPY requirements.txt requirements.txt

RUN apk --update add openssl ca-certificates py-openssl wget
RUN apk --update add --virtual build-dependencies libffi-dev openssl-dev build-base \
  && pip install --upgrade pip \
  && pip install -r requirements.txt \
  && apk del build-dependencies
WORKDIR /usr/share/

COPY . .
VOLUME /usr/share/

CMD [ "python3", "/usr/share/server.py"]

#For debugging
# docker run -it -p 8081:8081 -v ~/git_wa/HIT/Sababa/server/:/usr/share/ flask_app_server sh