import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const retryFetch = () => {
        setError(null);
        setLoading(true);
        axios.get('https://fakestoreapi.com/products')
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load products. Please try again later.');
                setLoading(false);
            });
    };

    // Loading skeleton array
    const skeletonArray = [...Array(8)].map((_, i) => i);

    return (
        <div style={styles.background}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.heading}>
                        <span style={styles.emoji}>🛍️</span>
                        Trending Products
                    </h1>
                    
                    <div style={styles.controls}>
                        <div style={styles.searchContainer}>
                            <svg 
                                style={styles.searchIcon} 
                                viewBox="0 0 24 24" 
                                width="20" 
                                height="20"
                            >
                                <path 
                                    fill="#7f8a9a" 
                                    d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search products..."
                                style={styles.searchInput}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                      
                    </div>
                </div>

                {error ? (
                    <div style={styles.errorContainer}>
                        <h3 style={styles.errorText}>{error}</h3>
                        <button style={styles.retryButton} onClick={retryFetch}>
                            Retry
                        </button>
                    </div>
                ) : loading ? (
                    <div style={styles.grid}>
                        {skeletonArray.map((_, index) => (
                            <div key={index} style={styles.skeletonCard}>
                                <div style={styles.skeletonImage}></div>
                                <div style={styles.skeletonTextContainer}>
                                    <div style={styles.skeletonTitle}></div>
                                    <div style={styles.skeletonPrice}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={styles.grid}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div style={styles.noResults}>
                                <h3 style={styles.noResultsText}>No products found matching your search</h3>
                                <button 
                                    style={styles.clearSearchButton}
                                    onClick={() => setSearchTerm('')}
                                >
                                    Clear search
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    background: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        padding: '40px 20px',
    },
    container: {
        maxWidth: '1400px',
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
        padding: '30px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '20px',
    },
    heading: {
        fontSize: '2.5rem',
        color: '#2a3440',
        margin: '0',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    emoji: {
        fontSize: '1.8rem',
    },
    controls: {
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
    },
    searchContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    searchIcon: {
        position: 'absolute',
        left: '15px',
    },
    searchInput: {
        padding: '12px 15px 12px 40px',
        border: '1px solid #e0e4e8',
        borderRadius: '8px',
        fontSize: '1rem',
        width: '250px',
        transition: 'all 0.3s ease',
    },
    filterButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'white',
        border: '1px solid #e0e4e8',
        borderRadius: '8px',
        padding: '12px 20px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    filterIcon: {
        flexShrink: 0,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '25px',
        marginTop: '20px',
    },
    errorContainer: {
        textAlign: 'center',
        padding: '50px 20px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        marginTop: '20px',
    },
    errorText: {
        color: '#e74c3c',
        marginBottom: '15px',
    },
    retryButton: {
        background: '#2a6f97',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '6px',
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'all 0.3s ease',
    },
    skeletonCard: {
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
    skeletonImage: {
        width: '100%',
        height: '200px',
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'loading 1.5s infinite',
    },
    skeletonTextContainer: {
        padding: '16px',
    },
    skeletonTitle: {
        width: '80%',
        height: '24px',
        background: '#f0f0f0',
        marginBottom: '10px',
        borderRadius: '4px',
    },
    skeletonPrice: {
        width: '40%',
        height: '20px',
        background: '#f0f0f0',
        borderRadius: '4px',
    },
    noResults: {
        gridColumn: '1 / -1',
        textAlign: 'center',
        padding: '40px',
    },
    noResultsText: {
        color: '#666',
        marginBottom: '20px',
    },
    clearSearchButton: {
        background: '#2a6f97',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '6px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
};

// Add this to your global CSS or style tag
// @keyframes loading {
//   0% { background-position: 200% 0; }
//   100% { background-position: -200% 0; }
// }

export default ProductList;