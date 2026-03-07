import { useState, useRef } from 'react'
import { HiX, HiPhotograph, HiLightBulb } from 'react-icons/hi'
import './NewIdeaModal.css'

const forexPairs = [
    'EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD', 'USD/CAD', 'NZD/USD',
    'EUR/GBP', 'EUR/JPY', 'EUR/CHF', 'EUR/AUD', 'EUR/CAD', 'EUR/NZD',
    'GBP/JPY', 'GBP/CHF', 'GBP/AUD', 'GBP/CAD', 'GBP/NZD',
    'AUD/JPY', 'AUD/CHF', 'AUD/CAD', 'AUD/NZD',
    'CAD/JPY', 'CAD/CHF',
    'NZD/JPY', 'NZD/CHF',
    'CHF/JPY',
    'XAU/USD'
]

const NewIdeaModal = ({ isOpen, onClose, onPublish }) => {
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        currencyPair: '',
        description: ''
    })
    const fileInputRef = useRef(null)

    if (!isOpen) return null

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)
        if (images.length + files.length > 4) {
            alert('Maximum 4 images allowed')
            return
        }

        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }))

        setImages([...images, ...newImages])
    }

    const removeImage = (index) => {
        const updated = [...images]
        URL.revokeObjectURL(updated[index].preview)
        updated.splice(index, 1)
        setImages(updated)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.title || !formData.currencyPair || !formData.description) {
            return
        }

        setLoading(true)

        if (onPublish) {
            await onPublish({ ...formData, images })
        }

        // Reset form
        setFormData({ title: '', currencyPair: '', description: '' })
        images.forEach(img => URL.revokeObjectURL(img.preview))
        setImages([])
        setLoading(false)
        onClose()
    }

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose()
        }
    }

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-card">

                {/* Header */}
                <div className="modal-header">
                    <h2>Share Your Idea</h2>
                    <button className="modal-close" onClick={onClose}><HiX /></button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="modal-form">

                    {/* Title */}
                    <div className="modal-field">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. EUR/USD Bullish Setup"
                            required
                        />
                    </div>

                    {/* Currency Pair */}
                    <div className="modal-field">
                        <label>Currency Pair</label>
                        <select
                            name="currencyPair"
                            value={formData.currencyPair}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a pair...</option>
                            {forexPairs.map((pair) => (
                                <option key={pair} value={pair}>{pair}</option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div className="modal-field">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your trading idea, analysis, entry/exit points..."
                            rows="4"
                            required
                        />
                    </div>

                    {/* Images */}
                    <div className="modal-field">
                        <label>Charts / Images <span className="label-hint">(first image = thumbnail)</span></label>

                        {/* Image Previews */}
                        {images.length > 0 && (
                            <div className="image-previews">
                                {images.map((img, index) => (
                                    <div key={index} className="image-preview-item">
                                        <img src={img.preview} alt={`Preview ${index + 1}`} />
                                        <button type="button" className="remove-image" onClick={() => removeImage(index)}>
                                            <HiX />
                                        </button>
                                        {index === 0 && <span className="thumbnail-badge">Thumbnail</span>}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Upload Button */}
                        {images.length < 4 && (
                            <div className="image-upload-area" onClick={handleImageClick}>
                                <HiPhotograph />
                                <span>Click to upload images</span>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    multiple
                                    hidden
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn-publish" disabled={loading}>
                        <HiLightBulb /> {loading ? 'Publishing...' : 'Publish Idea'}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default NewIdeaModal
