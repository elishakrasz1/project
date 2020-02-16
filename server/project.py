

class Project(db.Model):
    __tablename__ = 'project'

    id = db.Column(UUID, primary_key=True)
    c_project_id = db.Column(db.String(255))
    project_name = db.Column(db.String(255))
    signature_date = db.Column(db.DateTime(255))
    service_commencement = db.Column(db.DateTime(255))
    contract_duration_month = db.Column(db.Integer)
    contract_value_usd = db.Column('contract value_usd', db.Numeric)
    projected_margin_usd = db.Column(db.Numeric)
    component_of_bespoke = db.Column(db.Integer)
    often_provide_services = db.Column(db.Integer)
    is_transition_plan = db.Column(db.Integer)
    transition_plan_date = db.Column(db.DateTime(255))
    is_transition_charges = db.Column(db.Integer)
    transition_charges = db.Column(db.Numeric)
    milestones = db.Column(db.Integer)
    payment_milestones = db.Column(db.Integer)
    service_levels_without_credit = db.Column(db.Integer)
    service_credit_cap = db.Column(db.Integer)
    is_transformation_plan = db.Column(db.Integer)
    transformation_plan_start = db.Column(db.DateTime(255))
    transformation_plan_end = db.Column(db.DateTime(255))
    service_levels_with_credit = db.Column(db.Integer)
    is_earn_back = db.Column(db.Integer)
    is_customer_satisfaction_report = db.Column(db.Integer)
    customer_satisfaction_form = db.Column(db.Integer)
    governance_type = db.Column(db.Integer)
    governance_often = db.Column(db.Integer)
    key_personnel = db.Column(db.Integer)
    supplier_personnel = db.Column(db.Integer)
    customer_personnel = db.Column(db.Integer)
    planned_negotiation_month = db.Column(db.Integer)
    negotiations_month = db.Column(db.Integer)
    sole_sourced = db.Column(db.Integer)
    proposed_period_weeks = db.Column(db.Integer)
    actual_period_weeks = db.Column(db.Integer)
    is_due_diligence_completed = db.Column(db.Integer)
    agreement_party = db.Column('agreement party', db.Integer)
    type_of_service = db.Column(db.Integer)
    currency = db.Column(db.Integer)
    service_credit_cap_type = db.Column(db.Integer)
    service_level_cap_percentage = db.Column(db.Numeric)
    CREATED_BY = db.Column(UUID)
    UPDATED_BY = db.Column(UUID)
    UPDATED_AT = db.Column(db.DateTime, server_default=db.func.now())
    CREATED_AT = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())


class ProjectObject(SQLAlchemyObjectType):
   class Meta:
       model = Project
       interfaces = (graphene.relay.Node, )



class ProjectInput(graphene.InputObjectType):
    c_project_id = graphene.String()
    project_name = graphene.String()
    signature_date = graphene.types.datetime.DateTime()
    service_commencement = graphene.types.datetime.DateTime()
    contract_duration_month = graphene.Int()
    contract_value_usd = graphene.Float()
    projected_margin = graphene.Float()
    component_of_bespoke = graphene.Int()
    often_provide_services = graphene.Int()
    is_transition_plan = graphene.Int()
    transition_plan_date = graphene.types.datetime.DateTime()
    is_transition_charges = graphene.Int()
    transition_charges = graphene.Float()
    is_transformation_plan = graphene.Int()
    transformation_plan_start = graphene.types.datetime.DateTime()
    transformation_plan_end = graphene.types.datetime.DateTime()
    service_levels_without_credit = graphene.Int()
    service_credit_cap = graphene.Int()
    service_levels = graphene.Int()
    is_earn_back = graphene.Int()
    is_customer_satisfaction_report = graphene.Int()
    customer_satisfaction_form = graphene.Int()
    governance_type = graphene.Int()
    governance_often = graphene.Int()
    key_personnel = graphene.Int()
    supplier_personnel = graphene.Int()
    customer_personnel = graphene.Int()
    planned_negotiation_month = graphene.Int()
    negotiations_month = graphene.Int()
    sole_sourced = graphene.Int()
    proposed_period_weeks = graphene.Int()
    actual_period_weeks = graphene.Int()
    is_due_diligence_completed = graphene.Int()
    agreement_party = graphene.Int()
    type_of_service = graphene.Int()
    currency = graphene.Int()
    service_level_without_credit = graphene.Int()
    service_level_cap_percentage = graphene.Int()
    service_credit_cap_type = graphene.Int()


