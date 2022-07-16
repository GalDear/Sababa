from flask import Blueprint
from api.login import user_login
from api.registration import user_registration
from api.get_users import getUsers

login = Blueprint("login", __name__)
login.route("/api/login", methods=["POST"])(user_login)

registration = Blueprint("registration", __name__)
registration.route("/api/registration", methods=["POST"])(user_registration)

get_users = Blueprint("get_users", __name__)
get_users.route("/api/get_users", methods=["POST"])(getUsers)