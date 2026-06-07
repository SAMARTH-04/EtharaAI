from pydantic import BaseModel
from pydantic import Field


class OrderCreate(BaseModel):
    customer_id: int
    product_id: int
    quantity: int = Field(gt=0)


class OrderResponse(BaseModel):
    id: int
    customer_id: int
    customer_name: str | None = None
    product_id: int
    product_name: str | None = None
    quantity: int
    total_amount: float

    class Config:
        from_attributes = True


class OrderUpdate(BaseModel):
    customer_id: int
    product_id: int
    quantity: int = Field(gt=0)