from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length, ValidationError
from flask_wtf.file import FileAllowed, FileField
from app.api.aws_helpers import ALLOWED_EXTENSIONS


def image_upload_required(form, field):
    if not field.data and not field._form_editing:
        raise ValidationError('Image file is required')


class PinForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=60)])
    description = TextAreaField('Description', validators=[DataRequired(),Length(max=255)])
    imageUrl = FileField('Image File', validators=[FileAllowed(
        list(ALLOWED_EXTENSIONS)), image_upload_required])
    submit = SubmitField('Submit')
