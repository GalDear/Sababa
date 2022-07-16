from db_models import Users,db
import json
from flask import make_response,jsonify,request


def user_registration():
    response = make_response(jsonify({'status':200}))
    response.status_code = 200
    if request.method == 'POST':
        data = json.loads(request.data)
        print(data)
        try:
            new_user = Users(password=data['password'], full_name=data['full_name'], phone_number=data['phone_number'], email=data['email'],country=data['country'],created_at=datetime.today(),user_type=data['user_type'],description=data['description'],foundation=data['foundation'],gender=data['gender'],skills=data['skills'])
            print(new_user)
            db.session.add(new_user)
            db.session.commit()
            response = make_response({'id':new_user.id})
            print(new_user)
        except Exception as e:
            print(e)
            response.status_code = 500
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
        

