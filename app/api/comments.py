from flask import Blueprint, request, jsonify
from app.models import Comment, db
from flask_login import current_user, login_required
from app.forms import CommentForm

comment = Blueprint("comment", __name__)

@comment.route('/<int:id>')
def get_single_comment():
    comment = Comment.query.get(id)
    return comment.to_dict()

# READ A COMMENT

@comment.route('/current', methods=['GET'])
@login_required
def all_comments():
    one_comment = Comment.query.filter(Comment.userId == current_user.userId)
    return {'comment': [comment.to_dict() for comment in one_comment]}, 200

# POST A COMMENT 

@comment.route('/new', methods=["POST"])
@login_required
def new_comment():
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        add_new_comment = Comment(
            comment=form.comment.data,
            user_id=current_user.id,
            post_id=form.post_id.data
        )
        db.session.add(add_new_comment)
        db.session.commit()
        return add_new_comment.to_dict(), 200

# EDIT A COMMENT

@comment.route('/edit', methods=['PUT'])
@login_required

def edit_comment(id):
    comment = Comment.query.get(id)

    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        comment.comment = form.data['comment']
        db.session.commit()
        return comment.to_dict(), 201

# DELETE A COMMENT

@comment.route('/<int:id>', methods=['DELETE'])
@login_required

def delete_comment(id):
    comment = Comment.query.get(id)

    db.session.delete(comment)
    db.session.commit()
    return jsonify('Successfully deleted!'), 201


