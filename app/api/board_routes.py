from flask import Blueprint
from app.models import Board


board_routes = Blueprint("board", __name__)

@board_routes.route('/')
def get_boards():
    all_boards = Board.query.all()
    return [board.to_dict_no_pins() for board in all_boards]
