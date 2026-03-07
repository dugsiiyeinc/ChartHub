import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useAuth } from '../Context/AuthContext'
import NewIdeaModal from '../Components/NewIdeaModal'
import {
    HiSearch,
    HiSparkles,
    HiLightBulb,
    HiChartBar,
    HiPhotograph,
    HiPlus
} from 'react-icons/hi'
import './Idea.css'

const forexPairs = [
    'All Pairs',
    'EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD', 'USD/CAD', 'NZD/USD',
    'EUR/GBP', 'EUR/JPY', 'EUR/CHF', 'EUR/AUD', 'EUR/CAD', 'EUR/NZD',
    'GBP/JPY', 'GBP/CHF', 'GBP/AUD', 'GBP/CAD', 'GBP/NZD',
    'AUD/JPY', 'AUD/CHF', 'AUD/CAD', 'AUD/NZD',
    'CAD/JPY', 'CAD/CHF',
    'NZD/JPY', 'NZD/CHF',
    'CHF/JPY',
    'XAU/USD'
]

const Idea = () => {
    const { user } = useAuth()
    const [ideas, setIdeas] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterPair, setFilterPair] = useState('All Pairs')
    const [sortBy, setSortBy] = useState('newest')
    const [showModal, setShowModal] = useState(false)

    // Fetch all ideas from Supabase
    useEffect(() => {
        fetchIdeas()
    }, [])

    const fetchIdeas = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('postIdea')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching ideas:', error.message)
            } else {
                setIdeas(data || [])
            }
        } catch (err) {
            console.error('Unexpected error:', err)
        }
        setLoading(false)
    }

    // Filter and sort ideas
    const getFilteredIdeas = () => {
        let filtered = [...ideas]

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(idea =>
                idea.title?.toLowerCase().includes(query) ||
                idea.description?.toLowerCase().includes(query) ||
                idea.currency_pair?.toLowerCase().includes(query)
            )
        }

        // Currency pair filter
        if (filterPair !== 'All Pairs') {
            filtered = filtered.filter(idea => idea.currency_pair === filterPair)
        }

        // Sort
        if (sortBy === 'newest') {
            filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        } else if (sortBy === 'oldest') {
            filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        }

        return filtered
    }

    const filteredIdeas = getFilteredIdeas()

    // Handle publishing new idea
    const handlePublish = async (ideaData) => {
        if (!user) {
            alert('Please sign in to publish an idea')
            return
        }

        // Upload images to Supabase Storage ("Chart" bucket)
        const imageUrls = []

        for (const img of ideaData.images) {
            const fileExt = img.file.name.split('.').pop()
            const fileName = `${user.id}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('Chart')
                .upload(fileName, img.file)

            if (!uploadError) {
                const { data: { publicUrl } } = supabase.storage
                    .from('Chart')
                    .getPublicUrl(fileName)
                imageUrls.push(publicUrl)
            }
        }

        // Insert idea into postIdea table
        const { error } = await supabase
            .from('postIdea')
            .insert({
                user_id: user.id,
                title: ideaData.title,
                currency_pair: ideaData.currencyPair,
                description: ideaData.description,
                images: imageUrls
            })

        if (error) {
            console.error('Error publishing idea:', error.message)
            alert('Failed to publish idea: ' + error.message)
        } else {
            // Re-fetch ideas to show the new one
            fetchIdeas()
        }
    }

    // Format date
    const formatDate = (dateStr) => {
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

    // Get user initials from user_id
    const getInitials = (userId) => {
        if (!userId) return '?'
        return userId.substring(0, 2).toUpperCase()
    }

    return (
        <div className="idea-page">

            {/* ===== HERO ===== */}
            <section className="idea-hero" id="idea-hero">
                <div className="idea-hero-orb orb-a"></div>
                <div className="idea-hero-orb orb-b"></div>

                <div className="idea-hero-content">
                    <div className="idea-badge">
                        <HiSparkles /> Trading Ideas
                    </div>
                    <h1 className="idea-hero-title">
                        Explore <span className="highlight">Trading Ideas</span>
                    </h1>
                    <p className="idea-hero-desc">
                        Discover chart analysis and trading insights shared by our community
                        of forex traders from around the world.
                    </p>
                </div>
            </section>

            {/* ===== TOOLBAR / FILTERS ===== */}
            <section className="idea-toolbar" id="idea-toolbar">
                <div className="idea-toolbar-inner">
                    <div className="idea-search-box">
                        <HiSearch />
                        <input
                            type="text"
                            className="idea-search-input"
                            placeholder="Search ideas by title, pair..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            id="idea-search"
                        />
                    </div>

                    <div className="idea-filter-group">
                        <select
                            className="idea-filter-select"
                            value={filterPair}
                            onChange={(e) => setFilterPair(e.target.value)}
                            id="idea-pair-filter"
                        >
                            {forexPairs.map(pair => (
                                <option key={pair} value={pair}>{pair}</option>
                            ))}
                        </select>

                        <select
                            className="idea-filter-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            id="idea-sort"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>

                        <div className="idea-count">
                            <span>{filteredIdeas.length}</span> {filteredIdeas.length === 1 ? 'idea' : 'ideas'}
                        </div>

                        <button className="btn-new-idea-page" onClick={() => setShowModal(true)} id="btn-new-idea">
                            <HiPlus /> New Idea
                        </button>
                    </div>
                </div>
            </section>

            {/* ===== IDEAS GRID ===== */}
            <section className="idea-grid-section" id="idea-grid-section">
                {loading ? (
                    // Loading skeleton
                    <div className="idea-loading">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="idea-skeleton">
                                <div className="skeleton-thumb"></div>
                                <div className="skeleton-body">
                                    <div className="skeleton-line"></div>
                                    <div className="skeleton-line medium"></div>
                                    <div className="skeleton-line short"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredIdeas.length > 0 ? (
                    <div className="idea-grid">
                        {filteredIdeas.map((idea) => (
                            <div key={idea.id} className="idea-card" id={`idea-${idea.id}`}>
                                {/* Thumbnail */}
                                <div className="idea-card-thumb">
                                    {idea.images && idea.images.length > 0 ? (
                                        <img src={idea.images[0]} alt={idea.title} />
                                    ) : (
                                        <div className="idea-card-thumb-placeholder">
                                            <HiPhotograph />
                                        </div>
                                    )}
                                    <span className="idea-card-pair-badge">
                                        {idea.currency_pair || 'N/A'}
                                    </span>
                                </div>

                                {/* Body */}
                                <div className="idea-card-body">
                                    <h3 className="idea-card-title">{idea.title}</h3>
                                    <p className="idea-card-desc">{idea.description}</p>
                                </div>

                                {/* Footer */}
                                <div className="idea-card-footer">
                                    <div className="idea-card-author">
                                        <div className="idea-card-avatar">
                                            {getInitials(idea.user_id)}
                                        </div>
                                        <span className="idea-card-author-name">Trader</span>
                                    </div>
                                    <span className="idea-card-date">
                                        {formatDate(idea.created_at)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Empty state
                    <div className="idea-empty">
                        <HiLightBulb className="idea-empty-icon" />
                        <h3>No ideas found</h3>
                        <p>
                            {searchQuery || filterPair !== 'All Pairs'
                                ? 'Try adjusting your search or filters'
                                : 'Be the first to share a trading idea!'}
                        </p>
                    </div>
                )}
            </section>

            {/* New Idea Modal */}
            <NewIdeaModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onPublish={handlePublish}
            />

        </div>
    )
}

export default Idea
