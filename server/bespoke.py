class Bespoke(db.Model):
    __tablename__ = 'bespoke'

    id = db.Column(UUID, primary_key=True)
    type = db.Column(db.Integer)
    project_id = db.Column(db.ForeignKey('project.id'))
    CREATED_BY = db.Column(UUID)
    UPDATED_BY = db.Column(UUID)
    UPDATED_AT = db.Column(db.DateTime, server_default=db.func.now())
    CREATED_AT = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
    project = relationship('Project')
    
class BespokeObject(SQLAlchemyObjectType):
   class Meta:
       model = Bespoke
       interfaces = (graphene.relay.Node, )
       
class BespokeInput(graphene.InputObjectType):
    type = graphene.String()
    project_id = graphene.Int()

class CreateBespoke(graphene.Mutation):
    class Arguments:
    
        bespoke_data = BespokeInput()
 
    ok = graphene.Boolean()
    bespoke = graphene.Field(BespokeObject)

    def mutate(root,info, bespoke_data=None):
        bespoke = Bespoke(
            type = bespoke_data.type, project_id = bespoke_data.project_id
        )

        db.session.add(bespoke)
        db.session.commit()   
        ok = True
        return CreateBespoke(bespoke=bespoke, ok=ok)

class UpdateBespokeInput(graphene.InputObjectType, BespokeInput):
    id = graphene.ID(required = True)
    
class UpdateBespoke(graphene.Mutation):
    bespoke_data = UserBespokeInput()

    ok = graphene.Boolean()
    bespoke = graphene.Field(BespokeObject)
    
    bespoke = Bespoke(
            type = bespoke_data.type, project_id = bespoke_data.project_id
        )

        db.session.update(bespoke)
        db.session.commit()   
        ok = True
        return UpdateBespoke(bespoke=bespoke, ok=ok)
