from datetime import datetime
from operator import truediv
from db_models import Users,db,Genders,UserTypes
import json
import re
from flask import make_response,jsonify,request




def user_registration():
    response = make_response(jsonify({'status':200}))
    response.status_code = 200
    if request.method == 'POST':
        data = json.loads(request.data)
        print(data)
        try:
            if(validateEmail(data['email']) and validatePassword(data['password'])):
                if Users.query.filter_by(email=data['email']).first() is None:
                    new_user = Users(password=data['password'], full_name=data['full_name'], phone_number=data['phone_number'], email=data['email'],country=data['country'],created_at=datetime.today(),user_type=UserTypes.Parse(data['user_type']),description=data['description'],foundation=data['foundation'],gender=Genders.Parse(data['gender']),skills=data['skills'])
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
        


emailRegex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
def validateEmail(email):
    return re.fullmatch(emailRegex, email) # return boolean value, indicate if email is in correct format
 

passwordRegex = re.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,20}$")
def validatePassword(password):
    return re.search(passwordRegex, password)

