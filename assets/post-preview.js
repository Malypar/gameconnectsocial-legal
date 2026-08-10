(() => {
  const id = new URLSearchParams(window.location.search).get('id') || '';
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const status = document.querySelector('#status');
  const openApp = document.querySelector('#open-app');
  if (!uuid.test(id)) {
    status.textContent = 'This post link is invalid.';
    return;
  }
  openApp.href = `com.unosyn.gameconnect://post?id=${encodeURIComponent(id)}`;
  fetch(`https://qcrfhakzogfisqmaejfh.supabase.co/functions/v1/public-post-preview?id=${encodeURIComponent(id)}`, {
    headers: { Accept: 'application/json' },
  })
    .then((response) => response.ok ? response.json() : Promise.reject())
    .then(({ post }) => {
      const author = post.author || {};
      document.querySelector('#display-name').textContent = author.displayName || author.username || 'GCS Player';
      document.querySelector('#handle').textContent = author.username ? `@${author.username}` : '';
      document.querySelector('#post-copy').textContent = post.content || post.title || 'Shared on Game Connect Social';
      if (author.avatarUrl) document.querySelector('#avatar').src = author.avatarUrl;
      if (post.imageUrl) {
        const image = document.querySelector('#post-image');
        image.src = post.imageUrl;
        image.hidden = false;
      }
      status.hidden = true;
      document.querySelector('#post').hidden = false;
    })
    .catch(() => { status.textContent = 'This post is unavailable or no longer public.'; });
})();
