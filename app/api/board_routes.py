from flask import Blueprint, request, jsonify
from app.models import Board, db
from flask_login import current_user, login_required
from app.forms import BoardForm


board_routes = Blueprint("board", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@board_routes.route('/<int:id>')
@login_required
def get_single(id):
    single_board = Board.query.get(id)

    return single_board.to_dict(add_pins=True)


@board_routes.route('/')
@login_required
def get_boards():
    all_boards = Board.query.filter(Board.userId == current_user.id)
    return [board.to_dict(add_pins=True) for board in all_boards]

@board_routes.route('/', methods=['POST'])
@login_required
def post_board():
    res = request.get_json()

    form = BoardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        board = Board(
            name=res['name'],
            description=res['description'],
            userId=current_user.id
        )

        db.session.add(board)
        db.session.commit()
        return board.to_dict(add_pins=True)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 403

@board_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_board(id):
    data = Board.query.get(id)
    res = request.get_json()

    if data:
        data.name = res['name']
        data.description = res['description']

        db.session.commit()
        return data.to_dict(add_pins=True)

@board_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_board(id):
    data = Board.query.get(id)

    if data:
        db.session.delete(data)
        db.session.commit()
    return {"Response": "Successfully Deleted item"}
