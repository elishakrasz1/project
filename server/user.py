class User(db.Model):
    __tablename__ = 'user'
    
    id = db.Column(UUID, primary_key=True)
    username = db.Column(db.String(255))
    email = db.Column(db.String(255))
    phone = db.Column(db.String(16))
    ccode = db.Column(db.String(8))
    CREATED_BY = db.Column(UUID)
    UPDATED_BY = db.Column(UUID)
    UPDATED_AT = db.Column(db.DateTime, server_default=db.func.now())
    CREATED_AT = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    
    def __repr__(self):
        return '<User %r>' % self.username
    
class UserObject(SQLAlchemyObjectType):
   class Meta:
       model = User
       interfaces = (graphene.relay.Node, )
       
class UserInput(graphene.InputObjectType):
    username = graphene.String()
    email = graphene.String()
    phone = graphene.String()
    ccode = graphene.String()

class CreateUser(graphene.Mutation):
    class Arguments:
    
        user_data = UserInput()
 
    ok = graphene.Boolean()
    user = graphene.Field(UserObject)

    def mutate(root,info, user_data=None):
        user = User(
            username=user_data.username, email=user_data.email, phone=user_data.phone, ccode=user_data.ccode
        )

        db.session.add(user)
        db.session.commit()   
        ok = True
        return CreateUser(user=user, ok=ok)

class UpdateUserInput(graphene.InputObjectType, UserInput):
    id = graphene.ID(required = True)
    
class UpdateUser(graphene.Mutation):
    user_data = UserUpdateInput()

    ok = graphene.Boolean()
    user = graphene.Field(UserObject)
    
    user = User(
            username=user_data.username, email=user_data.email, phone=user_data.phone, ccode=user_data.ccode
        )

        db.session.update(user)
        db.session.commit()   
        ok = True
        return UpdateUser(user=user, ok=ok)
