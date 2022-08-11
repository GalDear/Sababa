from flask import make_response,jsonify,request
import base64
from db_models import MessageMedia ,AdMedia,UserMedia, db

def update_db(attachment_type,attachment_linkid,type):
    if attachment_type == 'message':
        media = MessageMedia(link_id=attachment_linkid,type=type)
    elif attachment_type == 'user':
        media = UserMedia(link_id=attachment_linkid,type=type)
    elif attachment_type == 'ad':
        media = AdMedia(link_id=attachment_linkid,type=type)
    db.session.add(media)
    db.session.commit()
    return media.get_filename()




def save_media():
    response = make_response()
    if(request.method == "POST"):
        try:
            bytesOfMedia = request.get_data() # media content base64
            attachment_type = request.headers['Attachment-Type'] # "message" / "user" / "ad" 
            attachment_linkid = request.headers['attachment_linkid'] # message-id / user-id / ad-id
            media_type = request.headers['Content-Type'].split("/")[1] # "jpeg" / "mp4"
            filename = update_db(attachment_type,attachment_linkid,media_type)
            print(filename)
            with open(f'files/{filename}', 'wb+') as out:
                out.write(bytesOfMedia)
        except Exception as e:
            print(e)
    else:
        response = make_response(jsonify(error = "Invalid request."))
        response.status_code = 400
    return response


def user_image():
    user_id = request.headers['User-Id']
    media = UserMedia.query.filter_by(link_id = user_id).order_by(UserMedia.id.desc()).first()
    filename = media.get_filename()
    type = media.get_type()
    print(f"filename = {filename}")
    with open(f'files/{filename}', "rb") as f:
        encodedZip = base64.b64encode(f.read())
    if type == 'jpeg':
        img = encodedZip.decode()
        response = make_response(jsonify(media = img, type='jpeg'))
    elif type == 'mp4':
        video = encodedZip.decode()
        response = make_response(jsonify(media = video, type='mp4'))
    return response