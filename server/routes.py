from flask import Blueprint
from api.login import user_login
from api.registration import user_registration
from api.get_users import getUsers
from api.chat import user_send_message,get_last_messages,chat_list
from api.media import save_media, user_image
from api.main_screen import mainScreen, approveAd
from api.ads import ad_create
from api.chat import chat_details

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

get_main_data = Blueprint("get_main_data", __name__)
get_main_data.route("/api/get_main_data", methods=['GET','POST'])(mainScreen)

create_new_ad = Blueprint("create_new_ad", __name__)
create_new_ad.route("/api/create_new_ad", methods=['GET','POST'])(ad_create)

approve_ad = Blueprint("approve_ad", __name__)
approve_ad.route("/api/approve_ad", methods=['GET','POST'])(approveAd)

chat_user_details = Blueprint("chat_user_details", __name__)
chat_user_details.route("/api/chat_user_details", methods=['GET','POST'])(chat_details)

get_chat_list = Blueprint("get_chat_list", __name__)
get_chat_list.route("/api/get_chat_list", methods=['GET','POST'])(chat_list)


