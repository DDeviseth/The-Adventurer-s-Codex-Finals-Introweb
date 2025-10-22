// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuClose = document.getElementById('menuClose');
    
    if (hamburgerMenu && mobileMenu && menuClose) {
        // Open mobile menu
        hamburgerMenu.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            hamburgerMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
        
        // Close mobile menu
        menuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            document.body.style.overflow = ''; 
        });
        
        // Close menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                document.body.style.overflow = ''; 
            });
        });
        
        // Close menu when clicking outside (on the overlay)
        mobileMenu.addEventListener('click', function(event) {
            if (event.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                document.body.style.overflow = ''; 
            }
        });
        
        // Close menu with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                mobileMenu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                document.body.style.overflow = ''; 
            }
        });
    }
});

// Music Player Functionality - Add to all pages
document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    if (musicToggle && backgroundMusic) {
        // Try to get the current playback state from sessionStorage
        let isPlaying = sessionStorage.getItem('musicPlaying') === 'true';
        let currentTime = parseFloat(sessionStorage.getItem('musicTime')) || 0;

        // Restore previous state
        if (isPlaying) {
            backgroundMusic.currentTime = currentTime;
            backgroundMusic.play().catch(error => {
                console.log('Auto-resume failed:', error);
            });
            musicToggle.classList.add('playing');
            musicToggle.querySelector('.music-text').textContent = 'Pause Music';
            musicToggle.querySelector('.music-icon').textContent = '⏸️';
        }

        function toggleMusic() {
            if (isPlaying) {
                backgroundMusic.pause();
                musicToggle.classList.remove('playing');
                musicToggle.querySelector('.music-text').textContent = 'Play Music';
                musicToggle.querySelector('.music-icon').textContent = '🎵';
            } else {
                backgroundMusic.play().catch(error => {
                    console.log('Audio play failed:', error);
                });
                musicToggle.classList.add('playing');
                musicToggle.querySelector('.music-text').textContent = 'Pause Music';
                musicToggle.querySelector('.music-icon').textContent = '⏸️';
            }
            isPlaying = !isPlaying;
            
            // Save state to sessionStorage
            sessionStorage.setItem('musicPlaying', isPlaying);
        }

        musicToggle.addEventListener('click', toggleMusic);

        // Save current time periodically
        setInterval(function() {
            if (isPlaying) {
                sessionStorage.setItem('musicTime', backgroundMusic.currentTime);
            }
        }, 1000);

        // Auto-pause when page is not visible
        document.addEventListener('visibilitychange', function() {
            if (document.hidden && isPlaying) {
                backgroundMusic.pause();
            } else if (!document.hidden && isPlaying) {
                backgroundMusic.play().catch(error => {
                    console.log('Auto-resume failed:', error);
                });
            }
        });

        // Handle audio errors
        backgroundMusic.addEventListener('error', function() {
            console.error('Error loading audio file');
            musicToggle.style.display = 'none';
        });
    }
});