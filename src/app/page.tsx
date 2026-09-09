import Image from 'next/image';
import Link from 'next/link';
import CinematicHero, { type HeroPlane } from '@/components/CinematicHero';
import { categoryLabel, experience, experiments, profile, skills } from '@/data/portfolio';
import { publishedWork } from '@/lib/work';

/* soshub is `featured` but carries no `media`, so it is excluded from
   `featuredWithMedia` by construction and rendered as its own typographic
   entry below instead of as an image feature. */
const featuredWithMedia = publishedWork.filter((entry) => entry.featured && entry.media);
// Guaranteed present in portfolio.ts; asserted rather than optionally chained
// so the render below can use its fields directly.
const soshub = publishedWork.find((entry) => entry.slug === 'soshub')!;
const additional = publishedWork.filter((entry) => !entry.featured);

/* The scene reuses screenshots that Selected work presents properly below.
   Pulling them from the same records keeps one source of truth: if a media
   entry changes in portfolio.ts, the scene follows. */
function plane(slug: string): HeroPlane {
    const entry = publishedWork.find((item) => item.slug === slug);
    if (!entry?.media) throw new Error(`Hero plane "${slug}" has no media in portfolio.ts`);
    return entry.media;
}

export default function Home() {
    return (
        <main id="main" tabIndex={-1}>
            <CinematicHero
                name={profile.name}
                role={profile.role}
                tagline="Web interfaces. Systems thinking."
                focal={plane('corebridge')}
                support={[plane('8gigki'), plane('svis')]}
            />

            <section className="band" id="work" aria-labelledby="work-title">
                <div className="shell">
                    <h2 id="work-title" className="band-title">
                        Selected work
                    </h2>
                    {featuredWithMedia.map((entry, index) => (
                        <article className={`feature${index % 2 === 1 ? ' feature--flip' : ''}`} key={entry.slug}>
                            <div className="feature-media">
                                <Link className="feature-shot" href={`/work/${entry.slug}`}>
                                    {/* The primary presentation of this work, so it takes the entry's
                                        real alt text rather than the empty alt used for the hero's
                                        decorative duplicates of the same screenshots. */}
                                    <Image
                                        src={entry.media!.src}
                                        alt={entry.media!.alt}
                                        width={entry.media!.width}
                                        height={entry.media!.height}
                                        sizes="(max-width: 900px) 90vw, 640px"
                                    />
                                </Link>
                            </div>
                            <div className="feature-body">
                                <p className="mono feature-index">
                                    {String(index + 1).padStart(2, '0')} — {categoryLabel(entry.category)} · {entry.period}
                                </p>
                                <h3>{entry.title}</h3>
                                <p className="feature-summary">{entry.summary}</p>
                                <p className="mono feature-role">{entry.role}</p>
                                <ul className="tag-row" aria-label="Technologies">
                                    {entry.technologies.map((tech) => (
                                        <li key={tech} className="mono">
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                                <Link className="text-link" href={`/work/${entry.slug}`}>
                                    Read the notes
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="band soshub" id="soshub" aria-labelledby="soshub-title">
                <div className="shell">
                    <article className="soshub-body">
                        <div className="soshub-mark">
                            {/* Continues the index the two image features started (01, 02), derived
                                from their count rather than written as a literal "03". */}
                            <p className="mono feature-index">
                                {String(featuredWithMedia.length + 1).padStart(2, '0')} — {categoryLabel(soshub.category)} · {soshub.period}
                            </p>
                            {/* The band's only heading: the entry's real title, rendered verbatim
                                (it already carries the "SOSHUB" name), so the band is not left
                                with the literal string "SOSHUB" repeated as two consecutive
                                headings. This is the band's h2, matching the heading level every
                                other band uses for its own title. */}
                            <h2 id="soshub-title">{soshub.title}</h2>
                            <p className="soshub-label mono">Internal platform · no public screenshots · no demo link</p>
                            <p className="feature-summary">{soshub.summary}</p>
                        </div>
                        <div className="soshub-detail">
                            <p className="mono feature-role">{soshub.role}</p>
                            <ul className="soshub-contributions">
                                {soshub.contributions.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            <ul className="tag-row" aria-label="Technologies">
                                {soshub.technologies.map((tech) => (
                                    <li key={tech} className="mono">
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                            {/* Rendered verbatim — do not paraphrase or soften. */}
                            <p className="soshub-inspect">{soshub.inspect}</p>
                            <Link className="text-link" href={`/work/${soshub.slug}`}>
                                Read the contribution record
                            </Link>
                        </div>
                    </article>
                </div>
            </section>

            <section className="band" id="more" aria-labelledby="more-title">
                <div className="shell">
                    <h2 id="more-title" className="band-title">
                        Additional projects
                    </h2>
                    <ul className="compact-list">
                        {additional.map((entry) => (
                            <li key={entry.slug}>
                                <Link className="compact-row" href={`/work/${entry.slug}`}>
                                    <h3>{entry.title}</h3>
                                    <p>{entry.summary}</p>
                                    <span className="compact-meta mono">
                                        <b>{categoryLabel(entry.category)}</b>
                                        {entry.period}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Task 7, correction 5: Experiments moves past Selected work, SOSHUB
                and Additional projects — it is not the leftover first band it
                used to be. Brought over to the same .band / .band-title shell
                pattern those three finished bands already use. */}
            <section className="band" id="lab" aria-labelledby="lab-title">
                <div className="shell">
                    <h2 id="lab-title" className="band-title">
                        Experiments
                    </h2>
                    <div className="lab-list">
                        {experiments.map((experiment) => (
                            <article className="lab-entry" key={experiment.slug}>
                                <h3>
                                    <Link href={experiment.href}>{experiment.title}</Link>
                                </h3>
                                <p>{experiment.summary}</p>
                                <p className="lab-instruction">{experiment.instruction}</p>
                                <ul className="tag-row" aria-label="What it demonstrates">
                                    {experiment.demonstrates.map((item) => (
                                        <li key={item} className="mono">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills and about share one band and one #about anchor, matching
                the design board's single "Skills and about" section — Skills
                is not a separate stop on the page. */}
            <section className="band" id="about" aria-labelledby="about-title">
                <div className="shell">
                    <h2 id="about-title" className="band-title">
                        Skills and about
                    </h2>
                    <div className="about-grid">
                        <div className="about-copy">
                            <p>
                                I am a full-stack engineer based in {profile.location}. I started in systems
                                administration and IT operations, moved into web development in 2022, and have worked
                                on enterprise platforms and independent client projects since.
                            </p>
                            <p>
                                That first job still shapes how I work. I am as interested in the pipeline and the
                                tests as in the interface, and I would rather modernize something that people already
                                depend on than start over.
                            </p>

                            <h3 className="subhead">Career</h3>
                            <ol className="career-list">
                                {experience.map((item) => (
                                    <li key={item.company}>
                                        <p className="mono career-period">{item.period}</p>
                                        <div>
                                            <h4>{item.company}</h4>
                                            <p className="mono career-role">{item.role}</p>
                                            <p>{item.detail}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <figure className="portrait">
                            <Image
                                src="/hero3.webp"
                                alt={`${profile.name}, ${profile.role}`}
                                width={1507}
                                height={2842}
                                sizes="(max-width: 800px) 60vw, 320px"
                            />
                        </figure>
                    </div>

                    <h3 className="subhead">Skills</h3>
                    <ul className="evidence-list">
                        {skills.map((item) => (
                            <li key={item.skill}>
                                <span className="evidence-skill">{item.skill}</span>
                                <Link className="mono" href={item.href}>
                                    {item.evidence}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Contact: the mailto is the primary action. The board's own "Get in
                touch" frame renders it as an underlined text link rather than a
                filled .hero-cta pill (correction 1: board wins over the brief's
                CSS), so it uses .text-link here instead. The footer keeps its own
                copy of these links as site-wide chrome, but #contact now lands
                here instead of on the footer element (correction 3). */}
            <section className="band" id="contact" aria-labelledby="contact-title">
                <div className="shell contact-grid">
                    <div className="contact-lede">
                        <h2 id="contact-title" className="band-title">
                            Get in touch
                        </h2>
                        <p className="mono contact-meta">
                            {profile.role} · {profile.location}
                        </p>
                        <a className="text-link contact-email" href={`mailto:${profile.email}`}>
                            {profile.email}
                        </a>
                    </div>
                    <div className="contact-links">
                        <a href={profile.github} target="_blank" rel="noreferrer">
                            GitHub
                        </a>
                        <a href={profile.linkedin} target="_blank" rel="noreferrer">
                            LinkedIn
                        </a>
                        <a href={profile.resume} download>
                            Résumé <span className="mono">{profile.resumeNote}</span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
