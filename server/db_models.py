import json
from flask_sqlalchemy import SQLAlchemy
import enum
db = SQLAlchemy()

class UserTypes(enum.Enum):
    suplier = 1
    client = 2

    def Parse(userType):
        #return gender.lower()
        if userType.lower() == "suplier":
            return UserTypes.suplier
        else:
            return UserTypes.client

class Genders(enum.Enum):
    male = 1
    female = 2

    def Parse(gender):
        #return gender.lower()
        if gender.lower() == "male":
            return Genders.male
        else:
            return Genders.female

    

class Status(enum.Enum):
    open = 1
    in_progress = 2
    done = 3


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    password = db.Column(db.String(20), nullable=False)
    full_name = db.Column(db.String(20), nullable=False)
    phone_number = db.Column(db.String(11), nullable=False)
    email = db.Column(db.String(50), primary_key=True)
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
    
    def update(self, update_json: json):
        for col_name in self.__table__.columns.keys():
            if col_name in update_json:
                setattr(self, col_name, update_json[col_name])


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
