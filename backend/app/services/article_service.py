import re
import unicodedata
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.article import Article
from app.schemas.article import ArticleCreate, ArticleUpdate


def slugify(text: str) -> str:
    """
    Generates an SEO-friendly URL slug.
    Preserves Persian/Arabic/Unicode letters while removing symbols and punctuation.
    Converts ZWNJ (half-spaces) and whitespace into hyphens.
    """
    if not text:
        return "article"
    # Replace Persian/Arabic zero-width non-joiner and zero-width space with a hyphen
    text = text.replace("\u200c", "-").replace("\u200b", "-")
    text = unicodedata.normalize("NFKC", text).strip().lower()
    # Replace whitespace and punctuation/symbols with dashes
    slug = re.sub(r"[^\w\s-]", "", text)
    slug = re.sub(r"[\s_-]+", "-", slug).strip("-")
    # Truncate to maximum 190 characters to leave headroom for collision counters (-1, -2, etc.)
    return slug[:190].rstrip("-") or "article"


class ArticleService:
    @staticmethod
    def _generate_unique_slug(db: Session, base_slug: str, exclude_id: int | None = None) -> str:
        """Ensures the generated slug does not collide with existing articles."""
        base_slug = base_slug[:190].rstrip("-")
        if not base_slug:
            base_slug = "article"
        slug = base_slug
        counter = 1
        while True:
            query = select(Article.id).where(Article.slug == slug)
            if exclude_id is not None:
                query = query.where(Article.id != exclude_id)
            existing = db.execute(query).scalar_one_or_none()
            if not existing:
                return slug
            slug = f"{base_slug}-{counter}"
            counter += 1

    @staticmethod
    def get_articles(
        db: Session,
        skip: int = 0,
        limit: int = 20,
        published_only: bool = True,
    ) -> list[Article]:
        """Fetches paginated list of articles."""
        query = select(Article)
        if published_only:
            query = query.where(Article.is_published.is_(True))
        query = query.order_by(Article.created_at.desc()).offset(skip).limit(limit)
        return list(db.execute(query).scalars().all())

    @staticmethod
    def get_by_id(db: Session, article_id: int) -> Article | None:
        """Retrieves single article by primary key."""
        query = select(Article).where(Article.id == article_id)
        return db.execute(query).scalar_one_or_none()

    @staticmethod
    def get_by_slug(db: Session, slug: str, published_only: bool = True) -> Article | None:
        """Retrieves single article by its URL slug."""
        query = select(Article).where(Article.slug == slug)
        if published_only:
            query = query.where(Article.is_published.is_(True))
        return db.execute(query).scalar_one_or_none()

    @staticmethod
    def create_article(db: Session, article_in: ArticleCreate, author_id: int) -> Article:
        """Creates a new article, ensuring unique slug and setting author."""
        raw_slug = slugify(article_in.slug) if article_in.slug else slugify(article_in.title)
        unique_slug = ArticleService._generate_unique_slug(db, base_slug=raw_slug)

        db_article = Article(
            title=article_in.title.strip(),
            slug=unique_slug,
            summary=article_in.summary.strip() if article_in.summary else None,
            content=article_in.content,
            cover_image_url=article_in.cover_image_url.strip() if article_in.cover_image_url else None,
            is_published=article_in.is_published,
            author_id=author_id,
        )
        try:
            db.add(db_article)
            db.commit()
            db.refresh(db_article)
            return db_article
        except Exception:
            db.rollback()
            raise

    @staticmethod
    def update_article(
        db: Session,
        db_article: Article,
        update_in: ArticleUpdate,
    ) -> Article:
        """Updates an article and handles slug recalculation if updated."""
        update_data = update_in.model_dump(exclude_unset=True)

        if "slug" in update_data and update_data["slug"]:
            raw_slug = slugify(update_data["slug"])
            update_data["slug"] = ArticleService._generate_unique_slug(
                db, base_slug=raw_slug, exclude_id=db_article.id
            )

        if "title" in update_data and isinstance(update_data["title"], str):
            update_data["title"] = update_data["title"].strip()

        if "summary" in update_data and isinstance(update_data["summary"], str):
            update_data["summary"] = update_data["summary"].strip()

        try:
            for field, value in update_data.items():
                setattr(db_article, field, value)

            db.commit()
            db.refresh(db_article)
            return db_article
        except Exception:
            db.rollback()
            raise

    @staticmethod
    def delete_article(db: Session, db_article: Article) -> None:
        """Deletes an article record."""
        try:
            db.delete(db_article)
            db.commit()
        except Exception:
            db.rollback()
            raise