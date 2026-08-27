/* Dark-themed replica of the real LinkedIn announcement post.

   Replaces the LinkedIn <iframe> embed: a cross-origin frame cannot be
   restyled, so it always rendered as a white card punched into a dark page.
   This is the same coded-replica approach used for the product mocks, and it
   drops the third-party frame (and its cookies) from the page entirely.
   The card links out to the real post so the claim stays verifiable.

   Avatar and photograph are the post's own media, pulled down to public/mock/
   so nothing is hotlinked off LinkedIn's CDN at runtime. */

const POST_URL =
  'https://www.linkedin.com/feed/update/urn:li:share:7470417093172178945/';

const liMark = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

/* LinkedIn reaction badges — coloured disc with a white glyph, as on the post */
const REACTIONS = [
  {
    key: 'like',
    glyph: <path d="M7 10.6h1.9V17H7a.9.9 0 0 1-.9-.9v-4.6a.9.9 0 0 1 .9-.9zm3.2-.6 2.3-4.8a.8.8 0 0 1 1.5.35V8.6h2.7a1.2 1.2 0 0 1 1.18 1.44l-.83 4.5A1.5 1.5 0 0 1 15.57 17H10.2z" />,
  },
  {
    key: 'celebrate',
    glyph: <path d="M12.9 5.2a.75.75 0 1 1 1.3.75l-1 1.7a.75.75 0 1 1-1.3-.75zm3 1.5a.75.75 0 0 1 1 1.1l-1.4 1.3a.75.75 0 1 1-1-1.1zM9.4 5.5a.75.75 0 0 1 1.45-.4l.5 1.9a.75.75 0 1 1-1.45.38zM6.1 12.4l3.4-3.4a1.1 1.1 0 0 1 1.6 0l4.4 4.4a1.1 1.1 0 0 1 0 1.55l-1.5 1.5a2.6 2.6 0 0 1-3.7 0l-4.2-4.05z" />,
  },
  {
    key: 'love',
    glyph: <path d="M12 17.6s-5.3-3.35-5.3-6.9a3 3 0 0 1 5.3-1.95A3 3 0 0 1 17.3 10.7c0 3.55-5.3 6.9-5.3 6.9z" />,
  },
];

const ACTIONS = [
  {
    label: 'Like',
    icon: <path d="M7 10.5h2V17H7zM10.4 10 12.7 5.4a.9.9 0 0 1 1.7.4V8.6h2.6a1.3 1.3 0 0 1 1.27 1.55l-.8 4.4A1.6 1.6 0 0 1 15.9 16h-5.5z" />,
  },
  {
    label: 'Comment',
    icon: <path d="M4.5 5h15v10h-9l-4 3.2V15h-2z" />,
  },
  {
    label: 'Repost',
    icon: <path d="M6.5 9V7.6h9l-2-2 1-1 3.7 3.7-3.7 3.7-1-1 2-2h-7.5V9zm11 6v1.4h-9l2 2-1 1L5.8 15.7 9.5 12l1 1-2 2z" />,
  },
  {
    label: 'Send',
    icon: <path d="M4 11.6 19.5 5 13 20.5l-2.4-6.1z" />,
  },
];

export default function LinkedInPost() {
  return (
    <a
      className="lipost"
      href={POST_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Read the announcement post on LinkedIn"
    >
      <div className="lipost__head">
        <img
          className="lipost__avatar"
          src="/mock/mac-avatar.jpg"
          alt=""
          width="44"
          height="44"
          loading="lazy"
          decoding="async"
        />
        <span className="lipost__who">
          <span className="lipost__name">Mac OBrien</span>
          <span className="lipost__role">Managing Director, AGNT</span>
          <span className="lipost__time">
            2mo
            <i aria-hidden="true">&middot;</i>
            <svg className="lipost__globe" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 1.6c1.1 0 2.3 1.9 2.8 4.7H9.2C9.7 6.5 10.9 4.6 12 4.6zM8.9 10.9h6.2a17 17 0 0 1 0 2.2H8.9a17 17 0 0 1 0-2.2zm.3 3.8h5.6c-.5 2.8-1.7 4.7-2.8 4.7s-2.3-1.9-2.8-4.7z" />
            </svg>
          </span>
        </span>
        <span className="lipost__brand" aria-hidden="true">{liMark}</span>
      </div>

      <p className="lipost__body">
        We just signed <b>Nadia Adan</b> to our car dealership software!!
      </p>
      <p className="lipost__body lipost__body--dim">
        In January, Ryszard, Callum and I were in a coffee shop in
        <span className="lipost__more"> &hellip;more</span>
      </p>

      <span className="lipost__media">
        <img
          className="lipost__media-photo"
          src="/mock/ashford-team.jpg"
          alt="The AGNT team with Nadia Adan of Ashford"
          loading="lazy"
          decoding="async"
        />
      </span>

      <div className="lipost__stats">
        <span className="lipost__reacts" aria-hidden="true">
          {REACTIONS.map((r) => (
            <svg key={r.key} className={`lipost__react lipost__react--${r.key}`} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" />
              <g fill="#fff">{r.glyph}</g>
            </svg>
          ))}
          <span className="lipost__count">160</span>
        </span>
        <span className="lipost__comments">23 comments</span>
      </div>

      <div className="lipost__actions" aria-hidden="true">
        {ACTIONS.map((a) => (
          <span key={a.label} className="lipost__action">
            <svg viewBox="0 0 24 24" fill="currentColor">{a.icon}</svg>
            {a.label}
          </span>
        ))}
      </div>
    </a>
  );
}
