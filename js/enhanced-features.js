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
                    resultItem.innerHTML = `<p>Found matches for "${query}" on this page.</p>`;
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
    
    // Google Sheets form integration
    const studentForm = document.getElementById('student-form');
    const mentorForm = document.getElementById('mentor-form');
    
    // Function to handle form submission to Google Sheets
    function handleFormSubmit(event, formId) {
        event.preventDefault();
        
        // Validate form
        let isValid = true;
        const requiredFields = event.target.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Add error message if not exists
                let errorMsg = field.nextElementSibling;
                if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                    errorMsg = document.createElement('div');
                    errorMsg.classList.add('error-message');
                    errorMsg.textContent = 'This field is required';
                    field.parentNode.insertBefore(errorMsg, field.nextSibling);
                }
            } else {
                field.classList.remove('error');
                
                // Remove error message if exists
                const errorMsg = field.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
                
                // Email validation
                if (field.type === 'email' && !validateEmail(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                    
                    let errorMsg = field.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('div');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'Please enter a valid email address';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                }
            }
        });
        
        if (isValid) {
            // Prepare form data
            const formData = new FormData(event.target);
            const formObject = {};
            formData.forEach((value, key) => {
                // Handle checkboxes with same name (multiple selections)
                if (formObject[key] !== undefined) {
                    if (!Array.isArray(formObject[key])) {
                        formObject[key] = [formObject[key]];
                    }
                    formObject[key].push(value);
                } else {
                    formObject[key] = value;
                }
            });
            
            // Convert arrays to comma-separated strings
            Object.keys(formObject).forEach(key => {
                if (Array.isArray(formObject[key])) {
                    formObject[key] = formObject[key].join(', ');
                }
            });
            
            // Add form identifier
            formObject.formType = formId;
            
            // Show loading state
            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Send data to Google Sheets script
            fetch('https://script.google.com/macros/s/AKfycbzXYzaRyH1coAo_fyxZFY5P281e866U_vWKhDs3yysD8cM5jeA1iZuLLqME8fSDMehXEQ/exec', {
                method: 'POST',
                body: JSON.stringify(formObject),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.classList.add('success-message');
                successMsg.textContent = 'Form submitted successfully! We will get back to you soon.';
                event.target.appendChild(successMsg);
                
                // Reset form
                event.target.reset();
                
                // Remove success message after delay
                setTimeout(() => {
                    successMsg.remove();
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
                
                // Show error message
                const errorMsg = document.createElement('div');
                errorMsg.classList.add('error-message');
                errorMsg.style.padding = '1rem';
                errorMsg.style.marginTop = '1rem';
                errorMsg.style.backgroundColor = '#ffebee';
                errorMsg.style.textAlign = 'center';
                // errorMsg.textContent = 'There was an error submitting the form. Please try again later.';
                event.target.appendChild(errorMsg);
                
                // Remove error message after delay
                setTimeout(() => {
                    errorMsg.remove();
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }, 3000);
                
                // Fallback for demo purposes
                const fallbackMsg = document.createElement('div');
                fallbackMsg.classList.add('success-message');
                // fallbackMsg.textContent = 'Form received! We will get back to you soon.';
                event.target.appendChild(fallbackMsg);
                
                // Reset form in demo mode
                setTimeout(() => {
                    fallbackMsg.remove();
                    event.target.reset();
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }, 3000);
            });
        }
    }
    
    // Email validation helper function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Add event listeners to forms
    if (studentForm) {
        studentForm.addEventListener('submit', function(e) {
            handleFormSubmit(e, 'student');
        });
    }
    
    if (mentorForm) {
        mentorForm.addEventListener('submit', function(e) {
            handleFormSubmit(e, 'mentor');
        });
    }
});
