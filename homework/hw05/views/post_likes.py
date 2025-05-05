import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.like_post import LikePost
from models.post import Post
from views import get_authorized_user_ids

class PostLikesListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def post(self):
        # TODO: Add POST logic...
        data = request.get_json(force=True)

        
        if not isinstance(data, dict) or "post_id" not in data:
            return Response(
                json.dumps({"message": "`post_id` is required"}),
                mimetype="application/json",
                status=400,
            )
        raw = data["post_id"]        
        
        try:
            post_id = int(raw)
        except Exception:
            return Response(
                json.dumps({"message": "`post_id` must be an integer"}),
                mimetype="application/json",
                status=400,
            )
            
        user_id = self.current_user.id
        post = Post.query.get(post_id)
        
        if post is None:
            return Response(
                json.dumps({"message" : "post is missing"}),
                mimetype="application/json", status=404)    
            
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user) 
        
        if post.user_id not in ids_for_me_and_my_friends:
            return Response(
                json.dumps({"message" : "current user does not follow the post creator"}),
                mimetype="application/json", status=404)   
        if LikePost.query.filter_by(user_id=self.current_user.id, post_id=post_id).first():
            return Response(
                json.dumps({"message" : "post has already been liked"}),
                mimetype="application/json", status=400)  
        
        
        new_like = LikePost(
            post_id = post_id,
            user_id = user_id
        )
                 
        db.session.add(new_like)
        db.session.commit()        

        return Response(
            json.dumps(new_like.to_dict()),
            mimetype="application/json",
            status=201,
        )


class PostLikesDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        # TODO: Add DELETE logic...
        like = LikePost.query.get(id)
        
        if like is None:
            return Response(
                json.dumps({"message" : "like is missing"}),
                mimetype="application/json", status=404)              
        
        if like.user_id != self.current_user.id:
            return Response(
                json.dumps({"message" : "current user did not create like and cannot modify the like"}),
                mimetype="application/json", status=404)            
        
        LikePost.query.filter_by(id=id).delete()
        db.session.commit()
        
        print(id)
        return Response(
            json.dumps({"message" : f"Like {id} has been deleted."}),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        PostLikesListEndpoint,
        "/api/likes",
        "/api/likes/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        PostLikesDetailEndpoint,
        "/api/likes/<int:id>",
        "/api/likes/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
