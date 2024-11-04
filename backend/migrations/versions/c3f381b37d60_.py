"""empty message

Revision ID: c3f381b37d60
Revises:
Create Date: 2024-11-04 14:21:48.570218

"""

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "c3f381b37d60"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "users",
        sa.Column("user_id", sa.String(length=36), nullable=False),
        sa.Column("username", sa.String(length=50), nullable=False),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column(
            "created_at",
            sa.TIMESTAMP(timezone=True),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.TIMESTAMP(timezone=True),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("user_id"),
        sa.UniqueConstraint("user_id"),
        sa.UniqueConstraint("username"),
    )
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.create_index("idx_users_username", ["username"], unique=False)

    op.create_table(
        "recordings",
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("user_id", sa.String(length=36), nullable=False),
        sa.Column("audio_url", sa.Text(), nullable=False),
        sa.Column("recorded_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("latitude", sa.Integer(), nullable=False),
        sa.Column("longitude", sa.Integer(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.user_id"],
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("id"),
    )
    with op.batch_alter_table("recordings", schema=None) as batch_op:
        batch_op.create_index(
            "idx_recordings_recorded_at", ["recorded_at"], unique=False
        )
        batch_op.create_index("idx_recordings_user_id", ["user_id"], unique=False)

    op.create_table(
        "sessions",
        sa.Column("session_id", sa.String(length=36), nullable=False),
        sa.Column("user_id", sa.String(length=36), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.user_id"],
        ),
        sa.PrimaryKeyConstraint("session_id"),
        sa.UniqueConstraint("session_id"),
    )
    with op.batch_alter_table("sessions", schema=None) as batch_op:
        batch_op.create_index("idx_sessions_expires_at", ["expires_at"], unique=False)
        batch_op.create_index("idx_sessions_user_id", ["user_id"], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("sessions", schema=None) as batch_op:
        batch_op.drop_index("idx_sessions_user_id")
        batch_op.drop_index("idx_sessions_expires_at")

    op.drop_table("sessions")
    with op.batch_alter_table("recordings", schema=None) as batch_op:
        batch_op.drop_index("idx_recordings_user_id")
        batch_op.drop_index("idx_recordings_recorded_at")

    op.drop_table("recordings")
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.drop_index("idx_users_username")

    op.drop_table("users")
    # ### end Alembic commands ###
