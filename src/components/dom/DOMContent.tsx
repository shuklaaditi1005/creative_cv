import React, { useEffect } from 'react';
import { portfolioData } from '../../data/content';
import { imagePaths } from '../../data/imagePaths';

const iconForLabel = (label: string) => {
    const normalized = label.toLowerCase();
    const iconMap: Record<string, string> = {
        github: imagePaths.githubIcon,
        linkedin: imagePaths.linkedinIcon,
        email: imagePaths.emailIcon,
    };

    const src = iconMap[normalized];
    if (!src) return null;

    return <img className="link-icon" src={src} alt={`${label} icon`} />;
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const renderHighlightedParagraph = (text: string, highlights: string[]) => {
    const validHighlights = highlights
        .filter(Boolean)
        .map((value) => value.trim())
        .sort((a, b) => b.length - a.length);

    if (!validHighlights.length) {
        return text;
    }

    const regex = new RegExp(`(${validHighlights.map(escapeRegExp).join('|')})`, 'gi');
    const fragments = text.split(regex);

    return (
        <>
            {fragments.map((fragment, idx) => {
                const match = validHighlights.find(
                    (highlight) => fragment.toLowerCase() === highlight.toLowerCase()
                );

                return match ? <strong key={idx}>{fragment}</strong> : <React.Fragment key={idx}>{fragment}</React.Fragment>;
            })}
        </>
    );
};

const sectionHighlights: Record<string, string[]> = {
    about: ['MBA student at NMIMS', 'harmonium', 'outer beauty'],
    passions: ['continuous learning', 'personal growth', 'new places'],
    beauty: ['inner beauty', 'outer beauty', "Because You're Worth It"],
    brand: ['Garnier', 'strong women', 'Take Care'],
    strengths: ['genuinely curious', 'positive environment', 'learn and improve'],
    memory: ['always been a learner', 'new experiences', 'fresh perspective'],
};

const DOMContent: React.FC = () => {
    useEffect(() => {
        const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.03,
                rootMargin: '0px 0px 20% 0px',
            }
        );

        revealItems.forEach((item) => observer.observe(item));

        return () => observer.disconnect();
    }, []);
    const {
        hero,
        about,
        passions,
        beauty,
        brand,
        strengthsWeaknesses,
        memory,
        socialLinks
    } = portfolioData;

    return (
        <div className="dom-content">

            <section id="intro" className="hero-panel">
                <div className="hero-badge" data-reveal>A Creative CV</div>
                <div className="hero-top-right" data-reveal>
                    <img className="brand-logo" src={imagePaths.nmimsLogo} alt="NMIMS logo" />
                    <span className="logo-separator">|</span>
                    <img className="brand-logo" src={imagePaths.lorealLogo} alt="L'Oréal logo" />
                </div>
                <div className="hero-content-wrapper" data-reveal>
                    <div className="hero-sub">
                        <div className="hero-left">
                            <div className="name">{hero.name}</div>
                            <div className="role">{hero.role}</div>
                        </div>
                    </div>
                    <div className="hero-center">
                        <img className="hero-center-image" src={imagePaths.self} alt="Aditi Shukla" />
                    </div>
                </div>
                <div className="hero-bottom" data-reveal>
                    <div className="desc">{hero.description}</div>
                    <div className="year">{hero.year}</div>
                </div>
            </section>

            <section id="about">
                <div className="grid-layout">
                    <div className="text-column">
                        <h2 data-reveal>{about.title}</h2>
                        {about.paragraphs.map((text, idx) => (
                            <p key={idx} data-reveal style={{ transitionDelay: `${0.08 * (idx + 1)}s` }}>
                                {renderHighlightedParagraph(text, sectionHighlights.about)}
                            </p>
                        ))}
                    </div>
                    <div className="image-panel" data-reveal>
                        <img className="about-image" src={imagePaths.aboutMe} alt="About me" />
                    </div>
                </div>
            </section>

            <section id="passions">
                <div className="grid-layout">
                    <div className="text-column">
                        <h2 data-reveal>{passions.title}</h2>
                        {passions.paragraphs.map((text, idx) => (
                            <p key={idx} data-reveal style={{ transitionDelay: `${0.08 * (idx + 1)}s` }}>
                                {renderHighlightedParagraph(text, sectionHighlights.passions)}
                            </p>
                        ))}
                    </div>
                    <div className="image-panel" data-reveal>
                        <img className="about-image" src={imagePaths.passion} alt="Passion illustration" />
                    </div>
                </div>
            </section>

            <section id="beauty">
                <div className="grid-layout">
                    <div className="text-column">
                        <h2 data-reveal>{beauty.title}</h2>
                        {beauty.paragraphs.map((text, idx) => (
                            <p key={idx} data-reveal style={{ transitionDelay: `${0.08 * (idx + 1)}s` }}>
                                {renderHighlightedParagraph(text, sectionHighlights.beauty)}
                            </p>
                        ))}
                    </div>
                    <div className="image-panel" data-reveal>
                        <img className="about-image" src={imagePaths.beauty} alt="Beauty illustration" />
                    </div>
                </div>
            </section>

            <section id="brand">
                <div className="grid-layout">
                    <div className="text-column">
                        <h2 data-reveal>{brand.title}</h2>
                        {brand.paragraphs.map((text, idx) => (
                            <p key={idx} data-reveal style={{ transitionDelay: `${0.08 * (idx + 1)}s` }}>
                                {renderHighlightedParagraph(text, sectionHighlights.brand)}
                            </p>
                        ))}
                    </div>
                    <div className="image-panel" data-reveal>
                        <img className="about-image" src={imagePaths.brand} alt="Brand illustration" />
                    </div>
                </div>
            </section>

            <section id="strengths">
                <div className="grid-layout">
                    <div className="text-column" style={{ gridColumn: '1 / -1' }}>
                        <h2 data-reveal>{strengthsWeaknesses.title}</h2>
                        <div className="skills-tools-grid">
                            <div className="list-block" data-reveal style={{ transitionDelay: '0.1s' }}>
                                <h3>{strengthsWeaknesses.strength.label}</h3>
                                <p>{strengthsWeaknesses.strength.text}</p>
                            </div>
                            <div className="list-block" data-reveal style={{ transitionDelay: '0.2s' }}>
                                <h3>{strengthsWeaknesses.weakness.label}</h3>
                                <p>{renderHighlightedParagraph(strengthsWeaknesses.weakness.text, sectionHighlights.strengths)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="memory">
                <div className="grid-layout memory-grid">
                    <div className="text-column">
                        <h2 data-reveal>{memory.title}</h2>
                        {memory.paragraphs.slice(0, 2).map((text, idx) => (
                            <p key={idx} data-reveal style={{ transitionDelay: `${0.08 * (idx + 1)}s` }}>
                                {renderHighlightedParagraph(text, sectionHighlights.memory)}
                            </p>
                        ))}

                        <div className="closing-links">
                            {socialLinks.map((link, idx) => (
                                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" data-reveal style={{ transitionDelay: `${0.1 + idx * 0.08}s` }}>
                                    {iconForLabel(link.label)}
                                    <span>{link.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="memory-panel" data-reveal>
                        <div className="memory-card">
                            <h3>Standout Moment</h3>
                            <p>{memory.paragraphs[2]}</p>
                        </div>
                        <div className="memory-card">
                            <h3>What I Carry Forward</h3>
                            <p>{memory.paragraphs[3]}</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default DOMContent;