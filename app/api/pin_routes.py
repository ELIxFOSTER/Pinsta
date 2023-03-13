from flask import Blueprint
from app.models import Pin


pin_routes = Blueprint("pin", __name__)


@pin_routes.route('/pins')
def get_all_pins():
    all_pins = Pin.query.all()
    return [pin.to_dict() for pin in all_pins]
