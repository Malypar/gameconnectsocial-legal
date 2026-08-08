# GCS Public Legal Pages

`terms/index.html` and `privacy/index.html` are generated from the approved
Markdown policies in `docs/legal/`:

```sh
dart run tool/render_legal_pages.dart
```

The generated HTML is the publication source for the free GitHub Pages site at
`https://gameconnectsocial.com/terms` and
`https://gameconnectsocial.com/privacy`. Squarespace remains the domain
registrar and DNS provider. The pages must remain unauthenticated,
mobile-readable, and current with the policy version recorded in
`docs/legal/policy_manifest.json`.

The separate public legal repository contains only this directory's publication
artifacts. Publishing or changing DNS is an external content change and must be
verified separately after deployment.
