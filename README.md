# 프랑스어 과외 Website

Static website for `https://프랑스어과외.com`, hosted with GitHub Pages.

The site promotes French tutoring in Korea with online, in-person, conversation, and learning-guide pages.

## Goals

- Keep the public site fast, indexable, and stable.
- Preserve existing SEO URLs.
- Keep the repository focused on deployable website files.
- Keep local research, exports, credentials, and API tooling out of Git.

## Public Site Layout

The main HTML files intentionally stay at the repository root because they are public URLs already referenced by the sitemap and search engines.

```text
/
  index.html                         Homepage and main commercial landing page
  online-french-tutoring.html         Online lesson landing page
  in-person-french-tutoring.html      Seoul in-person lesson landing page
  conversation-french-lessons.html    Conversation lesson landing page
  french-lessons-guide-korea.html     Informational learning guide
  links.html                          Link-in-bio style page
  pas-de-soucis/                      French expression article and media
  image/                              Site images
  favicons/                           Icons and manifest assets
  style.css                           Shared styling
  sitemap.xml                         Public sitemap
  robots.txt                          Crawl directives
  sw.js, sw-register.js               Service worker cache
  consent.js                          Consent banner logic
```

Do not move root HTML pages unless you also plan URL redirects and sitemap/canonical updates. Moving them directly would create new URLs and can damage existing rankings.

## Current SEO Direction

Recent analysis showed:

- Commercial keywords such as `프랑스어 과외` already rank mostly through the homepage.
- Informational terms such as `프랑스어 회화 연습 방법`, `프랑스어 발음 연습 방법`, `프랑스어 문법`, `프랑스어 학습 팁`, and `프랑스어 학습 방법` needed a stronger ranking URL.
- `french-lessons-guide-korea.html` was strengthened as the informational hub and linked from related commercial pages.

## Deployment

GitHub Pages publishes from the repository branch configured in GitHub.

Typical deployment flow:

```bash
git status
git diff --check
git add .gitignore README.md index.html french-lessons-guide-korea.html online-french-tutoring.html in-person-french-tutoring.html conversation-french-lessons.html sitemap.xml sw.js
git commit -m "Improve French learning guide SEO"
git push
```

Before committing, verify local tooling and secret files are not staged:

```bash
git status --short --untracked-files=all
git check-ignore -v tools/seo/ archives/
```

## Safety Rules

- Never commit `.env`, OAuth tokens, API keys, client secret JSON, or service account JSON.
- Keep SEO research tooling and generated exports local-only.
- Keep public URL changes conservative because this is an SEO-sensitive static site.
- Prefer small, reviewable website edits backed by SEO data.
