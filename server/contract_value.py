class ContractValue(db.Model):
    __tablename__ = 'contract_value'

    id = db.Column(UUID, primary_key=True)
    year = db.Column(db.Integer)
    contract_value_usd = db.Column(db.Numeric)
    project_id = db.Column(db.ForeignKey('project.id'))
    estimated_cost_usd = db.Column(db.Numeric)
    CREATED_BY = db.Column(UUID)
    UPDATED_BY = db.Column(UUID)
    UPDATED_AT = db.Column(db.DateTime, server_default=db.func.now())
    CREATED_AT = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())


    project = relationship('Project')
    
    def __repr__(self):
        return '<ContractValue %r>' % self.contract_value_usd
    
    
class ContractValueObject(SQLAlchemyObjectType):
   class Meta:
       model = ContractValue
       interfaces = (graphene.relay.Node, )
       
class ContractValueInput(graphene.InputObjectType):
    year = graphene.Int()
    contract_value_usd = graphene.Float()
    project_id = graphene.Int()
    estimated_cost_usd = graphene.Float()

class CreateContractValue(graphene.Mutation):
    class Arguments:
    
        contract_value_data = ContractValueInput()
 
    ok = graphene.Boolean()
    contract_value_data = graphene.Field(ContractValue)

    def mutate(root,info, contract_value_data=None):
        contract_value = ContractValue(
            year = contract_value_data.year, contract_value_usd = contract_value_data.contract_value_usd, project_id = contract_value_data.project_id, estimated_cost_usd = contract_value_data.estimated_cost_usd
        )

        db.session.add(contract_value)
        db.session.commit()   
        ok = True
        return CreateContractValue(contract_value=contract_value, ok=ok)

class UpdateContractValueInput(graphene.InputObjectType, ContractValueInput):
    id = graphene.ID(required = True)
    
class UpdateContractValue(graphene.Mutation):
    contract_value_data = UpdateContractValueInput()

    ok = graphene.Boolean()
    contract_value = graphene.Field(ContractValueObject)
    
    def mutate(root,info, contract_value_data=None):
    contract_value = ContractValue(
            year = contract_value_data.year, contract_value_usd = contract_value_data.contract_value_usd, project_id = contract_value_data.project_id, estimated_cost_usd = contract_value_data.estimated_cost_usd
        )

        db.session.update(contract_value)
        db.session.commit()   
        ok = True
        return UpdateContractValue(user=user, ok=ok)

