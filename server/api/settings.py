from db_models import Users
import json
from flask import make_response,jsonify,request


def getSettings():
    data = json.loads(request.data)
    try:
        if all(x in ['email'] for x in data.keys()):
            user = Users.query.filter_by(email=data['email']).first()
            print(user)
            if user:
                response = make_response(jsonify(user.user_as_dict()))
                response.status_code = 200
            
            else:
                response = make_response(jsonify(error = "User does not exist in database"))
                response.status_code = 401 

        else:
            response = make_response(jsonify(error = "Invalid request."))
            response.status_code = 400
            print(data)
            return response

    except Exception as e:
        print(e)
        response.status_code = 500

    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
