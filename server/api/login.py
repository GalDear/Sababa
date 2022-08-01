from db_models import Users
import json
from flask import make_response,jsonify,request

def user_login():
    data = json.loads(request.data)
    try:
        if all(x in ['email', 'password'] for x in data.keys()):
            user = Users.query.filter_by(email=data['email']).first()
            print(user)
            if user:
                response = make_response(jsonify(user.user_as_dict()))            
            else:
                response = make_response(jsonify(error = "Wrong username or password."))
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

