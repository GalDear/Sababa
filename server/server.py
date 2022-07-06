import sys
import urllib
import json
import enum
from urllib import response
import requests
from flask import Flask, make_response, request, jsonify
# from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime,timedelta
import time

app = Flask(__name__, static_url_path='')
app.secret_key = "CYMOTIVE"

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
# CORS(app, resources={"*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'


class UserTypes(enum.Enum):
    suplier = 1
    client = 2

class Genders(enum.Enum):
    male = 1
    female = 2

class Status(enum.Enum):
    open = 1
    in_progress = 2
    done = 3


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(20), nullable=False)
    full_name = db.Column(db.String(20), nullable=False)
    phone_number = db.Column(db.String(11), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    user_type = db.Column(db.Enum(UserTypes), nullable=False)
    description = db.Column(db.Text)
    foundation = db.Column(db.String(20))
    gender = db.Column(db.Enum(Genders))
    skills = db.Column(db.Text)
    ads = db.relationship('Ads', backref='user_ads', lazy=True)

    def user_as_dict(self):
        return {'id': self.id, 'full_name': self.full_name, 'phone_number': self.phone_number,
                'email': self.email, 'country': self.country, 'created_at': self.created_at.strftime('%Y-%m-%d'),
                'user_type': self.user_type.name,
                'description': self.description, 'foundation': self.foundation,
                'gender': self.gender.name, 'skills': self.skills}

    def __repr__(self):
        return f"Users('{self.id}', '{self.full_name}', '{self.email}', '{self.created_at.strftime('%Y-%m-%d')}','{self.user_type}')"


class Ads(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    estimated_time = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Enum(Status), nullable=False)
    created_at = db.Column(db.Date, nullable=False)

    def ad_as_dict(self):
        return {'id': self.id, 'title': self.title, 'user_id': self.user_id,
                'estimated_time': self.estimated_time, 'price': self.price, 'status': self.status,
                'created_at': self.created_at.strftime('%Y-%m-%d')}

    def __repr__(self):
        return f"Ads('{self.id}', '{self.title},' '{self.user_id}', '{self.estimated_time}'," \
               f" '{self.price}', '{self.status}', '{self.created_at.strftime('%Y-%m-%d')}')"


class AdMatches(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ad_id = db.Column(db.Integer, db.ForeignKey('ads.id'), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    match_time = db.Column(db.Date, nullable=False)

    def match_as_dict(self):
        return {'id': self.id,'ad_id': self.ad_id, 'client_id': self.client_id, 'match_time': self.match_time.strftime('%Y-%m-%d')}

    def __repr__(self):
        return f"AdMatches('{self.id}', '{self.client_id},' '{self.match_time.strftime('%Y-%m-%d')}')"


class Offers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ad_id = db.Column(db.Integer, db.ForeignKey('ads.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.Enum(Status), nullable=False)
    final_price = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    description = db.Column(db.Text)

    def offer_as_dict(self):
        return {'id': self.id, 'status': self.status, 'final_price': self.final_price, 'created_at': self.created_at.strftime('%Y-%m-%d')
        , 'description': self.description}


class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ad_id = db.Column(db.Integer, db.ForeignKey('ads.id'), nullable=False)
    messages = db.relationship('Message', backref='chat_messages', lazy=True)
    starting_time = db.Column(db.Date, nullable=False)

    def chat_as_dict(self):
        return {'id': self.id, 'ad_id': self.ad_id, 'messages': self.messages, 'starting_time': self.starting_time.strftime('%Y-%m-%d')}

    def __repr__(self):
        return f"Chat('{self.id}', '{self.ad_id}', '{self.messages}', '{self.starting_time.strftime('%Y-%m-%d')}')"

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer, db.ForeignKey('chat.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    offer_id = db.Column(db.Integer, db.ForeignKey('offers.id'), nullable=False)
    time = db.Column(db.DateTime(), nullable=False)


    def message_as_dict(self):
        return {'id': self.id, 'sender_id': self.sender_id, 'message': self.message, 'offer_id': self.offer_id, 'time': self.time}

    def __repr__(self):
        return f"Message('{self.id}', '{self.sender_id}', '{self.message},' '{self.offer_id},' '{self.time}')"


@app.route('/')
def home():
    return {'status':200}

@app.route('/api/registration', methods=['GET', 'POST'])
# @cross_origin(origin='*',headers=['Content- Type'])
def registration():
    response = make_response(jsonify({'status':200}))
    response.status_code = 200
    if request.method == 'POST':
        data = json.loads(request.data)
        print(data,file=sys.stderr)
        try:
            new_user = Users(password=data['password'], full_name=data['full_name'], phone_number=data['phone_number'], email=data['email'],country=data['country'],created_at=datetime.today(),user_type=data['user_type'],description=data['description'],foundation=data['foundation'],gender=data['gender'],skills=data['skills'])
            print(new_user,file=sys.stderr)
            db.session.add(new_user)
            db.session.commit()
            response = make_response({'id':new_user.id})
            print(new_user,file=sys.stderr)
        except Exception as e:
            #raise(f'Error handeling user registration:  {e}')
            print(e,file=sys.stderr)
            response.status_code = 500
    response.headers['Access-Control-Allow-Origin'] = '*'    
    return response
        


@app.route("/api/get_users", methods=["POST"])
def getUsers():
    data = json.loads(request.data)
    try:
        response = make_response(jsonify(Users.query.filter_by(email=data['email']).first().user_as_dict()))
        print(data,file=sys.stderr)
        response.status_code = 200
    except:
        response.status_code = 500
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


def main():
    app.run(debug=True, host='0.0.0.0', port='8081')


if __name__ == '__main__':
    main()
