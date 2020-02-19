from example_app.extensions import db

from sqlalchemy import func
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

# user_role = db.Table(
#     "user_role",
#     db.metadata,
#     db.Column("user_id", db.Integer, db.ForeignKey("user.id")),
#     db.Column("role_id", db.Integer, db.ForeignKey("role.id")),
#     db.UniqueConstraint("user_id", "role_id"),
# )


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String(20))
    # password = db.Column(db.String(100), nullable=False)
    # roles = db.relationship("Role", secondary=user_role, back_populates="users")
    # role_names = key_ids = association_proxy("roles", "name")
    username = db.Column(db.String(255))
    email = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(16))
    ccode = db.Column(db.String(8))
    CREATED_BY = db.Column(db.Integer)
    UPDATED_BY = db.Column(db.Integer)
    UPDATED_AT = db.Column(db.DateTime, server_default=db.func.now())
    CREATED_AT = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    # def __repr__(self):
    #     return '<User %r>' % self.username

class UserProject(db.Model):
    __tablename__ = 'user_project'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey('user.id'))
    project_id = db.Column(db.ForeignKey('project.id'))
    CREATED_BY = db.Column(db.Integer)
    UPDATED_BY = db.Column(db.Integer)
    UPDATED_AT = db.Column(db.DateTime, server_default=db.func.now())
    CREATED_AT = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    project = db.relationship('Project')
    user = db.relationship('User')

    # def __repr__(self):
    #     return '<UserProject %r>' % self.project_id

class Project(db.Model):
    __tablename__ = 'project'

    id = db.Column(db.Integer, primary_key=True)
    c_project_id = db.Column(db.String(255))
    project_name = db.Column(db.String(255))
    signature_date = db.Column(db.DateTime(255))
    service_commencement = db.Column(db.DateTime(255))
    contract_duration_month = db.Column(db.Integer)
    contract_value_usd = db.Column(db.Numeric)
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
    agreement_party = db.Column(db.Integer)
    type_of_service = db.Column(db.Integer)
    currency = db.Column(db.Integer)
    service_credit_cap_type = db.Column(db.Integer)
    service_level_cap_percentage = db.Column(db.Numeric)
    CREATED_BY = db.Column(db.Integer)
    UPDATED_BY = db.Column(db.Integer)
    UPDATED_AT = db.Column(db.DateTime, server_default=db.func.now())
    CREATED_AT = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
    
    # def __repr__(self):
    #     return '<Project %r>' % self.project_name

class Bespoke(db.Model):
    __tablename__ = 'bespoke'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Integer)
    project_id = db.Column(db.ForeignKey('project.id'))
    CREATED_BY = db.Column(db.Integer)
    UPDATED_BY = db.Column(db.Integer)
    UPDATED_AT = db.Column(db.DateTime, server_default=db.func.now())
    CREATED_AT = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
    
    project = db.relationship('Project')
    
    # def __repr__(self):
    #     return '<Bespoke %r>' % self.type
    
class ContractValue(db.Model):
    __tablename__ = 'contract_value'

    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer)
    contract_value_usd = db.Column(db.Numeric)
    project_id = db.Column(db.ForeignKey('project.id'))
    estimated_cost_usd = db.Column(db.Numeric)
    CREATED_BY = db.Column(db.Integer)
    UPDATED_BY = db.Column(db.Integer)
    UPDATED_AT = db.Column(db.DateTime, server_default=db.func.now())
    CREATED_AT = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
    
    project = db.relationship('Project')
    
    # def __repr__(self):
    #     return '<ContractValue %r>' % self.contract_value_usd
    
class Milestone(db.Model):
    __tablename__ = 'milestone'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Integer)
    project_id = db.Column(db.ForeignKey('project.id'))
    is_payment = db.Column(db.Integer)
    completion_date = db.Column(db.DateTime(255))
    charges = db.Column(db.Numeric)
    is_paied = db.Column(db.ForeignKey('questionnaire.id'))
    CREATED_BY = db.Column(db.Integer)
    UPDATED_BY = db.Column(db.Integer)
    UPDATED_AT = db.Column(db.DateTime, server_default=db.func.now())
    CREATED_AT = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    questionnaire = db.relationship('Questionnaire')
    project = db.relationship('Project')
    
    # def __repr__(self):
    #     return '<Milestone %r>' % self.milestone

class Questionnaire(db.Model):
    __tablename__ = 'questionnaire'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.ForeignKey('project.id'))
    user_filler = db.Column(db.ForeignKey('user.id'))
    to_date = db.Column(db.DateTime(255))
    is_transition_completed = db.Column(db.Integer)
    is_transition_charges_paied = db.Column(db.Integer)
    is_transformation_completed = db.Column(db.Integer)
    missed_kpi = db.Column(db.Integer)
    missed_service_level = db.Column(db.Integer)
    moved_service_level = db.Column(db.Integer)
    payable_service_credits = db.Column(db.Integer)
    paied_service_credits = db.Column(db.Integer)
    is_paied_passed = db.Column(db.Integer)
    pay_back = db.Column(db.Numeric)
    is_customer_satisfaction_report = db.Column(db.Integer)
    customer_satisfaction_result = db.Column(db.Integer)
    is_governance = db.Column(db.Integer)
    is_governance_minute = db.Column(db.Integer)
    is_additional_governance = db.Column(db.Integer)
    additional_governance_cause = db.Column(db.Integer)
    is_formal_notices = db.Column(db.Integer)
    formal_notices_about = db.Column(db.Integer)
    formal_notices_type = db.Column(db.Integer)
    initiated_CCNs = db.Column(db.Integer)
    signed_CCNs = db.Column(db.Integer)
    signed_CCNs_type = db.Column(db.Integer)
    key_personnel_changed = db.Column(db.Integer)
    supplier_personnel_changed = db.Column(db.Integer)
    customer_personnel_changed = db.Column(db.Integer)
    invoiced_charges_usd = db.Column(db.Numeric)
    is_not_invoiced = db.Column(db.Integer)
    CREATED_BY = db.Column(db.Integer)
    UPDATED_BY = db.Column(db.Integer)
    UPDATED_AT = db.Column(db.DateTime, server_default=db.func.now())
    CREATED_AT = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
    
    project = db.relationship('Project')
    user = db.relationship('User')
    
# def __repr__(self):
#         return '<Questionnaire %r>' % self.user_filler
    
# class Role(db.Model):
#     __tablename__ = "role"
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(255))

#     users = db.relationship("User", secondary=user_role, back_populates="roles")


# class Article(db.Model):
#     __tablename__ = "article"
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(255), nullable=False)
#     description = db.Column(db.String(255))
#     author_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
#     tags = db.Column(db.String(255))
#     text = db.Column(db.Text(), nullable=False)
#     create_time = db.Column(db.DateTime, default=func.now())
#     update_time = db.Column(
#         db.DateTime, default=func.now(), onupdate=func.now(), doc=u"marvin"
#     )

