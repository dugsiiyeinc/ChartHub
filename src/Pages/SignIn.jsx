import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import './SignIn.css'

const SignIn = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        })

        if (signInError) {
            setError(signInError.message)
            setLoading(false)
            return
        }

        setLoading(false)
        navigate('/')
    }

    return (
        <div className="signin-page">
            <div className="signin-card">
                <div className="signin-header">
                    <h2>Welcome Back</h2>
                    <p>Sign in to your account</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="signin-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>

                    <button type="submit" className="signin-btn" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="signin-footer">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignIn
