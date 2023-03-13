from flask import Blueprint
from app.models import Board
from flask_login import current_user, login_required


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
