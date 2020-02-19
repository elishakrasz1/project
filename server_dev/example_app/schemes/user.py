from example_app.utils import (
    SQLAlchemyMutation,
    SQLAlchemyInputObjectType,
    input_to_dictionary
)
from example_app.models import User, Project, UserProject, Milestone, ContractValue, Bespoke, Questionnaire
from example_app.extensions import db
import graphene
from graphql_relay.node.node import from_global_id


class UserInputType(SQLAlchemyInputObjectType):
    class Meta:
        model = User

class UserCreateMutation(SQLAlchemyMutation):
    class Meta:
        model = User
        create = True
        delete = False

    class Arguments:
        input = UserInputType(required=True)

    @classmethod
    def mutate(cls, self, info, **kwargs):
        kwargs = input_to_dictionary(kwargs)
        data = kwargs.get("input")
        print(data)
        user = User()
        user.username = data.get("username")
        user.email = data.get("email")
        user.phone = data.get("phone")
        user.ccode = data.get("ccode")

        db.session.add(user)
        db.session.commit()
        user = User.query.get(user.id)
        return cls(output=user, ok=True, message="correct")


class UserUpdateMutation(SQLAlchemyMutation):
    class Meta:
        model = User
        create = False
        delete = False

    class Arguments:
        input = UserInputType(required=True)
        id = graphene.ID(required=True)

    @classmethod
    def mutate(cls, self, info, **kwargs):
        kwargs = input_to_dictionary(kwargs)
        data = kwargs.get("input")
        print(data)
        user = User.query.get(kwargs.get("id"))
        user.username = data.get("username")
        user.email = data.get("email")
        user.phone = data.get("phone")
        user.ccode = data.get("ccode")

        db.session.add(user)
        db.session.commit()
        user = User.query.get(user.id)
        return cls(output=user, ok=True, message="update")
