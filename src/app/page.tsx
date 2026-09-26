import Image from 'next/image';
import Link from 'next/link';
import CinematicHero from '@/components/CinematicHero';
import { categoryLabel, education, experience, experiments, profile, skills } from '@/data/portfolio';
import { publishedWork } from '@/lib/work';

const featuredWithMedia = publishedWork.filter((entry) => entry.featured && entry.media);
const additional = publishedWork.filter((entry) => !entry.featured);

/* Full-bleed band behind the intro. Swap for the dedicated portrait scene once it exists. */
const aboutImage = '/hero/scene-code.jpg';

export default function Home() {
    return (
        <main id="main" tabIndex={-1}>
            <CinematicHero name={profile.name} role={profile.role} tagline="Web interfaces. Systems thinking." />

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
                                    {String(index + 1).padStart(2, '0')} — {categoryLabel(entry.category)}
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

            {/* Experiments follows Selected work and Additional projects — it is not the leftover first band it
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
            <section className="about" id="about" aria-labelledby="about-title">
                <div className="about-reel" style={{ backgroundImage: `url(${aboutImage})` }}>
                    <div className="about-scrim" />
                    <div className="about-reel-inner">
                        <h2 id="about-title" className="band-title">
                            Skills and about
                        </h2>
                        <div className="about-copy">
                            <p>
                                I am a front-end focused engineer based in {profile.location}, with more than four
                                years building web applications in React, Next.js and TypeScript. I work with design,
                                product and backend teams on interfaces, reusable components and performance.
                            </p>
                            <p>
                                My work spans public websites, admin portals, UI modernization and automated testing.
                                I started in systems administration and IT operations, which is why I care as much
                                about the pipeline and the tests as the interface, and would rather modernize
                                something people already depend on than start over.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="shell about-details">
                    <div className="about-columns">
                        <div>
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
                        <div>
                            <h3 className="subhead">Education</h3>
                            <p>{education.degree}</p>
                            <p className="mono career-role">{education.training}</p>
                        </div>
                    </div>

                    <h3 className="subhead">Skills</h3>
                    <dl className="skill-groups">
                        {skills.map((item) => (
                            <div key={item.group}>
                                <dt className="mono">{item.group}</dt>
                                <dd>
                                    <ul className="tag-row">
                                        {item.items.map((skill) => (
                                            <li key={skill} className="mono">
                                                {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </div>
                        ))}
                    </dl>
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
                            Résumé
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
