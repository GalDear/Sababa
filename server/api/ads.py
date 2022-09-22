from db_models import Ads,db
import json
from flask import make_response,jsonify,request
from datetime import datetime


def db_update(data,user_id,ad_type):
    new_ad = Ads(title=data['JobTitle'], status=data['Status'], estimated_time=data['EstimatedTime'], description=data['Description'],price=data['Price'],type=ad_type,user_id=user_id,created_at = datetime.today())
    print(new_ad)
    db.session.add(new_ad)
    db.session.commit()


def ad_create(user_ad={},user_id=""):
    if user_ad:
        print("Creating ad for user")
        db_update(user_ad,user_id,0)
    else:
        response = make_response(jsonify({'status':200}))
        response.status_code = 200
        if request.method == 'POST':
            all_data = json.loads(request.data)
            data = all_data[0]
            user_id = all_data[1]
            try:
                db_update(data,user_id,1)
                response = make_response({'success':True})
                        
            except Exception as e:
                print(f"EXCEPTION: {e}")
                response = make_response({'success':False})
                response.status_code = 500
            
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
        

