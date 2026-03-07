import { useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import { HiLightBulb, HiChat, HiPlus } from 'react-icons/hi'
import NewIdeaModal from '../Components/NewIdeaModal'
import './Dashboard.css'

const Dashboard = () => {
    const { user } = useAuth()
    const [showModal, setShowModal] = useState(false)

    const getUserName = () => {
        return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
    }

    const handlePublish = async (ideaData) => {
        console.log('Publishing idea:', ideaData)
        // TODO: Save to Supabase
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

                {/* Stats Cards */}
                <div className="dashboard-stats">
                    <div className="stat-card">
                        <div className="stat-info">
                            <span className="stat-label">My Ideas</span>
                            <span className="stat-value">0</span>
                        </div>
                        <div className="stat-icon ideas-icon">
                            <HiLightBulb />
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-info">
                            <span className="stat-label">Total Comments</span>
                            <span className="stat-value">0</span>
                        </div>
                        <div className="stat-icon comments-icon">
                            <HiChat />
                        </div>
                    </div>
                </div>

                {/* My Ideas Section */}
                <div className="dashboard-section">
                    <h2 className="section-title">My Ideas</h2>

                    <div className="ideas-empty">
                        <HiLightBulb className="empty-icon" />
                        <p>You haven't shared any ideas yet</p>
                        <span>Click "+ New Idea" to get started</span>
                    </div>
                </div>

            </div>

            {/* New Idea Modal */}
            <NewIdeaModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onPublish={handlePublish}
            />
        </div>
    )
}

export default Dashboard
