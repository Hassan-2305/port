// Builds the no-JavaScript version of the portfolio from the same data the
// React app renders, so AI assistants (ChatGPT, Claude, Perplexity), search
// crawlers and link previewers can read the site. Used by vite.config.js.
import { profile, skillGroups } from '../src/data/profile.js';
import { projects, experiences } from '../src/data/content.js';

export const SITE_URL = 'https://mohammedhassan.tech';

const summary =
    "I'm a second-year Computer Science and Engineering student at CUSAT (Cochin University of Science and Technology) in Kochi, India. " +
    "Right now I'm building JurisAI, a Malayalam legal speech-recognition model (1.7% CER so far, measured on synthetic audio). " +
    "Before that: Aekobaba, a B2B packaging marketplace; Vertex, an AI trading platform; and websites for the clubs I'm part of at CUSAT.";

const esc = (s = '') =>
    String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const abs = (url) => (url.startsWith('http') ? url : SITE_URL + url);

// ---------- crawlable HTML (lives inside #root until React mounts) ----------
export function renderStaticHtml() {
    const projectItems = projects.map((p) => `
      <article>
        <h3>${esc(p.title)}${p.year ? ` (${esc(p.year)})` : ''}</h3>
        <p><strong>${esc(p.category)}</strong>${p.status ? `. ${esc(p.status)}` : ''}</p>
        ${p.description ? `<p>${esc(p.description)}</p>` : ''}
        ${p.tech?.length ? `<p>Built with: ${esc(p.tech.join(', '))}</p>` : ''}
        ${p.liveUrl ? `<p><a href="${esc(p.liveUrl)}">${esc(p.liveUrl)}</a></p>` : ''}
      </article>`).join('');

    const experienceItems = experiences.map((e) => `
      <article>
        <h3>${esc(e.role)}, ${esc(e.company)}</h3>
        <p>${esc(e.duration)}. ${esc(e.location)}${e.detail ? `. ${esc(e.detail)}` : ''}</p>
        <p>${esc(e.description)}</p>
        ${e.highlights?.length ? `<ul>${e.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}
        <p>Tools: ${esc(e.tech.join(', '))}</p>
      </article>`).join('');

    const skillItems = skillGroups
        .map((g) => `<li><strong>${esc(g.category)}:</strong> ${esc(g.items.join(', '))}</li>`)
        .join('');

    return `
  <div id="static-content">
    <header>
      <h1>${esc(profile.name)}</h1>
      <p>${esc(profile.role)}, ${esc(profile.focus.replace(' · ', ' and '))}. Based in ${esc(profile.location)}, open to remote work.</p>
      <p>${esc(summary)}</p>
      <nav>
        <a href="${esc(profile.resume)}">Resume (PDF)</a> |
        <a href="${esc(profile.github)}">GitHub</a> |
        <a href="${esc(profile.linkedin)}">LinkedIn</a> |
        <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>
      </nav>
    </header>
    <section id="projects-static"><h2>Projects</h2>${projectItems}</section>
    <section id="experience-static"><h2>Experience</h2>${experienceItems}</section>
    <section id="skills-static"><h2>Skills</h2><ul>${skillItems}</ul></section>
    <section id="education-static">
      <h2>Education</h2>
      <p>B.Tech in Computer Science and Engineering, Cochin University of Science and Technology (CUSAT), 2024 to 2028 (expected). Coursework includes data structures, algorithms and AI/ML.</p>
    </section>
    <section id="contact-static">
      <h2>Contact</h2>
      <p>Email: <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>. Open to internships and freelance work.</p>
    </section>
  </div>`;
}

// ---------- structured data (schema.org Person) ----------
export function renderJsonLd() {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        url: SITE_URL,
        email: `mailto:${profile.email}`,
        jobTitle: profile.role,
        description: summary,
        address: { '@type': 'PostalAddress', addressLocality: 'Kochi', addressRegion: 'Kerala', addressCountry: 'IN' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Cochin University of Science and Technology (CUSAT)' },
        sameAs: [profile.github, profile.linkedin],
        knowsAbout: [...new Set(skillGroups.flatMap((g) => g.items))],
    };
    // </ in JSON would close the script tag early
    return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

// ---------- /llms.txt (plain-text summary that AI tools look for) ----------
export function renderLlmsTxt() {
    const lines = [
        `# ${profile.name}`,
        '',
        `> ${profile.role} (${profile.focus.replace(' · ', ' and ')}), based in ${profile.location}. ${summary}`,
        '',
        '## Links',
        `- [Portfolio](${SITE_URL}/)`,
        `- [Resume (PDF)](${abs(profile.resume)})`,
        `- [GitHub](${profile.github})`,
        `- [LinkedIn](${profile.linkedin})`,
        `- Email: ${profile.email}`,
        '',
        '## Projects',
        ...projects.map((p) => {
            const head = p.liveUrl ? `[${p.title}](${p.liveUrl})` : p.title;
            const meta = [p.category, p.year, p.status].filter(Boolean).join(', ');
            const body = [p.description, p.tech?.length ? `Built with ${p.tech.join(', ')}.` : ''].filter(Boolean).join(' ');
            return `- ${head} (${meta})${body ? `: ${body}` : ''}`;
        }),
        '',
        '## Experience',
        ...experiences.map((e) =>
            [`- ${e.role}, ${e.company} (${e.duration}, ${e.location}): ${e.description}`,
                ...(e.highlights || []).map((h) => `  - ${h}`)].join('\n')),
        '',
        '## Skills',
        ...skillGroups.map((g) => `- ${g.category}: ${g.items.join(', ')}`),
        '',
        '## Education',
        '- B.Tech in Computer Science and Engineering, CUSAT (Cochin University of Science and Technology), 2024 to 2028 (expected)',
        '',
    ];
    return lines.join('\n');
}
