from flask_sqlalchemy import SQLAlchemy
import enum
import base64
from datetime import datetime
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
    created_at = db.Column(db.DateTime, nullable=False,default=datetime.now())
    user_type = db.Column(db.Enum(UserTypes), nullable=False)
    images = db.relationship('UserMedia', backref='user_images', lazy=True)
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
    description= db.Column(db.Text)
    estimated_time = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Enum(Status), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,default=datetime.now())
    images = db.relationship('AdMedia', backref='ad_images', lazy=True)
    type = db.Column(db.Integer, nullable=False)

    def get_image(id):
        media = AdMedia.query.filter_by(link_id = id).first()
        # filename = media.get_filename()
        filename = 'user_1_1.jpeg'
        type = media.get_type()
        print(f"filename = {filename}")
        with open(f'files/{filename}', "rb") as f:
            encodedZip = base64.b64encode(f.read())
        if type == 'jpeg':
            media = {'media':encodedZip.decode(),'type':'jpeg'}
        elif type == 'mp4':
            media = {'media':encodedZip.decode(),'type':'mp4'}
        return media

    def get_user(id):
        return Users.query.filter_by(id=id).first().user_as_dict()['full_name']

    def ad_as_dict(self):
        return {'id': self.id, 'name':self.get_user(self.user_id), 'job': self.title, 'user_id': self.user_id,
                'estimated_time': self.estimated_time, 'price': self.price, 'status': self.status, 'images':self.get_image(self.id),
                'description':self.description , 'type':self.type ,'created_at': self.created_at.strftime('%Y-%m-%d')}

    def __repr__(self):
        return f"Ads('{self.id}', '{self.title},' '{self.user_id}', '{self.estimated_time}'," \
               f" '{self.price}', '{self.status}', '{self.created_at.strftime('%Y-%m-%d')}')"


class AdMatches(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ad_id = db.Column(db.Integer, db.ForeignKey('ads.id'), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    match_time = db.Column(db.DateTime, nullable=False,default=datetime.now())

    def match_as_dict(self):
        return {'id': self.id,'ad_id': self.ad_id, 'client_id': self.client_id, 'match_time': self.match_time.strftime('%Y-%m-%d')}

    def __repr__(self):
        return f"AdMatches('{self.id}', '{self.client_id}', '{self.match_time.strftime('%Y-%m-%d')}')"


class Offers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ad_id = db.Column(db.Integer, db.ForeignKey('ads.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.Enum(Status), nullable=False)
    final_price = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,default=datetime.now())
    description = db.Column(db.Text)

    def offer_as_dict(self):
        return {'id': self.id, 'status': self.status, 'final_price': self.final_price, 'created_at': self.created_at.strftime('%Y-%m-%d')
        , 'description': self.description}


class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    ad_id = db.Column(db.Integer, db.ForeignKey('ads.id'), nullable=False)
    messages = db.relationship('Message', backref='chat_messages', lazy=True)
    starting_time = db.Column(db.DateTime, nullable=False,default=datetime.now())

    def chat_as_dict(self):
        return {'id': self.id, 'ad_id': self.ad_id, 'messages': self.messages, 'starting_time': self.starting_time.strftime('%Y-%m-%d')}

    def __repr__(self):
        return f"Chat('{self.id}', '{self.ad_id}', '{self.messages}', '{self.starting_time.strftime('%Y-%m-%d')}')"

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer, db.ForeignKey('chat.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    offer_id = db.Column(db.Integer, db.ForeignKey('offers.id'))
    time = db.Column(db.DateTime(), nullable=False,default=datetime.now())
    images = db.relationship('MessageMedia', backref='message_images', lazy=True)


    def message_as_dict(self):
        return {'id': self.id,'chat_id':self.chat_id, 'sender_id': self.sender_id, 'data': self.message, 'offer_id': self.offer_id, 'time': self.time.strftime('%Y-%m-%d')}
    
    def get_message(self):
        return self.message

    def __repr__(self):
        return f"Message('{self.id}','{self.chat_id}', '{self.sender_id}', '{self.message},' '{self.offer_id},' '{self.time}')"

class UserMedia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    link_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type = db.Column(db.String(10), nullable=False)

    def get_filename(self):
        return f"user_{self.id}_{self.link_id}.{self.type}"
        
    def get_type(self):
        return f"{self.type}"

    def __repr__(self):
        return f"user('{self.id}', '{self.link_id}')"

class AdMedia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    link_id = db.Column(db.Integer, db.ForeignKey('ads.id'), nullable=False)
    type = db.Column(db.String(10), nullable=False)

    def get_filename(self):
        return f"ad_{self.id}_{self.link_id}.{self.type}"

    def __repr__(self):
        return f"ad('{self.id}', '{self.link_id}')"

class MessageMedia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    link_id = db.Column(db.Integer, db.ForeignKey('message.id'), nullable=False)
    type = db.Column(db.String(10), nullable=False)


    def get_filename(self):
        return f"message_{self.id}_{self.link_id}.{self.type}"

    def __repr__(self):
        return f"message('{self.id}', '{self.link_id}')"

