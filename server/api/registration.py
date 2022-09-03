from datetime import datetime
from operator import truediv
from db_models import Users,db,Genders,UserTypes
import json
import re
from flask import make_response,jsonify,request
from datetime import datetime




def user_registration():
    response = make_response(jsonify({'status':200}))
    response.status_code = 200
    if request.method == 'POST':
        data = json.loads(request.data)
        print(data)
        try:

            if validatePassword(data['password']):
                if validateEmail(data['email']):
                    new_user = Users(password=data['password'], full_name=data['fullname'], phone_number=data['phone'], email=data['email'].lower(),country=data['country'],user_type=data['type'],age=data['age'],description=data['description'],foundation=data['companyFounding'],gender=data['gender'],skills=data['skills'],created_at=datetime.today())
                    print(new_user)
                    db.session.add(new_user)
                    db.session.commit()
                    response = make_response({'success':True})
                    print(new_user)
                    
                else:
                    response = make_response({'success':False, 'error':"Email is already taken"})
                    response.status_code = 406
                    
            else:
                response = make_response({'success':False, 'error':"Invalid username or password"})
                response.status_code = 400

        except Exception as e:
            print(f"EXEPTION: {e}")
            response = make_response({'success':False})
            response.status_code = 500
        
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
        



def validateEmail(email):
    emailRegex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
    email_exist = Users.query.filter_by(email=email).first()
    email_pattern = re.fullmatch(emailRegex, email) # return boolean value, indicate if email is in correct format
    return (not email_exist and email_pattern)
 


def validatePassword(password):
    passwordRegex = re.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,20}$")
    return re.search(passwordRegex, password)

