from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, field_validator
from app.core.security import sanitize_content


class ArticleBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=200, description="Article title")
    summary: str | None = Field(default=None, max_length=500, description="Short summary/excerpt")
    content: str = Field(..., min_length=10, description="Full markdown/HTML body content")
    cover_image_url: str | None = Field(default=None, max_length=500, description="Cover image static URL")
    is_published: bool = Field(default=False, description="Publication status")

    @field_validator("title", "summary", "content")
    @classmethod
    def sanitize_article_fields(cls, v: str | None) -> str | None:
        if v is None:
            return v
        return sanitize_content(v)


class ArticleCreate(ArticleBase):
    slug: str | None = Field(
        default=None,
        max_length=220,
        description="Optional custom slug. If omitted, will be generated automatically from the title.",
    )


class ArticleUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=3, max_length=200)
    slug: str | None = Field(default=None, max_length=220)
    summary: str | None = Field(default=None, max_length=500)
    content: str | None = Field(default=None, min_length=10)
    cover_image_url: str | None = Field(default=None, max_length=500)
    is_published: bool | None = None

    @field_validator("title", "summary", "content")
    @classmethod
    def sanitize_article_update_fields(cls, v: str | None) -> str | None:
        if v is None:
            return v
        return sanitize_content(v)


# Lightweight schema for cards/lists (omits large content body)
class ArticleListItem(BaseModel):
    id: int
    title: str
    slug: str
    summary: str | None = None
    cover_image_url: str | None = None
    is_published: bool
    author_id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Detailed view with full content
class ArticleResponse(ArticleListItem):
    content: str

    model_config = ConfigDict(from_attributes=True)