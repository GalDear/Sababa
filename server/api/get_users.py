from db_models import Users
import json
from flask import make_response,jsonify,request

def getUsers():
    data = json.loads(request.data)
    try:
        response = make_response(jsonify(Users.query.filter_by(email=data['email']).first().user_as_dict()))
        print(data)
        response.status_code = 200
    except Exception as e:
        print (e)
        response.status_code = 500
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response