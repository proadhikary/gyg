// Thank You Page Animation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Create confetti elements
    createConfetti();
    
    // Trigger animations
    setTimeout(function() {
        // Add any additional animation triggers here
    }, 100);
    
    // Function to create confetti elements
    function createConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        const colors = [
            '#cae4d7', // mint green
            '#e3f3fa', // light blue
            '#fff2fc', // light pink
            '#f4c2c2', // light red
            '#5c0005'  // dark red
        ];
        
        // Create 50 confetti pieces
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random position
            const left = Math.random() * 100;
            confetti.style.left = `${left}%`;
            
            // Random delay
            const delay = Math.random() * 3;
            confetti.style.animationDelay = `${delay}s`;
            
            // Random size
            const size = Math.random() * 10 + 5;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            
            // Random color
            const color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.backgroundColor = color;
            
            // Random shape
            const shapes = ['circle', 'square', 'triangle'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'triangle') {
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.backgroundColor = 'transparent';
                confetti.style.borderLeft = `${size/2}px solid transparent`;
                confetti.style.borderRight = `${size/2}px solid transparent`;
                confetti.style.borderBottom = `${size}px solid ${color}`;
            }
            
            // Random rotation
            const rotation = Math.random() * 360;
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            // Add to container
            confettiContainer.appendChild(confetti);
        }
    }
    
    // Update form submission handlers to redirect to thank you page
    function updateFormHandlers() {
        const studentForm = document.getElementById('student-form');
        const mentorForm = document.getElementById('mentor-form');
        
        if (studentForm) {
            const originalSubmit = studentForm.onsubmit;
            studentForm.onsubmit = function(e) {
                if (originalSubmit) {
                    const result = originalSubmit.call(this, e);
                    if (result !== false) {
                        setTimeout(() => {
                            window.location.href = 'thanks.html';
                        }, 1000);
                    }
                    return result;
                } else {
                    e.preventDefault();
                    // Simulate form processing
                    setTimeout(() => {
                        window.location.href = 'thanks.html';
                    }, 1000);
                }
            };
        }
        
        if (mentorForm) {
            const originalSubmit = mentorForm.onsubmit;
            mentorForm.onsubmit = function(e) {
                if (originalSubmit) {
                    const result = originalSubmit.call(this, e);
                    if (result !== false) {
                        setTimeout(() => {
                            window.location.href = 'thanks.html';
                        }, 1000);
                    }
                    return result;
                } else {
                    e.preventDefault();
                    // Simulate form processing
                    setTimeout(() => {
                        window.location.href = 'thanks.html';
                    }, 1000);
                }
            };
        }
    }
    
    // Call the function to update form handlers if we're on a form page
    if (window.location.pathname.includes('form')) {
        updateFormHandlers();
    }
    
    // Add pulse animation to the checkmark
    const checkmarkCircle = document.querySelector('.checkmark-circle');
    if (checkmarkCircle) {
        setTimeout(() => {
            checkmarkCircle.classList.add('pulse');
        }, 1500);
    }
    
    // Add hover effect to return home button
    const returnHomeBtn = document.querySelector('.return-home');
    if (returnHomeBtn) {
        returnHomeBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 7px 20px rgba(92, 0, 5, 0.3)';
        });
        
        returnHomeBtn.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    }
});
