from db_models import Users
import json
from flask import make_response,jsonify,request

def user_login():
    data = json.loads(request.data)
    response = make_response(jsonify(success = 'false', error = 'false'))
    try:
        if all(x in ['email', 'password'] for x in data.keys()):
            user = Users.query.filter_by(email=data['email'].lower()).first()
            print(user.user_as_dict())
            if user:
                user_password = user.user_as_dict()['password']
                print("HERE: USER PASS")
                if  user_password == data['password']:
                    response = make_response(jsonify(success = 'true',user_id = user.id))
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
            return response

    except Exception as e:
        print(e)
        response.status_code = 500

    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

