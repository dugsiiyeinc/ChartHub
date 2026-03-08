import { Link } from 'react-router-dom'
import {
    HiLightBulb,
    HiUserGroup,
    HiShieldCheck,
    HiTrendingUp,
    HiGlobe,
    HiHeart,
    HiCheckCircle,
    HiArrowRight,
    HiSparkles,
    HiChartBar,
    HiChatAlt2
} from 'react-icons/hi'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'
import './About.css'

const About = () => {
    return (
        <div className="about-page">

            {/*  HERO SECTION  */}
            <section className="about-hero" id="about-hero">
                <div className="about-hero-orb orb-a"></div>
                <div className="about-hero-orb orb-b"></div>

                <div className="about-hero-content">
                    <div className="about-badge">
                        <HiSparkles /> About ChartHub
                    </div>
                    <h1 className="about-hero-title">
                        Empowering Traders to <span className="highlight">Share & Grow</span>
                    </h1>
                    <p className="about-hero-desc">
                        We're building the most vibrant trading community where traders of all levels
                        can share ideas, learn from each other, and improve their strategies together.
                    </p>
                </div>
            </section>

            {/*  MISSION SECTION  */}
            <section className="about-mission" id="about-mission">
                <div className="mission-container">
                    <div className="mission-text">
                        <div className="mission-label">✦ Our Mission</div>
                        <h2 className="mission-heading">Making Trading Knowledge Accessible to Everyone</h2>
                        <p className="mission-desc">
                            ChartHub is a community-driven platform where forex traders share their
                            chart analysis, trading ideas, and market insights. We're building the home
                            for technical traders who want to learn, share, and grow together.
                        </p>
                        <div className="mission-highlights">
                            <div className="mission-highlight-item">
                                <HiCheckCircle /> Free to join and share unlimited ideas
                            </div>
                            <div className="mission-highlight-item">
                                <HiCheckCircle /> Support for all major currency pairs & crypto
                            </div>
                            <div className="mission-highlight-item">
                                <HiCheckCircle /> Real-time community feedback on every idea
                            </div>
                            <div className="mission-highlight-item">
                                <HiCheckCircle /> Track your trading performance over time
                            </div>
                        </div>
                    </div>

                    <div className="mission-visual">
                        <div className="mission-stat-card">
                            <div className="mission-stat-icon gold"><HiUserGroup /></div>
                            <span className="mission-stat-number">2K+</span>
                            <span className="mission-stat-label">Active Traders</span>
                        </div>
                        <div className="mission-stat-card">
                            <div className="mission-stat-icon blue"><HiLightBulb /></div>
                            <span className="mission-stat-number">5K+</span>
                            <span className="mission-stat-label">Ideas Shared</span>
                        </div>
                        <div className="mission-stat-card">
                            <div className="mission-stat-icon purple"><HiChatAlt2 /></div>
                            <span className="mission-stat-number">15K+</span>
                            <span className="mission-stat-label">Comments</span>
                        </div>
                        <div className="mission-stat-card">
                            <div className="mission-stat-icon green"><HiChartBar /></div>
                            <span className="mission-stat-number">50+</span>
                            <span className="mission-stat-label">Currency Pairs</span>
                        </div>
                    </div>
                </div>
            </section>

            {/*  VALUES SECTION  */}
            <section className="about-values" id="about-values">
                <div className="about-section-header">
                    <div className="about-section-label">✦ Our Values</div>
                    <h2 className="about-section-heading">What Drives Us Forward</h2>
                    <p className="about-section-desc">
                        These core values shape everything we build and every decision we make.
                    </p>
                </div>

                <div className="values-grid">
                    <div className="value-card">
                        <div className="value-icon gold"><HiGlobe /></div>
                        <h3 className="value-title">Transparency</h3>
                        <p className="value-desc">
                            Every idea is public. We believe open sharing of analysis leads to
                            better trading decisions for the entire community.
                        </p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon blue"><HiUserGroup /></div>
                        <h3 className="value-title">Community First</h3>
                        <p className="value-desc">
                            Our platform is built around the community. Traders helping traders
                            is the foundation of everything we do.
                        </p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon purple"><HiShieldCheck /></div>
                        <h3 className="value-title">Trust & Safety</h3>
                        <p className="value-desc">
                            We maintain a respectful environment with content moderation and
                            protect our users' data with industry-standard security.
                        </p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon green"><HiTrendingUp /></div>
                        <h3 className="value-title">Continuous Growth</h3>
                        <p className="value-desc">
                            We're constantly improving our platform based on community feedback
                            to deliver the best experience possible.
                        </p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon red"><HiHeart /></div>
                        <h3 className="value-title">Passion for Trading</h3>
                        <p className="value-desc">
                            Built by traders, for traders. We understand the challenges and
                            excitement of financial markets firsthand.
                        </p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon cyan"><HiLightBulb /></div>
                        <h3 className="value-title">Innovation</h3>
                        <p className="value-desc">
                            We leverage modern technology to create intuitive tools that make
                            sharing and discovering trading ideas effortless.
                        </p>
                    </div>
                </div>
            </section>

            {/*  TEAM SECTION  */}
            <section className="about-team" id="about-team">
                <div className="about-section-header">
                    <div className="about-section-label">✦ Meet The Team</div>
                    <h2 className="about-section-heading">The People Behind ChartHub</h2>
                    <p className="about-section-desc">
                        A passionate team of traders and developers building the future of social trading.
                    </p>
                </div>

                <div className="team-grid">
                    <div className="team-card">
                        <div className="team-avatar av-1">MX</div>
                        <h3 className="team-name">Mohamed Xongor</h3>
                        <span className="team-role">Founder & CEO</span>
                        <p className="team-bio">
                            10+ years in forex trading. Passionate about building tools that empower traders.
                        </p>
                        <div className="team-socials">
                            <a href="#" className="team-social-link"><FaTwitter /></a>
                            <a href="#" className="team-social-link"><FaLinkedin /></a>
                            <a href="#" className="team-social-link"><FaGithub /></a>
                        </div>
                    </div>

                    <div className="team-card">
                        <div className="team-avatar av-2">FC</div>
                        <h3 className="team-name">Faadumo Cali</h3>
                        <span className="team-role">Lead Developer</span>
                        <p className="team-bio">
                            Full-stack engineer with a love for building scalable, beautiful applications.
                        </p>
                        <div className="team-socials">
                            <a href="#" className="team-social-link"><FaTwitter /></a>
                            <a href="#" className="team-social-link"><FaLinkedin /></a>
                            <a href="#" className="team-social-link"><FaGithub /></a>
                        </div>
                    </div>

                    <div className="team-card">
                        <div className="team-avatar av-3">CN</div>
                        <h3 className="team-name">Cabdi Nuur</h3>
                        <span className="team-role">Head of Design</span>
                        <p className="team-bio">
                            UI/UX designer focused on creating intuitive and delightful trading experiences.
                        </p>
                        <div className="team-socials">
                            <a href="#" className="team-social-link"><FaTwitter /></a>
                            <a href="#" className="team-social-link"><FaLinkedin /></a>
                            <a href="#" className="team-social-link"><FaGithub /></a>
                        </div>
                    </div>

                    <div className="team-card">
                        <div className="team-avatar av-4">HY</div>
                        <h3 className="team-name">Hodan Yusuf</h3>
                        <span className="team-role">Community Manager</span>
                        <p className="team-bio">
                            Ensures our community stays vibrant, welcoming, and focused on growth.
                        </p>
                        <div className="team-socials">
                            <a href="#" className="team-social-link"><FaTwitter /></a>
                            <a href="#" className="team-social-link"><FaLinkedin /></a>
                            <a href="#" className="team-social-link"><FaGithub /></a>
                        </div>
                    </div>
                </div>
            </section>

            {/*  STORY / TIMELINE SECTION  */}
            <section className="about-story" id="about-story">
                <div className="about-section-header">
                    <div className="about-section-label">✦ Our Journey</div>
                    <h2 className="about-section-heading">The ChartHub Story</h2>
                    <p className="about-section-desc">
                        From a simple idea to a growing community of traders worldwide.
                    </p>
                </div>

                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-content">
                            <span className="timeline-year">2023</span>
                            <h3 className="timeline-title">The Idea Was Born</h3>
                            <p className="timeline-desc">
                                Frustrated by the lack of quality trading communities, our founder
                                envisioned a platform where traders could freely share and discuss ideas.
                            </p>
                        </div>
                        <div className="timeline-dot gold"></div>
                        <div className="timeline-spacer"></div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-spacer"></div>
                        <div className="timeline-dot blue"></div>
                        <div className="timeline-content">
                            <span className="timeline-year">2024</span>
                            <h3 className="timeline-title">Platform Launch</h3>
                            <p className="timeline-desc">
                                ChartHub officially launched with core features: idea posting,
                                chart uploads, and community interactions. First 500 users joined.
                            </p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-content">
                            <span className="timeline-year">2025</span>
                            <h3 className="timeline-title">Community Growth</h3>
                            <p className="timeline-desc">
                                Reached 2,000+ active traders, 5,000+ shared ideas, and expanded
                                support to crypto, stocks, and commodities analysis.
                            </p>
                        </div>
                        <div className="timeline-dot purple"></div>
                        <div className="timeline-spacer"></div>
                    </div>
                </div>
            </section>

            {/*  CTA SECTION  */}
            <section className="about-cta" id="about-cta">
                <div className="about-cta-container">
                    <div className="about-cta-glow"></div>
                    <h2 className="about-cta-title">Join Our Growing Community</h2>
                    <p className="about-cta-desc">
                        Be part of a community that's reshaping how traders share knowledge
                        and grow together. Start sharing your ideas today.
                    </p>
                    <Link to="/signup" className="about-cta-btn" id="about-cta-signup">
                        Get Started Free <HiArrowRight />
                    </Link>
                </div>
            </section>

        </div>
    )
}

export default About
