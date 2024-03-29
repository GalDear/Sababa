import sys
import json
from flask import Flask
# from flask_cors import CORS, cross_origin
from db_models import db
from routes import login, registration, get_users,send_message,get_messages,upload_image,get_user_image,get_main_data,create_new_ad
# with open("config.json", "r") as f:
    # config = json.load(f)[sys.argv[1]]

app = Flask(__name__, static_url_path='')


app.secret_key = "SABABA"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def home():
    return {'status':200}

db.init_app(app)
app.register_blueprint(login)
app.register_blueprint(registration)
app.register_blueprint(get_users)
app.register_blueprint(send_message)
app.register_blueprint(get_messages)
app.register_blueprint(upload_image)
app.register_blueprint(get_user_image)
app.register_blueprint(get_main_data)
app.register_blueprint(create_new_ad)



sys.stdout = sys.stderr


def main():
    # app.run(debug=config["debug"], host='0.0.0.0', port='8081')
    app.run(debug=True, host='0.0.0.0', port='8081')


if __name__ == '__main__':
    main()

