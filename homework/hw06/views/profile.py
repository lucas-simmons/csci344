import json

from flask import Response, request
from flask_restful import Resource

from models.user import User
import flask_jwt_extended

def get_path():
    return request.host_url + "api/posts/"


class ProfileDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    @flask_jwt_extended.jwt_required()
    def get(self):
        # TODO: Add GET logic...
        user = self.current_user
        user_data = User.query.get(user.id)
        
        data = user_data.to_dict()
                
        return Response(
            json.dumps(data),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        ProfileDetailEndpoint,
        "/api/profile",
        "/api/profile/",
        resource_class_kwargs={"current_user": current_user},
    )
