// Enhanced search functionality for the website
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-box i');
    
    if (searchInput && searchIcon) {
        // Create search results container
        const searchResults = document.createElement('div');
        searchResults.className = 'search-results';
        searchResults.style.display = 'none';
        searchResults.style.position = 'absolute';
        searchResults.style.top = '100%';
        searchResults.style.right = '0';
        searchResults.style.width = '300px';
        searchResults.style.maxHeight = '400px';
        searchResults.style.overflowY = 'auto';
        searchResults.style.backgroundColor = '#fff';
        searchResults.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        searchResults.style.borderRadius = '5px';
        searchResults.style.zIndex = '1000';
        searchResults.style.padding = '10px';
        
        // Append search results to search box
        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
            searchBox.style.position = 'relative';
            searchBox.appendChild(searchResults);
        }
        
        // Search function
        function performSearch() {
            const query = searchInput.value.toLowerCase().trim();
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            // Clear previous results
            searchResults.innerHTML = '';
            
            // Get all page content
            const pageContent = document.body.innerText.toLowerCase();
            
            // Simple search implementation
            if (pageContent.includes(query)) {
                // Find headings that might contain the query
                const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .blog-title, .mentor-name, .team-name');
                let resultsFound = false;
                
                headings.forEach(heading => {
                    if (heading.innerText.toLowerCase().includes(query)) {
                        const resultItem = document.createElement('div');
                        resultItem.className = 'search-result-item';
                        resultItem.style.padding = '10px';
                        resultItem.style.borderBottom = '1px solid #eee';
                        resultItem.style.cursor = 'pointer';
                        
                        resultItem.innerHTML = `<strong>${heading.innerText}</strong>`;
                        
                        // Find parent section or article
                        let parentSection = heading.closest('section') || heading.closest('article');
                        if (parentSection) {
                            const paragraphs = parentSection.querySelectorAll('p');
                            if (paragraphs.length > 0) {
                                const excerpt = paragraphs[0].innerText.substring(0, 100) + '...';
                                resultItem.innerHTML += `<p>${excerpt}</p>`;
                            }
                        }
                        
                        // Add click event to navigate
                        resultItem.addEventListener('click', function() {
                            heading.scrollIntoView({ behavior: 'smooth' });
                            searchResults.style.display = 'none';
                            
                            // Highlight the heading temporarily
                            const originalBackground = heading.style.backgroundColor;
                            heading.style.backgroundColor = 'var(--light-red)';
                            setTimeout(() => {
                                heading.style.backgroundColor = originalBackground;
                            }, 2000);
                        });
                        
                        searchResults.appendChild(resultItem);
                        resultsFound = true;
                    }
                });
                
                // If no specific headings found but query exists in page
                if (!resultsFound) {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'search-result-item';
                    resultItem.style.padding = '10px';
                    resultItem.innerHTML = `<p>Found matches for "${query}" on this page. Use browser search (Ctrl+F) for more specific results.</p>`;
                    searchResults.appendChild(resultItem);
                }
                
                searchResults.style.display = 'block';
            } else {
                // No results
                const noResults = document.createElement('div');
                noResults.className = 'search-result-item';
                noResults.style.padding = '10px';
                noResults.innerHTML = `<p>No results found for "${query}"</p>`;
                searchResults.appendChild(noResults);
                searchResults.style.display = 'block';
            }
        }
        
        // Event listeners for search
        searchInput.addEventListener('input', performSearch);
        
        searchIcon.addEventListener('click', function() {
            if (searchInput.value.trim() !== '') {
                performSearch();
            }
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', function(event) {
            if (!searchBox.contains(event.target)) {
                searchResults.style.display = 'none';
            }
        });
        
        // Handle Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

});
