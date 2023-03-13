from flask import Blueprint, request, jsonify
from app.models import Board, db
from flask_login import current_user, login_required
from app.forms import BoardForm


board_routes = Blueprint("board", __name__)


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
        return board.to_dict()
