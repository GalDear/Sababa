from db_models import Message,Chat,Ads,Users, db
import json
from flask import make_response,jsonify,request
from sqlalchemy import and_
from datetime import datetime

from db_models import AdMatches

# Gets match_id, ad_id and sender
# Extract from DB the participant in the chat (receiver_id)
def get_receiver(match_id,ad_id,sender_id):
    client = Ads.query.filter_by(id=ad_id).first().ad_as_dict()['user_id']
    if client != sender_id:
        receiver_id = client
        print(f"Client {receiver_id}")
    else:
        receiver_id = AdMatches.query.filter_by(id=match_id).first().match_as_dict()['client_id']
        print(f"Receiver {receiver_id}")
    return receiver_id    


def get_ad_id(match_id):
    ad_id = AdMatches.query.filter_by(id=match_id).first().match_as_dict()['ad_id']
    return ad_id


# Create new chat in case the chat doesn't exsit
def get_chat(sender,receiver,ad_id):
    chat1 = Chat.query.filter_by(ad_id=ad_id,sender=sender,receiver=receiver).first()
    chat2 = Chat.query.filter_by(ad_id=ad_id,sender=receiver,receiver=sender).first()
    if chat1 is None and chat2 is None:
        print("Chat doesn't exsit - creating new chat")
        chat = Chat(sender=sender,receiver=receiver,ad_id=ad_id,starting_time=datetime.now())
        print(chat)
        db.session.add(chat)
        db.session.commit()
        return chat
    else:
        print(f"chat1: {chat1}, chat2:{chat2}")
        return (chat1 or chat2)
    

# Gets from client match_id, message data and sender id
# Update the DB with new message between 2 users
# POST EXAMPLE
# {
#     "match_id":1,
#     "message":{
#         "sender_id": 1,
#         "data":"how are you"
#     }
# }
def user_send_message():

    response=make_response()
    try:
        data = json.loads(request.data)
        if all(x in ['match_id', 'message'] for x in data.keys()):
            match_id = data['match_id']
            ad_id = get_ad_id(match_id)
            message = data['message']['data']
            sender = data['message']['sender_id']
            receiver = get_receiver(match_id,ad_id,sender)
            chat = get_chat(sender,receiver,ad_id)
            print("Creating new message")
            new_message = Message(chat_id=chat.id,sender_id=sender,message=message,time=datetime.now())
            print(new_message)
            db.session.add(new_message)
            db.session.commit()
        else:
            response=make_response(jsonify(error = "missing parameter"))
            response.status_code = 401
    except Exception as e:
        print (e)
        response.status_code = 500
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

# Get 2 users id's, match id and the last message the user has in his conversation
# Return the new messages the user doesn't have
#POST EXAMPLE
# {
#     "user1":1,
#     "user2":2,
#     "match_id":2,
#     "last_message":4
# }
def get_last_messages():
    response=make_response()
    data={}
    try:
        data = json.loads(request.data)
        sender =  data['user1']
        receiver = data['user2']
        match_id = data['match_id']
        last_message = data['last_message']
        ad_id = AdMatches.query.filter_by(id=match_id).first().match_as_dict()['ad_id']
        chat_id = get_chat(sender,receiver,ad_id).chat_as_dict()['id']
        print(chat_id)
        messages_query = Message.query.filter(and_(Message.chat_id == chat_id, Message.id > last_message)).all()
        messages = [x.message_as_dict() for x in messages_query]
        data["conversation"] = messages
        response.data = json.dumps(data)
    except Exception as e:
        print (e)
        response.status_code = 500
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


def createChat(ad_id, user_id,ad_creator):
    option1 = Chat.query.filter_by(sender=user_id,receiver=ad_creator,ad_id=ad_id).first()
    option2 = Chat.query.filter_by(sender=ad_creator,receiver=user_id,ad_id=ad_id).first()

    if not option1 and not option2:
        print("Creating new Chat!")
        new_chat = Chat(sender=user_id,receiver=ad_creator,ad_id=ad_id,starting_time=datetime.now())
        db.session.add(new_chat)
        db.session.commit()
        return new_chat
    else:
        print("Chat already exist")
        return option1 or option2

def chat_details():
    response=make_response()
    # try:
    data = json.loads(request.data)
    print(data)
    chat = Chat.query.filter_by(id=data['chatId']).first().chat_as_dict()
    if data['userId'] == chat['receiver']:
        user_id = chat['sender']
    else:
        user_id = chat['receiver']
    user_name = Users.query.filter_by(id=user_id).first().user_as_dict()['full_name']
    response.data = json.dumps({"user_id":user_id, "user_name":user_name})
    # except Exception as e:
    #         print (e)
            # response.status_code = 500
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
