from db_models import db,Users,UserTypes,Genders
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

def getUserInfo():
    data = json.loads(request.data)
    try:
        if 'email' in data.keys():
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


# need to recive in data users email 
# and then all to values to be updated.
# exaple:
# {
#     "email":"email" ##### must
#     "full_name":"..." #### optional
#     "phone_number":"..." #### optional
# }
def updateUserInfo():
    response = make_response(jsonify({'status':200}))
    response.status_code = 200
    if request.method == 'POST':
        data = json.loads(request.data)
        try:
            if 'email'in data.keys():
                user = Users.query.filter_by(email=data['email']).first()
                print(user)
                if user:
                    user.update(data)
                    print(user)
                    db.session.commit()
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