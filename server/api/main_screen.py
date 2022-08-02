from db_models import Ads
import json
from flask import make_response,jsonify,request

def mainScreen():
    NUMBER_OF_ADS=10
    data = json.loads(request.data)
    if 'last_ad' in data.keys():
        try:
            last_ad = data['last_ad']
            ads_query = Ads.query.filter(Ads.id >= last_ad).limit(NUMBER_OF_ADS).all()
            ads_list = [x.ad_as_dict() for x in ads_query]
            print(ads_list)
            response = make_response(jsonify(ads=ads_list, next_ad = last_ad+NUMBER_OF_ADS))             

        except Exception as e:
            print(e)
            response.status_code = 500

    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
