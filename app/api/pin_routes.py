from flask import Blueprint
from app.models import Pin


pin_routes = Blueprint("pin", __name__)


@pin_routes.route('/')
def get_all_pins():
    all_pins = Pin.query.all()
    return [pin.to_dict() for pin in all_pins]

@pin_routes.route('/<int:id>')
def get_pin_details(id):
    pin_details = Pin.query.get(id)

    return pin_details.to_dict()
