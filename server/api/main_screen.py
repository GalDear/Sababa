from db_models import Ads
import json
from flask import make_response,jsonify,request

def mainScreen():
    NUMBER_OF_ADS=10
    data = json.loads(request.data)
    response = make_response()
    if 'last_ad' in data.keys():
        try:
            last_ad = data['last_ad']
            ads_query = Ads.query.filter(Ads.id > last_ad).limit(NUMBER_OF_ADS).all()
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
