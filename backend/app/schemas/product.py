from pydantic import BaseModel
from pydantic import Field


class ProductCreate(BaseModel):
    name: str = Field(
        min_length=1,
        max_length=255
    )
    sku: str = Field(
        min_length=1,
        max_length=100
    )
    price: float = Field(gt=0)
    stock_quantity: int = Field(ge=0)


class ProductResponse(ProductCreate):
    id: int

    class Config:
        from_attributes = True
        
class ProductUpdate(BaseModel):
    name: str = Field(
        min_length=1,
        max_length=255
    )
    sku: str = Field(
        min_length=1,
        max_length=100
    )
    price: float = Field(gt=0)
    stock_quantity: int = Field(ge=0)