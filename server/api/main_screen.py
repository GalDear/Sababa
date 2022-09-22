from datetime import datetime
from db_models import Ads,AdMatches, db
import json
from api.chat import createChat
from flask import make_response,jsonify,request
from sqlalchemy import and_

def mainScreen():
    NUMBER_OF_ADS=10
    data = json.loads(request.data)
    response = make_response()
    if all(x in ['last_ad', 'user_id'] for x in data.keys()):
        try:
            last_ad = data['last_ad']
            user_id = data['user_id']
            ads_query = Ads.query.filter(and_(Ads.id > last_ad, Ads.user_id != user_id)).limit(NUMBER_OF_ADS).all()
            available_ads = len(ads_query)
            print("num of ads",available_ads)
            if  available_ads > 0 :
                ads_list = [x.ad_as_dict() for x in ads_query]
                # print(ads_list)
            else:
                ads_list = []
            response = make_response(jsonify(ads=ads_list, next_ad = last_ad+available_ads))

        except Exception as e:
            print("Error", e)
            response.status_code = 500

    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

def createMatch(ad_id, user_id):
    match = AdMatches.query.filter_by(ad_id=ad_id, client_id=user_id).first()
    print(match)
    if not match:
        print("New MATCH was added to DB")
        creator_id = Ads.query.filter_by(id=ad_id).first().ad_as_dict()['user_id']
        match = AdMatches(ad_id=ad_id,client_id=user_id,ad_owner_id=creator_id,match_time=datetime.now())
        print(match)
        db.session.add(match)
        db.session.commit()
    else:
        print("Match already exists")
    return match
    

def checkMatch(user_id, ad_creator):
    match = AdMatches.query.filter_by(client_id=ad_creator,ad_owner_id=user_id).first()
    if match:
        print("MATCH!")
        return True
    print("NOT MATCH!")
    return False

def approveAd():
    data = json.loads(request.data)
    response = make_response(jsonify(is_match='False'))
    if all(x in ['ad_id', 'user_id'] for x in data.keys()):
        try:
            ad_id = data['ad_id']
            user_id = data['user_id']
            createMatch(ad_id, user_id)
            ad_creator = Ads.query.filter_by(id=ad_id).first().ad_as_dict()['user_id']
            is_match = checkMatch(user_id,ad_creator)
            if is_match:
                new_chat = createChat(ad_id, user_id,ad_creator)
                chat_id = new_chat.chat_as_dict()['id']
                response = make_response(jsonify(chat_id=chat_id,is_match='True'))
        except Exception as e:
            print("Error", e)
            response.status_code = 500
    else:
        print("Missing fields")
        response.status_code = 500

    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
