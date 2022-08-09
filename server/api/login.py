from db_models import Users
import json
from flask import make_response,jsonify,request

def user_login():
    data = json.loads(request.data)
    response = make_response(jsonify(success = 'true'))
    try:
        if all(x in ['email', 'password'] for x in data.keys()):
            user = Users.query.filter_by(email=data['email'].lower()).first()
            print(user)
            if user:
                if user.user_as_dict()['password'] == data['password']:
                    
                    response.status_code = 200    
                else:
                    response = make_response(jsonify(error = "Wrong username or password."))
                    response.status_code = 401 
            else:
                response = make_response(jsonify(error = "User was not found"))
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

