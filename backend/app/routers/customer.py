from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.customer import (
    CustomerCreate,
    CustomerResponse
)

from app.services.customer_service import (
    create_customer,
    get_customers,
    get_customer,
    delete_customer
)

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)

@router.post(
    "",
    response_model=CustomerResponse,
    status_code=201
)
def create(
    customer: CustomerCreate,
    db: Session = Depends(get_db)
):
    return create_customer(
        db,
        customer
    )
    
@router.get(
    "",
    response_model=list[CustomerResponse]
)
def get_all(
    db: Session = Depends(get_db)
):
    return get_customers(db)

@router.get(
    "/{customer_id}",
    response_model=CustomerResponse
)
def get_one(
    customer_id: int,
    db: Session = Depends(get_db)
):
    return get_customer(
        db,
        customer_id
    )
    
@router.delete("/{customer_id}")
def delete(
    customer_id: int,
    db: Session = Depends(get_db)
):
    return delete_customer(
        db,
        customer_id
    )