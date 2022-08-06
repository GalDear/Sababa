FROM python:3.8-alpine

ARG STAGE
ENV STAGE ${STAGE}
COPY requirements.txt requirements.txt

RUN apk --update add openssl ca-certificates py-openssl wget
RUN apk --update add --virtual build-dependencies libffi-dev openssl-dev build-base \
  && pip install --upgrade pip \
  && pip install -r requirements.txt \
  && pip install regex \
  && apk del build-dependencies

RUN mkdir server
COPY . /usr/server/
WORKDIR /usr/server/

# VOLUME /usr/server/

CMD  python3 /usr/server/server.py ${STAGE}

#For debugging
# docker run -it -p 8081:8081 -v ~/git_wa/HIT/Sababa/server/:/usr/share/ flask_app_server sh