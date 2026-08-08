# GCS Public Site

`index.html` is the public-beta landing page. Its presentation follows the
existing Arctic Chrome brand system and must describe only current or approved
public-beta scope. It must not present unavailable downloads or deferred
roadmap features as live.

`terms/index.html` and `privacy/index.html` are generated from the approved
Markdown policies in `docs/legal/`:

```sh
dart run tool/render_legal_pages.dart
```

This directory is the complete publication source for the free GitHub Pages
site at `https://gameconnectsocial.com/`, including
`https://gameconnectsocial.com/terms` and
`https://gameconnectsocial.com/privacy`. Squarespace remains the domain
registrar and DNS provider. The pages must remain unauthenticated,
mobile-readable, and current with the policy version recorded in
`docs/legal/policy_manifest.json`.

The separate public repository contains only this directory's publication
artifacts. Publishing or changing DNS is an external content change and must
be verified separately after deployment.
