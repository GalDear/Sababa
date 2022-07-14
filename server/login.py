#from flask import Blueprint, render_template, abort

#login = Blueprint('login', __name__,template_folder='api')
from __main__ import app
# POST include username & password 
# need to be checked in a table with all users 
# if the described user exists then return user data with TOKEN for further authorization
@app.route("/api/login", methods=["POST"])
def login():
    data = json.loads(request.data)
    try:
        if all(x in ['email', 'password'] for x in data.keys()):
            user = Users.query.filter_by(email=data['email']).first()
            print(user,file=sys.stderr)
            if user:
                response = make_response(jsonify(user.user_as_dict()))
                response.status_code = 200
            
            else:
                response = make_response(jsonify(error = "Wrong username or password."))
                response.status_code = 401 

        else:
            response = make_response(jsonify(error = "Invalid request."))
            response.status_code = 400
            print(data,file=sys.stderr)
            return response

    except Exception as e:
        print(e,file=sys.stderr)
        response.status_code = 500

    response.headers['Access-Control-Allow-Origin'] = config['client_access']
    return response

