import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { HiHome, HiLightBulb, HiInformationCircle, HiMail } from 'react-icons/hi'
import { HiMenuAlt3, HiX, HiLogout } from 'react-icons/hi'
import { HiOutlineViewGrid, HiOutlineUser } from 'react-icons/hi'
import { useAuth } from '../Context/AuthContext'
import './Header.css'
import logo from '../assets/logo.png'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const { user, signOut } = useAuth()
    const navigate = useNavigate()
    const dropdownRef = useRef(null)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const closeMenu = () => {
        setMenuOpen(false)
        setDropdownOpen(false)
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const handleSignOut = async () => {
        await signOut()
        closeMenu()
        navigate('/')
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Get user's name from metadata or email
    const getUserName = () => {
        if (user?.user_metadata?.full_name) {
            return user.user_metadata.full_name
        }
        return user?.email?.split('@')[0] || 'User'
    }

    // Get initials for avatar
    const getInitials = () => {
        const name = getUserName()
        const parts = name.split(' ')
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase()
        }
        return name[0].toUpperCase()
    }

    return (
        <header className="header">
            <div className="header-container">

                {/* Logo */}
                <Link to="/" className="header-logo" onClick={closeMenu}>
                    <img src={logo} alt="ChartHub Logo" />
                </Link>

                {/* Hamburger Button */}
                <button className="menu-toggle" onClick={toggleMenu}>
                    {menuOpen ? <HiX /> : <HiMenuAlt3 />}
                </button>

                {/* Menu + Buttons */}
                <div className={`header-menu ${menuOpen ? 'open' : ''}`}>
                    <nav className="header-nav">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}><HiHome /> Home</NavLink>
                        <NavLink to="/idea" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}><HiLightBulb /> Idea</NavLink>
                        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}><HiInformationCircle /> About</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}><HiMail /> Contact</NavLink>
                    </nav>

                    {/* Conditional: Logged In vs Logged Out */}
                    {user ? (
                        <div className="header-user" ref={dropdownRef}>
                            <div className="user-pill" onClick={toggleDropdown}>
                                {user.user_metadata?.avatar_url ? (
                                    <img src={user.user_metadata.avatar_url} alt="Avatar" className="header-avatar-img" />
                                ) : (
                                    <div className="user-avatar">{getInitials()}</div>
                                )}
                                <span className="user-name">{getUserName()}</span>
                            </div>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div className="user-dropdown">
                                    <Link to="/dashboard" className="dropdown-item" onClick={closeMenu}>
                                        <HiOutlineViewGrid /> Dashboard
                                    </Link>
                                    <Link to="/profile" className="dropdown-item" onClick={closeMenu}>
                                        <HiOutlineUser /> Profile
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item logout" onClick={handleSignOut}>
                                        <HiLogout /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="header-buttons">
                            <Link to="/signin" className="btn-signin" onClick={closeMenu}>Sign In</Link>
                            <Link to="/signup" className="btn-signup" onClick={closeMenu}>Sign Up</Link>
                        </div>
                    )}
                </div>

            </div>
        </header>
    )
}

export default Header
