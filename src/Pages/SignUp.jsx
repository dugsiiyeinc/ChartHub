import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import './SignUp.css'

const SignUp = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!')
            return
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters!')
            return
        }

        setLoading(true)
        setError('')

        const { data, error: signUpError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    full_name: formData.fullName
                }
            }
        })

        if (signUpError) {
            setError(signUpError.message)
            setLoading(false)
            return
        }

        setLoading(false)
        navigate('/signin')
    }

    return (
        <div className="signup-page">
            <div className="signup-card">
                <div className="signup-header">
                    <h2>Create Account</h2>
                    <p>Join ChartHub today</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

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
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-terms">
                        <label className="terms-check">
                            <input type="checkbox" required />
                            <span>I agree to the <a href="#">Terms & Conditions</a></span>
                        </label>
                    </div>

                    <button type="submit" className="signup-btn" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="signup-footer">
                    <p>Already have an account? <Link to="/signin">Sign In</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
