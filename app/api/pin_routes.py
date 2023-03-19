from flask import Blueprint, request, jsonify
from app.models import Pin, db
from flask_login import current_user, login_required
from app.forms import PinForm
from app.forms import EditPinForm
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename


pin_routes = Blueprint("pin", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


#* Get All Pins *#
@pin_routes.route('/')
def get_all_pins():
    all_pins = Pin.query.all()
    return [pin.to_dict() for pin in all_pins]

@pin_routes.route('/filtered', methods=['POST'])
def get_fil_pins():
    res = request.get_json()

    data = Pin.query.filter(Pin.title.ilike(f"%{res['str']}%")).all()

    return [pin.to_dict() for pin in data]


#* Get Pin Details *#
@pin_routes.route('/<int:id>')
def get_pin_details(id):
    pin_details = Pin.query.get(id)

    return pin_details.to_dict(add_comments=True)


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

    # print('MADE IT HERE')

    # response = request.get_json()

    form = PinForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        imageUrl = form.data['imageUrl']

        imageUrl.filename = get_unique_filename(imageUrl.filename)

        upload = upload_file_to_s3(imageUrl)

        if 'url' not in upload:
            return {'errors': 'File failed to upload'}

        pin = Pin(
            title=form.data['title'],
            description=form.data['description'],
            imageUrl=upload['url'],
            userId=current_user.id
        )

        db.session.add(pin)
        db.session.commit()
        return pin.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors) }, 403


#* Edit Pin *#
# @pin_routes.route('/<int:pin_id>', methods=['PUT'])
# @login_required
# def edit_pin(pin_id):
#     pin = Pin.query.get_or_404(pin_id)
#     data = request.get_json()

#     if not data:
#         return {'errors': 'No data provided'}, 400

#     pin.title = data.get('title', pin.title)
#     pin.description = data.get('description', pin.description)
#     pin.imageUrl = data.get('imageUrl', pin.imageUrl)
#     pin.userId = current_user.id

#     db.session.commit()

#     return jsonify({
#         'id': pin.id,
#         'title': pin.title,
#         'description': pin.description,
#         'imageUrl': pin.imageUrl,
#         'userId': pin.userId
#     })

@pin_routes.route('/<int:pin_id>', methods=['PUT'])
@login_required
def edit_pin(pin_id):
    pin = Pin.query.get_or_404(pin_id)
    data = request.get_json()

    if not data:
        return {'errors': 'No data provided'}, 400

    form = PinForm(data=data)
    form["csrf_token"].data = request.cookies["csrf_token"]

    if not form.validate():
        return {'errors': validation_errors_to_error_messages(form.errors)}, 403

    pin.title = data.get('title', pin.title)
    pin.description = data.get('description', pin.description)
    pin.imageUrl = data.get('imageUrl', pin.imageUrl)
    pin.userId = current_user.id

    db.session.commit()

    return jsonify({
        'id': pin.id,
        'title': pin.title,
        'description': pin.description,
        'imageUrl': pin.imageUrl,
        'userId': pin.userId
    })






#* Delete a Pin Route *#
@pin_routes.route('/<int:pin_id>', methods=['DELETE'])
@login_required
def delete_pin(pin_id):
    pin = Pin.query.get_or_404(pin_id)

    # Ensure that only the owner of the pin can delete it
    if pin.userId != current_user.id:
        return jsonify({'errors': ['Permission Denied']}), 403

    db.session.delete(pin)
    db.session.commit()

    return jsonify({'message': 'Success'})
