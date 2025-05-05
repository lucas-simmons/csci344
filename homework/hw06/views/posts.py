import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.post import Post
from views import get_authorized_user_ids
import flask_jwt_extended

def get_path():
    return request.host_url + "api/posts/"


class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    @flask_jwt_extended.jwt_required()
    def get(self):
        count=request.args.get("limit")
        print(count)
        if count is None:
            count=20
        try:
            count = int(count)
            if count > 50:
                return Response(
                    json.dumps({"message" : "max number of posts is 50"}),
                    mimetype="application/json", status=400)
        except:
            return Response(
                json.dumps({"message" : "limit must be an integer"}),
                mimetype="application/json", status=400)
        
        
        # giving you the beginnings of this code (as this one is a little tricky for beginners):
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)
        posts = Post.query.filter(Post.user_id.in_(ids_for_me_and_my_friends)).limit(count)
        
        data = [item.to_dict(user=self.current_user) for item in posts.all()]
        return Response(json.dumps(data), mimetype="application/json", status=200)

    @flask_jwt_extended.jwt_required()
    def post(self):
        # TODO: handle POST logic
        data= request.json
        
        image_url = data.get("image_url")
        caption = data.get("caption")
        alt_text = data.get("alt_text")
        
        
        if image_url is None:
            return Response(
                json.dumps({"message" : "image_url is a required parameter and is missing"}),
                mimetype="application/json", status=400)
            
        new_post = Post(
            image_url = image_url,
            user_id = self.current_user.id,
            caption = caption,
            alt_text = alt_text,
        )
        db.session.add(new_post)
        db.session.commit()
        
        return Response(json.dumps(new_post.to_dict(user=self.current_user)), mimetype="application/json", status=201)


class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    @flask_jwt_extended.jwt_required()
    def patch(self, id):
        print("POST id=", id)
        
        post = Post.query.get(id)      
        
        if post is None:
            return Response(
                json.dumps({"message" : "post is missing"}),
                mimetype="application/json", status=404)              
        
        if post.user_id != self.current_user.id:
            return Response(
                json.dumps({"message" : "current user did not create post and cannot modify the post"}),
                mimetype="application/json", status=404)            
        
        data = request.json
        
        image_url = data.get("image_url")
        caption = data.get("caption")
        alt_text = data.get("alt_text")
        
        if caption is not None:
            post.caption = caption
        if image_url is not None:
            post.image_url = image_url
        if alt_text is not None:
            post.alt_text = alt_text
        
        db.session.commit()
        
        return Response(json.dumps(post.to_dict(user=self.current_user)), mimetype="application/json", status=200)

    @flask_jwt_extended.jwt_required()
    def delete(self, id):
        print("POST id=", id)

        # TODO: Add DELETE logic...
        post = Post.query.get(id)      
        
        if post is None:
            return Response(
                json.dumps({"message" : "post is missing"}),
                mimetype="application/json", status=404)              
        
        if post.user_id != self.current_user.id:
            return Response(
                json.dumps({"message" : "current user did not create post and cannot modify the post"}),
                mimetype="application/json", status=404)            
        
        Post.query.filter_by(id=id).delete()
        db.session.commit()
        
        
        return Response(
            json.dumps({"message" : f"Post {id} has been deleted."}),
            mimetype="application/json",
            status=200,
        )

    @flask_jwt_extended.jwt_required()
    def get(self, id):
        print("POST id=", id)
        
        post = Post.query.get(id)
        if not post or post.user_id != self.current_user.id:
            return Response(
                json.dumps({"message" : "must be a valid id"}),
                mimetype="application/json", status=404)
              

        data = post.to_dict(user=self.current_user)
 
        return Response(
            json.dumps(data),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        PostListEndpoint,
        "/api/posts",
        "/api/posts/",
        resource_class_kwargs={"current_user": current_user},
    )
    api.add_resource(
        PostDetailEndpoint,
        "/api/posts/<int:id>",
        "/api/posts/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
