export interface ContactMessage {
  id: number
  full_name: string
  phone: string
  email?: string | null
  subject?: string | null
  message: string
  is_read: boolean
  created_at: string
}

export interface ContactMessageCreate {
  full_name: string
  phone: string
  email?: string | null
  subject?: string | null
  message: string
}

export interface ContactMessageUpdate {
  is_read: boolean
}

export interface ArticleListItem {
  id: number
  title: string
  slug: string
  summary?: string | null
  cover_image_url?: string | null
  is_published: boolean
  author_id: number
  created_at: string
  updated_at: string
}

export interface ArticleResponse extends ArticleListItem {
  content: string
}

export interface ArticleCreate {
  title: string
  slug?: string | null
  summary?: string | null
  content: string
  cover_image_url?: string | null
  is_published?: boolean
}

export interface ArticleUpdate {
  title?: string | null
  slug?: string | null
  summary?: string | null
  content?: string | null
  cover_image_url?: string | null
  is_published?: boolean | null
}

export interface AdminUser {
  id: number
  phone: string
  username: string
  full_name?: string | null
  email?: string | null
  is_active: boolean
  is_superuser: boolean
  created_at: string
}

export interface Token {
  access_token: string
  token_type: string
}

