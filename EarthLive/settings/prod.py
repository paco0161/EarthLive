from .base import *

DEBUG = False

ALLOWED_HOSTS = ['.vercel.app']

STATIC_ROOT = BASE_DIR / 'staticfiles_build' / 'static'

SECURE_HSTS_INCLUDE_SUBDOMAINS = True

# SECURE_SSL_REDIRECT = True

# SESSION_COOKIE_SECURE = True

# CSRF_COOKIE_SECURE = True

SECURE_HSTS_PRELOAD = True