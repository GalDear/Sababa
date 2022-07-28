from flask import make_response,jsonify,request
def image():
    if(request.method == "POST"):
        bytesOfImage = request.get_data()
        with open('files/image.jpeg', 'wb+') as out:
            out.write(bytesOfImage)
        return "Image read"


def video():
    if(request.method == "POST"):
        bytesOfVideo = request.get_data()
        with open('files/video.mp4', 'wb+') as out:
            out.write(bytesOfVideo)
        return "Video read"