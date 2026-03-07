import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { supabase } from '../supabaseClient'
import { HiLightBulb, HiChat, HiPlus, HiTrash, HiPencil, HiPhotograph } from 'react-icons/hi'
import NewIdeaModal from '../Components/NewIdeaModal'
import './Dashboard.css'

const Dashboard = () => {
    const { user } = useAuth()
    const [showModal, setShowModal] = useState(false)
    const [myIdeas, setMyIdeas] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingIdea, setEditingIdea] = useState(null)
    const [totalFaallooyinka, setTotalFaallooyinka] = useState(0)

    const getUserName = () => {
        return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
    }

    // Generate URL slug from title
    const generateSlug = (title) => {
        if (!title) return ''
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
    }

    // Fetch user's ideas from Supabase
    useEffect(() => {
        if (user) {
            fetchMyIdeas()
        }
    }, [user])

    const fetchMyIdeas = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('postIdea')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching ideas:', error.message)
            } else {
                setMyIdeas(data || [])
                // Fetch total faallooyinka for user's ideas
                if (data && data.length > 0) {
                    const ideaIds = data.map(idea => idea.id)
                    const { count, error: faalloError } = await supabase
                        .from('faalo')
                        .select('*', { count: 'exact', head: true })
                        .in('idea_id', ideaIds)
                    if (!faalloError) {
                        setTotalFaallooyinka(count || 0)
                    }
                }
            }
        } catch (err) {
            console.error('Unexpected error:', err)
        }
        setLoading(false)
    }

    const handlePublish = async (ideaData) => {
        // Upload images to Supabase Storage
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
            fetchMyIdeas()
        }
    }

    // Delete an idea
    const handleDelete = async (ideaId) => {
        if (!window.confirm('Are you sure you want to delete this idea?')) return

        const { error } = await supabase
            .from('postIdea')
            .delete()
            .eq('id', ideaId)
            .eq('user_id', user.id)

        if (error) {
            console.error('Error deleting idea:', error.message)
            alert('Failed to delete idea: ' + error.message)
        } else {
            fetchMyIdeas()
        }
    }

    // Edit an idea
    const handleEdit = (idea) => {
        setEditingIdea(idea)
        setShowModal(true)
    }

    // Update an idea in Supabase
    const handleUpdate = async (ideaId, updatedData) => {
        // Upload new images if any
        let imageUrls = editingIdea.images || []

        if (updatedData.images && updatedData.images.length > 0) {
            imageUrls = []
            for (const img of updatedData.images) {
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
        }

        const { error } = await supabase
            .from('postIdea')
            .update({
                title: updatedData.title,
                currency_pair: updatedData.currencyPair,
                description: updatedData.description,
                images: imageUrls
            })
            .eq('id', ideaId)
            .eq('user_id', user.id)

        if (error) {
            console.error('Error updating idea:', error.message)
            alert('Failed to update idea: ' + error.message)
        } else {
            fetchMyIdeas()
        }

        setEditingIdea(null)
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

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">

                {/* Welcome Section */}
                <div className="dashboard-welcome">
                    <div className="welcome-text">
                        <h1>Welcome back, <span className="welcome-name">{getUserName()}</span></h1>
                        <p>Manage your trading ideas and activity</p>
                    </div>
                    <button className="btn-new-idea" onClick={() => setShowModal(true)}>
                        <HiPlus /> New Idea
                    </button>
                </div>

                {/* Stats Cards - DYNAMIC */}
                <div className="dashboard-stats">
                    <div className="stat-card">
                        <div className="stat-info">
                            <span className="stat-label">My Ideas</span>
                            <span className="stat-value">{myIdeas.length}</span>
                        </div>
                        <div className="stat-icon ideas-icon">
                            <HiLightBulb />
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-info">
                            <span className="stat-label">Total Comments</span>
                            <span className="stat-value">{totalFaallooyinka}</span>
                        </div>
                        <div className="stat-icon comments-icon">
                            <HiChat />
                        </div>
                    </div>
                </div>

                {/* My Ideas Section - DYNAMIC */}
                <div className="dashboard-section">
                    <h2 className="section-title">My Ideas</h2>

                    {loading ? (
                        <div className="ideas-loading">
                            {[1, 2].map(i => (
                                <div key={i} className="idea-skeleton-row">
                                    <div className="skeleton-block thumb"></div>
                                    <div className="skeleton-block body">
                                        <div className="skeleton-line"></div>
                                        <div className="skeleton-line short"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : myIdeas.length > 0 ? (
                        <div className="my-ideas-list">
                            {myIdeas.map((idea) => (
                                <div key={idea.id} className="my-idea-item" id={`my-idea-${idea.id}`}>
                                    <Link to={`/idea/${generateSlug(idea.title)}`} className="my-idea-link">
                                        <div className="my-idea-thumb">
                                            {idea.images && idea.images.length > 0 ? (
                                                <img src={idea.images[0]} alt={idea.title} />
                                            ) : (
                                                <div className="my-idea-thumb-placeholder">
                                                    <HiPhotograph />
                                                </div>
                                            )}
                                        </div>
                                        <div className="my-idea-info">
                                            <h3>{idea.title}</h3>
                                            <div className="my-idea-meta">
                                                <span className="my-idea-pair">{idea.currency_pair || 'N/A'}</span>
                                                <span className="my-idea-date">{formatDate(idea.created_at)}</span>
                                            </div>
                                            <p className="my-idea-desc">{idea.description}</p>
                                        </div>
                                    </Link>
                                    <div className="my-idea-actions">
                                        <button
                                            className="btn-edit-idea"
                                            onClick={() => handleEdit(idea)}
                                            title="Edit this idea"
                                        >
                                            <HiPencil />
                                        </button>
                                        <button
                                            className="btn-delete-idea"
                                            onClick={() => handleDelete(idea.id)}
                                            title="Delete this idea"
                                        >
                                            <HiTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="ideas-empty">
                            <HiLightBulb className="empty-icon" />
                            <p>You haven't shared any ideas yet</p>
                            <span>Click "+ New Idea" to get started</span>
                        </div>
                    )}
                </div>

            </div>

            {/* New Idea Modal */}
            <NewIdeaModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                    setEditingIdea(null)
                }}
                onPublish={handlePublish}
                editingIdea={editingIdea}
                onUpdate={handleUpdate}
            />
        </div>
    )
}

export default Dashboard
