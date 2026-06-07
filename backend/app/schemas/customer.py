from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import Field
from pydantic import field_validator


class CustomerCreate(BaseModel):
    full_name: str = Field(
        min_length=1,
        max_length=255
    )

    email: EmailStr
    phone_number: str = Field(
        min_length=10,
        max_length=15
    )
    @field_validator(
        "full_name",
        "phone_number"
    )
    @classmethod
    def validate_not_blank(
        cls,
        value: str
    ):
        if not value.strip():
            raise ValueError(
                "Field cannot be blank"
            )
        return value
    @field_validator("phone_number")
    @classmethod
    def validate_phone(
        cls,
        value: str
    ):
        if not value.isdigit():
            raise ValueError(
                "Phone number must contain only digits"
            )
        return value

class CustomerResponse(CustomerCreate):
    id: int

    class Config:
        from_attributes = True