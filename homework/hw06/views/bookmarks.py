import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.bookmark import Bookmark
from models.post import Post
from views import get_authorized_user_ids
import flask_jwt_extended


class BookmarksListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    @flask_jwt_extended.jwt_required()
    def get(self):
        
        user=self.current_user
        bookmarks = Bookmark.query.filter_by(user_id=user.id).all()
        if not bookmarks:
            return Response(
                json.dumps({"message" : "bookmarks not found"}),
                mimetype="application/json", status=404)
        
        
        data = [item.to_dict() for item in bookmarks ]
        
        return Response(
            json.dumps(data),
            mimetype="application/json",
            status=200,
        )
    @flask_jwt_extended.jwt_required()
    def post(self):
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
        if Bookmark.query.filter_by(user_id=self.current_user.id, post_id=post_id).first():
            return Response(
                json.dumps({"message" : "post has already been bookmarked"}),
                mimetype="application/json", status=400)  
        
        
        new_bookmark = Bookmark(
            post_id = post_id,
            user_id = user_id
        )
                 
        db.session.add(new_bookmark)
        db.session.commit()        

        return Response(
            json.dumps(new_bookmark.to_dict()),
            mimetype="application/json",
            status=201,
        )


class BookmarkDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    @flask_jwt_extended.jwt_required()
    def delete(self, id):
        # TODO: Add Delete Logic...
        
        bookmark = Bookmark.query.get(id)
        
        if bookmark is None:
            return Response(
                json.dumps({"message" : "bookmark is missing"}),
                mimetype="application/json", status=404)              
        
        if bookmark.user_id != self.current_user.id:
            return Response(
                json.dumps({"message" : "current user did not create bookmark and cannot modify the bookmark"}),
                mimetype="application/json", status=404)            
        
        Bookmark.query.filter_by(id=id).delete()
        db.session.commit()
        
        print(id)
        return Response(
            json.dumps({"message" : f"Bookmark {id} has been deleted."}),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        BookmarksListEndpoint,
        "/api/bookmarks",
        "/api/bookmarks/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        BookmarkDetailEndpoint,
        "/api/bookmarks/<int:id>",
        "/api/bookmarks/<int:id>",
        resource_class_kwargs={"current_user": current_user},
    )
