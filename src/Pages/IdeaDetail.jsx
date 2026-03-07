import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import {
    HiPhotograph,
    HiChevronLeft,
    HiChevronRight,
    HiArrowLeft,
    HiSparkles
} from 'react-icons/hi'
import './IdeaDetail.css'

const IdeaDetail = () => {
    const { slug } = useParams()
    const [idea, setIdea] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    useEffect(() => {
        fetchIdea()
    }, [slug])

    const fetchIdea = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('postIdea')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching idea:', error.message)
                setIdea(null)
            } else if (data) {
                // Find the idea whose slug matches
                const found = data.find(item => generateSlug(item.title) === slug)
                setIdea(found || null)
            }
        } catch (err) {
            console.error('Unexpected error:', err)
        }
        setLoading(false)
    }

    const generateSlug = (title) => {
        if (!title) return ''
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
    }

    const formatFullDate = (dateStr) => {
        if (!dateStr) return ''
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const getInitials = (userId) => {
        if (!userId) return '?'
        return userId.substring(0, 2).toUpperCase()
    }

    // Loading state
    if (loading) {
        return (
            <div className="idea-detail-page">
                <div className="idea-detail-container">
                    <div className="idea-detail-skeleton">
                        <div className="detail-skel-image"></div>
                        <div className="detail-skel-body">
                            <div className="detail-skel-line wide"></div>
                            <div className="detail-skel-line medium"></div>
                            <div className="detail-skel-line"></div>
                            <div className="detail-skel-line"></div>
                            <div className="detail-skel-line short"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Not found state
    if (!idea) {
        return (
            <div className="idea-detail-page">
                <div className="idea-detail-container">
                    <div className="idea-not-found">
                        <HiSparkles className="not-found-icon" />
                        <h2>Idea Not Found</h2>
                        <p>This trading idea doesn't exist or has been removed.</p>
                        <Link to="/idea" className="btn-back-ideas">
                            <HiArrowLeft /> Back to Ideas
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="idea-detail-page">
            <div className="idea-detail-container">

                {/* Back Button */}
                <Link to="/idea" className="idea-detail-back">
                    <HiArrowLeft /> Back to Ideas
                </Link>

                {/* Main Card */}
                <article className="idea-detail-card">

                    {/* Image Gallery */}
                    <div className="idp-gallery">
                        {idea.images && idea.images.length > 0 ? (
                            <>
                                <img
                                    src={idea.images[activeImageIndex]}
                                    alt={idea.title}
                                    className="idp-gallery-image"
                                />
                                {idea.images.length > 1 && (
                                    <>
                                        <button
                                            className="idp-nav idp-prev"
                                            onClick={() => setActiveImageIndex(i => i === 0 ? idea.images.length - 1 : i - 1)}
                                        >
                                            <HiChevronLeft />
                                        </button>
                                        <button
                                            className="idp-nav idp-next"
                                            onClick={() => setActiveImageIndex(i => i === idea.images.length - 1 ? 0 : i + 1)}
                                        >
                                            <HiChevronRight />
                                        </button>
                                        <div className="idp-dots">
                                            {idea.images.map((_, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`idp-dot ${idx === activeImageIndex ? 'active' : ''}`}
                                                    onClick={() => setActiveImageIndex(idx)}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                                {/* Thumbnails */}
                                {idea.images.length > 1 && (
                                    <div className="idp-thumbs">
                                        {idea.images.map((img, idx) => (
                                            <img
                                                key={idx}
                                                src={img}
                                                alt={`Chart ${idx + 1}`}
                                                className={`idp-thumb ${idx === activeImageIndex ? 'active' : ''}`}
                                                onClick={() => setActiveImageIndex(idx)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="idp-no-image">
                                <HiPhotograph />
                                <span>No chart image uploaded</span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="idp-content">
                        <div className="idp-meta">
                            <span className="idp-pair">{idea.currency_pair || 'N/A'}</span>
                            <span className="idp-date">{formatFullDate(idea.created_at)}</span>
                        </div>

                        <h1 className="idp-title">{idea.title}</h1>

                        <div className="idp-description">
                            {idea.description}
                        </div>

                        {/* Author */}
                        <div className="idp-author-section">
                            <div className="idp-author-avatar">
                                {getInitials(idea.user_id)}
                            </div>
                            <div className="idp-author-info">
                                <span className="idp-author-name">Trader</span>
                                <span className="idp-author-joined">
                                    Posted on {formatFullDate(idea.created_at)}
                                </span>
                            </div>
                        </div>
                    </div>

                </article>

            </div>
        </div>
    )
}

export default IdeaDetail
