from flask import Blueprint, request
from app.models import Pin, db
from flask_login import current_user, login_required
from app.forms import PinForm
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename


pin_routes = Blueprint("pin", __name__)


@pin_routes.route('/')
def get_all_pins():
    all_pins = Pin.query.all()
    return [pin.to_dict() for pin in all_pins]

@pin_routes.route('/<int:id>')
def get_pin_details(id):
    pin_details = Pin.query.get(id)

    return pin_details.to_dict()

@pin_routes.route('/current')
@login_required
def get_user_pins():
    user_pins = Pin.query.filter(Pin.userId == current_user.id)
    return [pin.to_dict() for pin in user_pins]


@pin_routes.route('/', methods=['POST'])
@login_required
def post_pin():

    # print('MADE IT HERE')

    # response = request.get_json()

    print('MADE IT HERE11!!!!!!!!!!!!!!')

    form = PinForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        imageUrl = form.data['imageUrl']

        imageUrl.filename = get_unique_filename(imageUrl.filename)

        upload = upload_file_to_s3(imageUrl)

        if 'url' not in upload:
            return {'error': 'File failed to upload'}

        pin = Pin(
            title=form.data['title'],
            description=form.data['description'],
            imageUrl=upload['url'],
            userId=current_user.id
        )

        db.session.add(pin)
        db.session.commit()
        return pin.to_dict()
    else:
        return 'This is weird'
