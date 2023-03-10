"""empty message

Revision ID: b9ed4adc02c0
Revises: ffdc0a98111c
Create Date: 2023-03-10 14:10:57.785066

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b9ed4adc02c0'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pins',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('imageUrl', sa.String(length=255), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('boards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('comments', sa.String(length=255), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('pinId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['pinId'], ['pins.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('boards_pins',
    sa.Column('boards', sa.Integer(), nullable=False),
    sa.Column('pins', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['boards'], ['boards.id'], ),
    sa.ForeignKeyConstraint(['pins'], ['pins.id'], ),
    sa.PrimaryKeyConstraint('boards', 'pins')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('boards_pins')
    op.drop_table('comments')
    op.drop_table('boards')
    op.drop_table('pins')
    # ### end Alembic commands ###