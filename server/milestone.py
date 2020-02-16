class Milestone(db.Model):
    __tablename__ = 'milestone'

    id = db.Column(UUID, primary_key=True)
    type = db.Column(db.Integer)
    project_id = db.Column(db.ForeignKey('project.id'))
    is_payment = db.Column(db.Integer)
    completion_date = db.Column(db.DateTime(255))
    charges = db.Column(db.Numeric)
    is_paied = db.Column(db.ForeignKey('questionnaire.id'))
    CREATED_BY = db.Column(UUID)
    UPDATED_BY = db.Column(UUID)
    UPDATED_AT = db.Column(db.DateTime, server_default=db.func.now())
    CREATED_AT = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())


    questionnaire = relationship('Questionnaire')
    project = relationship('Project')
    
    def __repr__(self):
        return '<Milestone %r>' % self.milestone



    
class MilestoneObject(SQLAlchemyObjectType):
   class Meta:
       model = Milestone
       interfaces = (graphene.relay.Node, )
       
class MilestoneInput(graphene.InputObjectType):
    type = graphene.Int()
    is_payment = graphene.Int()
    completion_date = graphene.types.datetime.DateTime()
    project_id = graphene.Int()
    charges = graphene.Float()
    is_paied = graphene.Int()

class CreateMilestone(graphene.Mutation):
    class Arguments:
    
        milestone_data = MilestoneInput()
 
    ok = graphene.Boolean()
    milestone_data = graphene.Field(MilestoneObject)

    def mutate(root,info, milestone_data=None):
        milestone = Milestone(
            type = milestone_data.type, is_payment = milestone_data.is_payment, completion_date = milestone_data.completion_date, project_id = milestone_data.project_id, charges = milestone_data.charges, is_paied = milestone_data.is_paied
        )

        db.session.add(milestone)
        db.session.commit()   
        ok = True
        return Milestone(milestone=milestone, ok=ok)

class UpdateMilestoneInput(graphene.InputObjectType, MilestoneInput):
    id = graphene.ID(required = True)
    
class UpdateMilestone(graphene.Mutation):
    milestone_data = UpdateMilestoneInput()

    ok = graphene.Boolean()
    milestone = graphene.Field(MilestoneObject)
    
    def mutate(root,info, milestone_data=None):
        milestone = Milestone(
            type = milestone_data.type, is_payment = milestone_data.is_payment, completion_date = milestone_data.completion_date, project_id = milestone_data.project_id, charges = milestone_data.charges, is_paied = milestone_data.is_paied
        )

        db.session.update(milestone)
        db.session.commit()   
        ok = True
        return UpdateMilestone(milestone=milestone, ok=ok)

