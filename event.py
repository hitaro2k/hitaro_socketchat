from flask_socketio import emit
from ext import socketio
from flask import request


users = {}
@socketio.on('connect')
def handle_connection():
    print('Client connected')


@socketio.on('user_join')
def handle_user__join(username):
    print("User joined: " + username)
    users[username] = request.sid

@socketio.on('new_message')
def handle_new_message(message):
    print(message)
    username = None
    for user in users:
        if users[user] == request.sid:
            username = user

    emit("chat" , {"message": message , "username" : username }, broadcast=True)