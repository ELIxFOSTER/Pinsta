from flask import Blueprint, request, jsonify
from app.models import Pin, db
from flask_login import current_user, login_required
from app.forms import PinForm


pin_routes = Blueprint("pin", __name__)


#* Get All Pins *#
@pin_routes.route('/')
def get_all_pins():
    all_pins = Pin.query.all()
    return [pin.to_dict() for pin in all_pins]


#* Get Pin Details *#
@pin_routes.route('/<int:id>')
def get_pin_details(id):
    pin_details = Pin.query.get(id)

    return pin_details.to_dict()


#* Get All Current User Pins #*
@pin_routes.route('/current')
@login_required
def get_user_pins():
    user_pins = Pin.query.filter(Pin.userId == current_user.id)
    return [pin.to_dict() for pin in user_pins]



#* Create New Pin *#
@pin_routes.route('/', methods=['POST'])
@login_required
def post_pin():
    response = request.get_json()

    form = PinForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        pin = Pin(
            title=response['title'],
            description=response['description'],
            imageUrl=response['imageUrl'],
            userId=current_user.id
        )

        db.session.add(pin)
        db.session.commit()
        return pin.to_dict()


#* Edit Pin *#
@pin_routes.route('/<int:pin_id>', methods=['PUT'])
@login_required
def edit_pin(pin_id):
    pin = Pin.query.get_or_404(pin_id)

    pin.title = request.json.get('title', pin.title)
    pin.description = request.json.get('description', pin.description)
    pin.imageUrl = request.json.get('imageUrl', pin.imageUrl)
    pin.userId = request.json.get('userId', pin.userId)

    db.session.commit()

    return jsonify({
        'id': pin.id,
        'title': pin.title,
        'description': pin.description,
        'imageUrl': pin.imageUrl,
        'userId': pin.userId
    })
