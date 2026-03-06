import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../Context/AuthContext'
import { supabase } from '../supabaseClient'
import { HiUser, HiMail, HiCalendar, HiPencil, HiCheck, HiX, HiLockClosed, HiAnnotation, HiTrendingUp, HiCamera } from 'react-icons/hi'
import './Profile.css'

const tradingStyles = [
    'Swing Trader',
    'Scalper',
    'Day Trader',
    'Position Trader',
    'Algorithmic Trader',
    'News Trader',
    'Price Action Trader'
]

const Profile = () => {
    const { user } = useAuth()
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [uploadingAvatar, setUploadingAvatar] = useState(false)
    const [message, setMessage] = useState({ text: '', type: '' })
    const [showPasswordSection, setShowPasswordSection] = useState(false)
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: ''
    })
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        bio: '',
        tradingStyle: ''
    })
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.user_metadata?.full_name || '',
                email: user.email || '',
                bio: user.user_metadata?.bio || '',
                tradingStyle: user.user_metadata?.trading_style || ''
            })
            // Load avatar
            if (user.user_metadata?.avatar_url) {
                setAvatarUrl(user.user_metadata.avatar_url)
            }
        }
    }, [user])

    const getUserName = () => {
        return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
    }

    const getInitials = () => {
        const name = getUserName()
        const parts = name.split(' ')
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase()
        }
        return name[0].toUpperCase()
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
    }

    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        // Validate file
        if (!file.type.startsWith('image/')) {
            setMessage({ text: 'Please select an image file', type: 'error' })
            setTimeout(() => setMessage({ text: '', type: '' }), 3000)
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            setMessage({ text: 'Image must be less than 2MB', type: 'error' })
            setTimeout(() => setMessage({ text: '', type: '' }), 3000)
            return
        }

        setUploadingAvatar(true)

        const fileExt = file.name.split('.').pop()
        const fileName = `${user.id}/avatar.${fileExt}`

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from('Avatar')
            .upload(fileName, file, { upsert: true })

        if (uploadError) {
            setMessage({ text: 'Failed to upload avatar: ' + uploadError.message, type: 'error' })
            setUploadingAvatar(false)
            setTimeout(() => setMessage({ text: '', type: '' }), 3000)
            return
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('Avatar')
            .getPublicUrl(fileName)

        // Save URL to user metadata
        const { error: updateError } = await supabase.auth.updateUser({
            data: { avatar_url: publicUrl }
        })

        if (updateError) {
            setMessage({ text: 'Failed to update profile: ' + updateError.message, type: 'error' })
        } else {
            setAvatarUrl(publicUrl)
            setMessage({ text: 'Avatar updated successfully!', type: 'success' })
        }

        setUploadingAvatar(false)
        setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    }

    const handleSave = async () => {
        setLoading(true)
        setMessage({ text: '', type: '' })

        const { error } = await supabase.auth.updateUser({
            data: {
                full_name: formData.fullName,
                bio: formData.bio,
                trading_style: formData.tradingStyle
            }
        })

        if (error) {
            setMessage({ text: error.message, type: 'error' })
        } else {
            setMessage({ text: 'Profile updated successfully!', type: 'success' })
            setEditing(false)
        }
        setLoading(false)
        setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    }

    const handlePasswordSave = async () => {
        if (passwordData.newPassword.length < 6) {
            setMessage({ text: 'Password must be at least 6 characters!', type: 'error' })
            setTimeout(() => setMessage({ text: '', type: '' }), 3000)
            return
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ text: 'Passwords do not match!', type: 'error' })
            setTimeout(() => setMessage({ text: '', type: '' }), 3000)
            return
        }

        setPasswordLoading(true)
        setMessage({ text: '', type: '' })

        const { error } = await supabase.auth.updateUser({
            password: passwordData.newPassword
        })

        if (error) {
            setMessage({ text: error.message, type: 'error' })
        } else {
            setMessage({ text: 'Password updated successfully!', type: 'success' })
            setShowPasswordSection(false)
            setPasswordData({ newPassword: '', confirmPassword: '' })
        }
        setPasswordLoading(false)
        setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    }

    const handleCancel = () => {
        setFormData({
            fullName: user?.user_metadata?.full_name || '',
            email: user?.email || '',
            bio: user?.user_metadata?.bio || '',
            tradingStyle: user?.user_metadata?.trading_style || ''
        })
        setEditing(false)
    }

    if (!user) {
        return (
            <div className="profile-page">
                <div className="profile-empty">
                    <h2>Please sign in to view your profile</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="profile-page">
            <div className="profile-container">

                {/* Profile Header Card */}
                <div className="profile-header-card">
                    <div className="profile-avatar-section">
                        <div className="profile-avatar-wrapper" onClick={handleAvatarClick}>
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="Avatar" className="profile-avatar-img" />
                            ) : (
                                <div className="profile-avatar-large">{getInitials()}</div>
                            )}
                            <div className="avatar-overlay">
                                {uploadingAvatar ? (
                                    <span className="avatar-spinner"></span>
                                ) : (
                                    <HiCamera />
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarUpload}
                                accept="image/*"
                                hidden
                            />
                        </div>
                        <div className="profile-header-info">
                            <h1>{getUserName()}</h1>
                            <p>{user.email}</p>
                            {formData.tradingStyle && (
                                <span className="trading-badge">{formData.tradingStyle}</span>
                            )}
                        </div>
                    </div>
                    {!editing && (
                        <button className="btn-edit-profile" onClick={() => setEditing(true)}>
                            <HiPencil /> Edit Profile
                        </button>
                    )}
                </div>

                {/* Message */}
                {message.text && (
                    <div className={`profile-message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                {/* Profile Details Card */}
                <div className="profile-details-card">
                    <h2 className="card-title">Personal Information</h2>

                    <div className="profile-fields">
                        <div className="profile-field">
                            <div className="field-icon"><HiUser /></div>
                            <div className="field-content">
                                <label>Full Name</label>
                                {editing ? (
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                    />
                                ) : (
                                    <span>{getUserName()}</span>
                                )}
                            </div>
                        </div>

                        <div className="profile-field">
                            <div className="field-icon"><HiMail /></div>
                            <div className="field-content">
                                <label>Email Address</label>
                                <span>{user.email}</span>
                            </div>
                        </div>

                        <div className="profile-field">
                            <div className="field-icon"><HiAnnotation /></div>
                            <div className="field-content">
                                <label>Bio</label>
                                {editing ? (
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Tell us about yourself..."
                                        rows="3"
                                    />
                                ) : (
                                    <span className={!formData.bio ? 'empty-field' : ''}>
                                        {formData.bio || 'No bio added yet'}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="profile-field">
                            <div className="field-icon"><HiTrendingUp /></div>
                            <div className="field-content">
                                <label>Trading Style</label>
                                {editing ? (
                                    <select
                                        name="tradingStyle"
                                        value={formData.tradingStyle}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select your trading style</option>
                                        {tradingStyles.map((style) => (
                                            <option key={style} value={style}>{style}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <span className={!formData.tradingStyle ? 'empty-field' : ''}>
                                        {formData.tradingStyle || 'No trading style selected'}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="profile-field">
                            <div className="field-icon"><HiCalendar /></div>
                            <div className="field-content">
                                <label>Member Since</label>
                                <span>{formatDate(user.created_at)}</span>
                            </div>
                        </div>
                    </div>

                    {editing && (
                        <div className="profile-actions">
                            <button className="btn-save" onClick={handleSave} disabled={loading}>
                                <HiCheck /> {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button className="btn-cancel" onClick={handleCancel}>
                                <HiX /> Cancel
                            </button>
                        </div>
                    )}
                </div>

                {/* Password Section */}
                <div className="profile-details-card">
                    <div className="password-header">
                        <h2 className="card-title" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}>Security</h2>
                        {!showPasswordSection && (
                            <button className="btn-change-password" onClick={() => setShowPasswordSection(true)}>
                                <HiLockClosed /> Change Password
                            </button>
                        )}
                    </div>

                    {showPasswordSection && (
                        <div className="password-fields">
                            <div className="profile-field">
                                <div className="field-icon"><HiLockClosed /></div>
                                <div className="field-content">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter new password"
                                    />
                                </div>
                            </div>

                            <div className="profile-field">
                                <div className="field-icon"><HiLockClosed /></div>
                                <div className="field-content">
                                    <label>Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            </div>

                            <div className="profile-actions">
                                <button className="btn-save" onClick={handlePasswordSave} disabled={passwordLoading}>
                                    <HiCheck /> {passwordLoading ? 'Updating...' : 'Update Password'}
                                </button>
                                <button className="btn-cancel" onClick={() => {
                                    setShowPasswordSection(false)
                                    setPasswordData({ newPassword: '', confirmPassword: '' })
                                }}>
                                    <HiX /> Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Profile
