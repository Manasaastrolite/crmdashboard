
        // Hamburger menu functionality
        const hamburger = document.getElementById('hamburger');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const mainContent = document.getElementById('mainContent');

        hamburger.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);

        function toggleSidebar() {
            hamburger.classList.toggle('active');
            sidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('active');
            mainContent.classList.toggle('sidebar-open');
        }

        function closeSidebar() {
            hamburger.classList.remove('active');
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
            mainContent.classList.remove('sidebar-open');
        }

        // Navigation functionality
        function showContent(contentId) {
            // Hide all content frames
            const contentFrames = document.querySelectorAll('.content-frame');
            contentFrames.forEach(frame => frame.classList.remove('active'));
            
            // Remove active class from all nav links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Show selected content frame
            document.getElementById(contentId).classList.add('active');
            
            // Add active class to clicked nav link
            event.target.classList.add('active');
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        }

        // Update date and time
        function updateDateTime() {
            const now = new Date();
            const dateOptions = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const timeOptions = { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            };
            
            document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', dateOptions);
            document.getElementById('currentTime').textContent = now.toLocaleTimeString('en-US', timeOptions);
        }

        // Initialize date/time and update every second
        updateDateTime();
        setInterval(updateDateTime, 1000);

        // Initialize milk production chart
        window.addEventListener('load', function() {
            const ctx = document.getElementById('milkChart');
            if (ctx) {
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            label: 'Milk Production (Liters)',
                            data: [1650, 1720, 1580, 1850, 1900, 1750, 1850],
                            borderColor: '#667eea',
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: '#667eea',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2,
                            pointRadius: 6
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: false,
                                min: 1400,
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.05)'
                                }
                            },
                            x: {
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.05)'
                                }
                            }
                        }
                    }
                });
            }
        });

        // Close sidebar when clicking outside on desktop
        document.addEventListener('click', function(event) {
            if (window.innerWidth > 768) return;
            
            if (!sidebar.contains(event.target) && !hamburger.contains(event.target) && sidebar.classList.contains('open')) {
                closeSidebar();
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeSidebar();
            }
        });