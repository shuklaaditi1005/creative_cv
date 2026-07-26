import React from 'react';
import { portfolioData } from '../../data/content';

const DOMContent: React.FC = () => {
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

            <section id="intro">
                <div className="hero-title">{hero.pageTitle}</div>
                <div className="hero-sub">
                    <div className="name">{hero.name}</div>
                    <div className="role">{hero.role}</div>
                </div>
                <div className="hero-bottom">
                    <div className="desc">{hero.description}</div>
                    <div className="year">{hero.year}</div>
                </div>
            </section>

            <section id="about">
                <div className="grid-layout">
                    <div className="text-column">
                        <h2>{about.title}</h2>
                        {about.paragraphs.map((text, idx) => (
                            <p key={idx}>{text}</p>
                        ))}
                    </div>
                    <div />
                </div>
            </section>

            <section id="passions">
                <div className="grid-layout">
                    <div className="text-column">
                        <h2>{passions.title}</h2>
                        {passions.paragraphs.map((text, idx) => (
                            <p key={idx}>{text}</p>
                        ))}
                    </div>
                    <div />
                </div>
            </section>

            <section id="beauty">
                <div className="grid-layout">
                    <div className="text-column">
                        <h2>{beauty.title}</h2>
                        {beauty.paragraphs.map((text, idx) => (
                            <p key={idx}>{text}</p>
                        ))}
                    </div>
                    <div />
                </div>
            </section>

            <section id="brand">
                <div className="grid-layout">
                    <div className="text-column">
                        <h2>{brand.title}</h2>
                        {brand.paragraphs.map((text, idx) => (
                            <p key={idx}>{text}</p>
                        ))}
                    </div>
                    <div />
                </div>
            </section>

            <section id="strengths">
                <div className="grid-layout">
                    <div className="text-column" style={{ gridColumn: '1 / -1', maxWidth: '900px' }}>
                        <h2>{strengthsWeaknesses.title}</h2>
                        <div className="skills-tools-grid">
                            <div className="list-block">
                                <h3>{strengthsWeaknesses.strength.label}</h3>
                                <p>{strengthsWeaknesses.strength.text}</p>
                            </div>
                            <div className="list-block">
                                <h3>{strengthsWeaknesses.weakness.label}</h3>
                                <p>{strengthsWeaknesses.weakness.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="memory">
                <div className="grid-layout">
                    <div className="text-column">
                        <h2>{memory.title}</h2>
                        {memory.paragraphs.map((text, idx) => (
                            <p key={idx}>{text}</p>
                        ))}

                        <div className="closing-links">
                            {socialLinks.map((link, idx) => (
                                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div />
                </div>
            </section>

        </div>
    );
};

export default DOMContent;