import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../Context/AuthContext'
import {
    HiPhotograph,
    HiChevronLeft,
    HiChevronRight,
    HiArrowLeft,
    HiSparkles,
    HiChat,
    HiPencil,
    HiTrash,
    HiCheck,
    HiX
} from 'react-icons/hi'
import './IdeaDetail.css'

const IdeaDetail = () => {
    const { slug } = useParams()
    const { user } = useAuth()
    const [idea, setIdea] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    // Faallo states
    const [faalloList, setFaalloList] = useState([])
    const [faalloLoading, setFaalloLoading] = useState(false)
    const [newFaallo, setNewFaallo] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [editContent, setEditContent] = useState('')

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
                const found = data.find(item => generateSlug(item.title) === slug)
                setIdea(found || null)
                if (found) {
                    fetchFaallooyinka(found.id)
                }
            }
        } catch (err) {
            console.error('Unexpected error:', err)
        }
        setLoading(false)
    }

    // Fetch faallooyinka (comments) for this idea
    const fetchFaallooyinka = async (ideaId) => {
        setFaalloLoading(true)
        try {
            const { data, error } = await supabase
                .from('faalo')
                .select('*')
                .eq('idea_id', ideaId)
                .order('created_at', { ascending: true })

            if (error) {
                console.error('Error fetching faallooyinka:', error.message)
            } else {
                setFaalloList(data || [])
            }
        } catch (err) {
            console.error('Unexpected error:', err)
        }
        setFaalloLoading(false)
    }

    // Submit new faallo
    const handleSubmitFaallo = async (e) => {
        e.preventDefault()
        if (!newFaallo.trim() || !user || !idea) return

        setSubmitting(true)
        try {
            const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'

            const { error } = await supabase
                .from('faalo')
                .insert({
                    idea_id: idea.id,
                    user_id: user.id,
                    user_name: userName,
                    content: newFaallo.trim()
                })

            if (error) {
                console.error('Error posting faallo:', error.message)
                alert('Failed to post comment: ' + error.message)
            } else {
                setNewFaallo('')
                fetchFaallooyinka(idea.id)
            }
        } catch (err) {
            console.error('Unexpected error:', err)
        }
        setSubmitting(false)
    }

    // Delete faallo
    const handleDeleteFaallo = async (faalloId) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return

        const { error } = await supabase
            .from('faalo')
            .delete()
            .eq('id', faalloId)
            .eq('user_id', user.id)

        if (error) {
            console.error('Error deleting faallo:', error.message)
        } else {
            fetchFaallooyinka(idea.id)
        }
    }

    // Start editing faallo
    const handleStartEdit = (faallo) => {
        setEditingId(faallo.id)
        setEditContent(faallo.content)
    }

    // Cancel editing
    const handleCancelEdit = () => {
        setEditingId(null)
        setEditContent('')
    }

    // Save edited faallo
    const handleSaveEdit = async (faalloId) => {
        if (!editContent.trim()) return

        const { error } = await supabase
            .from('faalo')
            .update({
                content: editContent.trim(),
                updated_at: new Date().toISOString()
            })
            .eq('id', faalloId)
            .eq('user_id', user.id)

        if (error) {
            console.error('Error updating faallo:', error.message)
        } else {
            setEditingId(null)
            setEditContent('')
            fetchFaallooyinka(idea.id)
        }
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

    const formatTimeAgo = (dateStr) => {
        if (!dateStr) return ''
        const date = new Date(dateStr)
        const now = new Date()
        const diff = now - date
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (minutes < 1) return 'Just now'
        if (minutes < 60) return `${minutes}m ago`
        if (hours < 24) return `${hours}h ago`
        if (days < 7) return `${days}d ago`
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const getInitials = (name) => {
        if (!name) return '?'
        return name.substring(0, 2).toUpperCase()
    }

    const getUserInitials = () => {
        if (!user) return '?'
        const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'U'
        return name.substring(0, 2).toUpperCase()
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

                {/* ===== FAALLO SECTION ===== */}
                <section className="faallo-section" id="faallo-section">

                    {/* Faallo Header */}
                    <div className="faallo-header">
                        <HiChat className="faallo-header-icon" />
                        <h2>Comments ({faalloList.length})</h2>
                    </div>

                    {/* Faallo Form - only for logged-in users */}
                    {user ? (
                        <form className="faallo-form" onSubmit={handleSubmitFaallo}>
                            <div className="faallo-form-avatar">
                                {getUserInitials()}
                            </div>
                            <div className="faallo-form-body">
                                <textarea
                                    className="faallo-textarea"
                                    placeholder="Write your comment here..."
                                    value={newFaallo}
                                    onChange={(e) => setNewFaallo(e.target.value)}
                                    rows="3"
                                    id="faallo-input"
                                />
                                <button
                                    type="submit"
                                    className="btn-submit-faallo"
                                    disabled={submitting || !newFaallo.trim()}
                                >
                                    <HiChat />
                                    {submitting ? 'Posting...' : 'Comment'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="faallo-login-prompt">
                            <p>
                                <Link to="/signin">Sign in</Link> to leave a comment
                            </p>
                        </div>
                    )}

                    {/* Faallooyinka List */}
                    <div className="faallo-list">
                        {faalloLoading ? (
                            <div className="faallo-loading">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="faallo-skeleton">
                                        <div className="faallo-skel-avatar"></div>
                                        <div className="faallo-skel-body">
                                            <div className="faallo-skel-line short"></div>
                                            <div className="faallo-skel-line"></div>
                                            <div className="faallo-skel-line medium"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : faalloList.length > 0 ? (
                            faalloList.map((faallo) => (
                                <div key={faallo.id} className="faallo-item" id={`faallo-${faallo.id}`}>
                                    <div className="faallo-avatar">
                                        {getInitials(faallo.user_name)}
                                    </div>
                                    <div className="faallo-body">
                                        <div className="faallo-top">
                                            <span className="faallo-user-name">{faallo.user_name || 'User'}</span>
                                            <span className="faallo-time">{formatTimeAgo(faallo.created_at)}</span>
                                            {faallo.updated_at && faallo.updated_at !== faallo.created_at && (
                                                <span className="faallo-edited">(edited)</span>
                                            )}
                                        </div>

                                        {/* Edit mode vs display mode */}
                                        {editingId === faallo.id ? (
                                            <div className="faallo-edit-mode">
                                                <textarea
                                                    className="faallo-edit-textarea"
                                                    value={editContent}
                                                    onChange={(e) => setEditContent(e.target.value)}
                                                    rows="3"
                                                />
                                                <div className="faallo-edit-actions">
                                                    <button
                                                        className="btn-save-edit"
                                                        onClick={() => handleSaveEdit(faallo.id)}
                                                        disabled={!editContent.trim()}
                                                    >
                                                        <HiCheck /> Save
                                                    </button>
                                                    <button
                                                        className="btn-cancel-edit"
                                                        onClick={handleCancelEdit}
                                                    >
                                                        <HiX /> Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="faallo-content">{faallo.content}</p>
                                        )}
                                    </div>

                                    {/* Edit & Delete - only for the comment owner */}
                                    {user && user.id === faallo.user_id && editingId !== faallo.id && (
                                        <div className="faallo-actions">
                                            <button
                                                className="btn-faallo-edit"
                                                onClick={() => handleStartEdit(faallo)}
                                                title="Edit"
                                            >
                                                <HiPencil />
                                            </button>
                                            <button
                                                className="btn-faallo-delete"
                                                onClick={() => handleDeleteFaallo(faallo.id)}
                                                title="Delete"
                                            >
                                                <HiTrash />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="faallo-empty">
                                <HiChat className="faallo-empty-icon" />
                                <p>No comments yet</p>
                                <span>Be the first to leave a comment!</span>
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </div>
    )
}

export default IdeaDetail