class CreateProject(graphene.Mutation):
    class Arguments:

        project_data = ProjectInput()

    ok = graphene.Boolean()
    project = graphene.Field(ProjectObject)

    def mutate(root, info, project_data=None):
        project = Project(
            c_project_id=project_data.c_project_id, project_name = project_data.project_name, signature_date=project_data.signature_date, service_commencement=project_data.service_commencement, contract_duration_month=project_data.contract_duration_month, contract_value_usd=project_data.contract_value_usd, projected_margin=project_data.projected_margin, often_provide_services=project_data.often_provide_services, is_transition_plan=project_data.is_transition_plan,
            transition_plan_date=project_data.transition_plan_date,
            is_transition_charges=project_data.is_transition_charges,
            transition_charges=project_data.transition_charges, is_transformation_plan=project_data.is_transformation_plan, transformation_plan_start=project_data.transformation_plan_start, transformation_plan_end=project_data.transformation_plan_end, is_earn_back=project_data.is_earn_back, is_customer_satisfaction_report=project_data.is_customer_satisfaction_report, service_levels_without_credit=project_data.service_levels_without_credit, service_credit_cap_type=project_data.service_credit_cap_type, customer_satisfaction_form=project_data.customer_satisfaction_form, governance_type=project_data.governance_type, governance_often=project_data.governance_often, key_personnel=project_data.key_personnel, supplier_personnel=project_data.supplier_personnel, customer_personnel=project_data.customer_personnel, planned_negotiation_month=project_data.planned_negotiation_month, negotiations_month=project_data.negotiations_month, sole_sourced=project_data.sole_sourced, proposed_period_weeks=project_data.proposed_period_weeks, actual_period_weeks=project_data.actual_period_weeks, is_due_diligence_completed=project_data.is_due_diligence_completed, agreement_party = project_data.agreement_party, type_of_service = project_data.type_of_service, currency = project_data.currency, service_level_without_credit = project_data.service_level_without_credit, service_level_cap_percentage = project_data.service_level_cap_percentage, service_credit_cap_type = project_data.service_credit_cap_type
        )
        db.session.add(project)
        db.session.commit()
        ok = True
        return CreateProject(project=project, ok=ok)


# def input_to_dictionary(input):
#     """Method to convert Graphene inputs into dictionary"""
#     dictionary = {}
#     for key in input:
#         # Convert GraphQL global id to database id
#         if key[-2:] == 'id':
#             input[key] = from_global_id(input[key])[1]
#         dictionary[key] = input[key]
#     return dictionary

from graphql_relay.node.node import from_global_id

class UpdateProjectInput(graphene.InputObjectType, ProjectInput):
    id = graphene.ID(required = True)
    
class UpdateProject(graphene.Mutation):
    project_data = UpdateProjectInput()

    ok = graphene.Boolean()
    project = graphene.Field(ProjectObject)
    
    def mutate(root, info, project_data=None):
        project = Project(
            c_project_id=project_data.c_project_id, project_name = project_data.project_name, signature_date=project_data.signature_date, service_commencement=project_data.service_commencement, contract_duration_month=project_data.contract_duration_month, contract_value_usd=project_data.contract_value_usd, projected_margin=project_data.projected_margin, often_provide_services=project_data.often_provide_services, is_transition_plan=project_data.is_transition_plan,
            transition_plan_date=project_data.transition_plan_date,
            is_transition_charges=project_data.is_transition_charges,
            transition_charges=project_data.transition_charges, is_transformation_plan=project_data.is_transformation_plan, transformation_plan_start=project_data.transformation_plan_start, transformation_plan_end=project_data.transformation_plan_end, is_earn_back=project_data.is_earn_back, is_customer_satisfaction_report=project_data.is_customer_satisfaction_report, service_levels_without_credit=project_data.service_levels_without_credit, service_credit_cap_type=project_data.service_credit_cap_type, customer_satisfaction_form=project_data.customer_satisfaction_form, governance_type=project_data.governance_type, governance_often=project_data.governance_often, key_personnel=project_data.key_personnel, supplier_personnel=project_data.supplier_personnel, customer_personnel=project_data.customer_personnel, planned_negotiation_month=project_data.planned_negotiation_month, negotiations_month=project_data.negotiations_month, sole_sourced=project_data.sole_sourced, proposed_period_weeks=project_data.proposed_period_weeks, actual_period_weeks=project_data.actual_period_weeks, is_due_diligence_completed=project_data.is_due_diligence_completed, agreement_party = project_data.agreement_party, type_of_service = project_data.type_of_service, currency = project_data.currency, service_level_without_credit = project_data.service_level_without_credit, service_level_cap_percentage = project_data.service_level_cap_percentage, service_credit_cap_type = project_data.service_credit_cap_type
        )
        db.session.update(project)
        db.session.commit()
        ok = True
        return UpdateProject(project=project, ok=ok)

    
    


