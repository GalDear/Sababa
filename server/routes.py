from flask import Blueprint
from api.login import user_login
from api.registration import user_registration
from api.get_users import getUsers
from api.chat import user_send_message,get_last_messages
from api.media import save_media, user_image

login = Blueprint("login", __name__)
login.route("/api/login", methods=["POST"])(user_login)

registration = Blueprint("registration", __name__)
registration.route("/api/registration", methods=["POST"])(user_registration)

get_users = Blueprint("get_users", __name__)
get_users.route("/api/get_users", methods=["POST"])(getUsers)

send_message = Blueprint("send_message", __name__)
send_message.route("/api/send_message", methods=["POST"])(user_send_message)

get_messages = Blueprint("get_messages", __name__)
get_messages.route("/api/get_messages", methods=["POST"])(get_last_messages)

upload_image = Blueprint("upload_image", __name__)
upload_image.route("/api/upload_image", methods=['GET', 'POST'])(save_media)

get_user_image = Blueprint("get_user_image", __name__)
get_user_image.route("/api/get_user_image", methods=['GET'])(user_image)

