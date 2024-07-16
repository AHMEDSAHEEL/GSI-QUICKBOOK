document.addEventListener('DOMContentLoaded', function () {
    const spinner = document.querySelector('.spinner');
    spinner.style.display = 'block';
    const firebaseConfig = {
        apiKey: "AIzaSyCS1H8GgHeXxprx2yro5dIxFA0O_0wyl70",
        authDomain: "loginsignupgsi.firebaseapp.com",
        projectId: "loginsignupgsi",
        storageBucket: "loginsignupgsi.appspot.com",
        messagingSenderId: "70847031831",
        appId: "1:70847031831:web:163cb409e13163040a0a52"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();
    // Initialize Firebase


    // Check if user is authenticated
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            const isAdmin = await checkAdminRole(user.uid);
            console.log(isAdmin, user.uid) // Check if user is admin
            if (isAdmin === true) {
                setupPage(isAdmin);
            }
            else {
                // User is not logged in
               spinner.style.display = 'none';
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    const items = card.querySelectorAll('p');
                    items.forEach((item, index) => {
                        const spanId = item.querySelector('span').id;
                        const storedValue = localStorage.getItem(spanId);
                        if (storedValue) {
                            item.querySelector('span').textContent = storedValue;
                        }
                    });
                });

                function addTimedAnimation() {
                    const cards = document.querySelectorAll('.card.hidden');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('show');
                        }, index * 500);
                    });
                }

                function addScrollAnimation() {
                    const cards = document.querySelectorAll('.card');
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.classList.add('show');
                                observer.unobserve(entry.target);
                            }
                        });
                    }, { threshold: 0.5 });

                    cards.forEach(card => {
                        observer.observe(card);
                    });
                }

                if (window.innerWidth <= 910) {
                    addScrollAnimation();
                } else {
                    addTimedAnimation();
                }

                window.addEventListener('resize', function () {
                    if (window.innerWidth <= 910) {
                        addScrollAnimation();
                    } else {
                        addTimedAnimation();
                    }
                });
                // Assume non-admin role
            }  // Charts setup and update functions
            let summaryChart, salesChart, expensesChart;

            function updateSummaryChart() {
                const totalIncome = parseInt(document.getElementById('total-income').textContent.replace('₹', '')) || 0;
                const totalExpenses = parseInt(document.getElementById('total-expenses').textContent.replace('₹', '')) || 0;
                const assets = parseInt(document.getElementById('assets').textContent.replace('₹', '')) || 0;
                const liabilities = parseInt(document.getElementById('liabilities').textContent.replace('₹', '')) || 0;
                const equity = parseInt(document.getElementById('equity').textContent.replace('₹', '')) || 0;
                const net = parseInt(document.getElementById('net-profit').textContent.replace('₹', '')) || 0;

                const data = {
                    labels: ['Total Income', 'Total Expenses', 'Assets', 'Liabilities', 'Equity', 'Net Profit'],
                    datasets: [{
                        label: 'Summary',
                        data: [totalIncome, totalExpenses, assets, liabilities, equity, net],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 25, 0.2)',
                            'rgba(255, 206, 186, 0.2)',
                            'rgba(235, 216, 46, 0.2)',
                            'rgba(153, 100, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(153, 202, 255, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }]
                };

                const config = {
                    type: 'pie',
                    data: data,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Summary Chart'
                            }
                        }
                    },
                };

                const ctx = document.getElementById('summary-chart-0').getContext('2d');

                // Destroy existing chart if it exists
                if (summaryChart) {
                    summaryChart.destroy();
                }

                summaryChart = new Chart(ctx, config);
            }

            function updateSummaryChart1() {
                const outStandingInvoices = parseInt(document.getElementById('outstanding-invoices').textContent.replace('₹', '')) || 0;
                const paidInvoices = parseInt(document.getElementById('paid-invoices').textContent.replace('₹', '')) || 0;
                const totalSales = parseInt(document.getElementById('total-sales').textContent.replace('₹', '')) || 0;
                const openInvoices = parseInt(document.getElementById('open-invoices').textContent.replace('₹', '')) || 0;
                const overDueInvoices = parseInt(document.getElementById('overdue-invoices').textContent.replace('₹', '')) || 0;

                const data = {
                    labels: ['Outstanding', 'Paid', 'Total Sales', 'Open Invoices', 'Overdue Invoices'],
                    datasets: [{
                        label: 'Sales',
                        data: [outStandingInvoices, paidInvoices, totalSales, openInvoices, overDueInvoices],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 25, 0.2)',
                            'rgba(255, 206, 186, 0.2)',
                            'rgba(235, 216, 46, 0.2)',
                            'rgba(153, 100, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(153, 202, 255, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }]
                };

                const config = {
                    type: 'pie',
                    data: data,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Sales Chart'
                            }
                        }
                    },
                };

                const ctx = document.getElementById('summary-chart-1').getContext('2d');

                // Destroy existing chart if it exists
                if (salesChart) {
                    salesChart.destroy();
                }

                salesChart = new Chart(ctx, config);
            }

            function updateSummaryChart2() {
                const totalExpenses = parseInt(document.getElementById('total-expenses-overview').textContent.replace('₹', '')) || 0;
                const recentExpenses = parseInt(document.getElementById('recent-expenses').textContent.replace('₹', '')) || 0;
                const paidBills = parseInt(document.getElementById('paid-bills').textContent.replace('₹', '')) || 0;
                const outstandingBills = parseInt(document.getElementById('outstanding-bills').textContent.replace('₹', '')) || 0;

                const data = {
                    labels: ['Total Expenses', 'Recent Expenses', 'Outstanding', 'Paid'],
                    datasets: [{
                        label: 'Expenses',
                        data: [totalExpenses, recentExpenses, outstandingBills, paidBills],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 25, 0.2)',
                            'rgba(255, 206, 186, 0.2)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 1
                    }]
                };

                const config = {
                    type: 'pie',
                    data: data,
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Expenses Chart'
                            }
                        }
                    },
                };

                const ctx = document.getElementById('summary-chart-2').getContext('2d');

                // Destroy existing chart if it exists
                if (expensesChart) {
                    expensesChart.destroy();
                }

                expensesChart = new Chart(ctx, config);
            }

            // Initialize the summary charts when the page loads
            updateSummaryChart();
            updateSummaryChart1();
            updateSummaryChart2();

        }
    });

    // Function to check admin role
    async function checkAdminRole(userId) {
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
            console.log(userDoc.data())
            return userDoc.data().isAdmin || false;
        } else {
            return false; // Default to non-admin if user document not found
        }
    }
    function setupPage(isAdmin) {
        // DOMContentLoaded event handler
        spinner.style.display = 'none';
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const items = card.querySelectorAll('p');
            items.forEach((item, index) => {
                const spanId = item.querySelector('span').id;
                const storedValue = localStorage.getItem(spanId);
                if (storedValue) {
                    item.querySelector('span').textContent = storedValue;
                }
            });
        });

        function addTimedAnimation() {
            const cards = document.querySelectorAll('.card.hidden');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('show');
                }, index * 500);
            });
        }

        function addScrollAnimation() {
            const cards = document.querySelectorAll('.card');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            cards.forEach(card => {
                observer.observe(card);
            });
        }

        if (window.innerWidth <= 910) {
            addScrollAnimation();
        } else {
            addTimedAnimation();
        }

        window.addEventListener('resize', function () {
            if (window.innerWidth <= 910) {
                addScrollAnimation();
            } else {
                addTimedAnimation();
            }
        });

        // Modal functionality
        const modal = document.getElementById('myModal');
        const modalTitle = document.getElementById('modal-title');
        const modalForm = document.getElementById('modal-form');
        const closeBtn = document.querySelector('.close-btn');
        let currentCard = null;

        cards.forEach(card => {
            card.addEventListener('click', function () {
                currentCard = card;
                modalTitle.textContent = card.querySelector('h3').textContent;
                modalForm.innerHTML = '';
                const items = card.querySelectorAll('p');
                items.forEach((item, index) => {
                    const label = item.textContent.split(':')[0];
                    const spanId = item.querySelector('span').id;

                    const formGroup = document.createElement('div');
                    formGroup.classList.add('form-group');

                    const inputLabel = document.createElement('label');
                    inputLabel.setAttribute('for', `modal-input-${index}`);
                    inputLabel.textContent = label;

                    const inputField = document.createElement('input');
                    inputField.type = 'number';
                    inputField.id = `modal-input-${index}`;
                    inputField.value = item.querySelector('span').textContent.replace('₹', '');
                    inputField.required = true;

                    formGroup.appendChild(inputLabel);
                    formGroup.appendChild(inputField);
                    modalForm.appendChild(formGroup);
                });

                const updateBtn = document.createElement('button');
                updateBtn.type = 'button';
                updateBtn.id = 'updateBtn';
                updateBtn.classList.add('btn');
                updateBtn.textContent = 'Update';
                modalForm.appendChild(updateBtn);

                const clearBtn = document.createElement('button');
                clearBtn.type = 'button';
                clearBtn.id = 'clearBtn';
                clearBtn.classList.add('btn');
                clearBtn.textContent = 'Clear';
                modalForm.appendChild(clearBtn);

                updateBtn.addEventListener('click', function () {
                    if (isAdmin) {
                        items.forEach((item, index) => {
                            const span = item.querySelector('span');
                            const input = document.getElementById(`modal-input-${index}`);
                            const formattedValue = '₹' + input.value.trim();
                            span.textContent = formattedValue;
                            localStorage.setItem(span.id, formattedValue);
                        });

                        // Update Firestore if isAdmin
                        const updateData = {};
                        items.forEach((item, index) => {
                            const spanId = item.querySelector('span').id;
                            updateData[spanId] = localStorage.getItem(spanId);
                        });

                        // db.collection('users').doc('yourDocument').update(updateData)
                        //     .then(() => {
                        //         console.log('Document successfully updated in Firestore');
                        // Update respective chart based on card ID
                        const cl = card.id;
                        if (cl === 'profit-loss-card' || cl === 'balance-sheet-card') {
                            updateSummaryChart();
                        } else if (cl === 'invoices-card' || cl === 'sales-overview-card') {
                            updateSummaryChart1();
                        } else {
                            updateSummaryChart2();
                        }
                        // })
                        // .catch((error) => {
                        //     console.error('Error updating document: ', error);
                        // });
                        // } else {
                        //     // Show message or restrict access if not isAdmin
                        //     alert('You do not have permission to modify data.');
                        // }
                    }
                    modal.style.display = 'none';
                });

                clearBtn.addEventListener('click', function () {
                    items.forEach((item, index) => {
                        const input = document.getElementById(`modal-input-${index}`);
                        input.value = ''; // Clear input field
                    });
                });

                modal.style.display = 'block';
            });
        });

        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Charts setup and update functions
        let summaryChart, salesChart, expensesChart;

        function updateSummaryChart() {
            const totalIncome = parseInt(document.getElementById('total-income').textContent.replace('₹', '')) || 0;
            const totalExpenses = parseInt(document.getElementById('total-expenses').textContent.replace('₹', '')) || 0;
            const assets = parseInt(document.getElementById('assets').textContent.replace('₹', '')) || 0;
            const liabilities = parseInt(document.getElementById('liabilities').textContent.replace('₹', '')) || 0;
            const equity = parseInt(document.getElementById('equity').textContent.replace('₹', '')) || 0;
            const net = parseInt(document.getElementById('net-profit').textContent.replace('₹', '')) || 0;

            const data = {
                labels: ['Total Income', 'Total Expenses', 'Assets', 'Liabilities', 'Equity', 'Net Profit'],
                datasets: [{
                    label: 'Summary',
                    data: [totalIncome, totalExpenses, assets, liabilities, equity, net],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 25, 0.2)',
                        'rgba(255, 206, 186, 0.2)',
                        'rgba(235, 216, 46, 0.2)',
                        'rgba(153, 100, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(153, 202, 255, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            };

            const config = {
                type: 'pie',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Summary Chart'
                        }
                    }
                },
            };

            const ctx = document.getElementById('summary-chart-0').getContext('2d');

            // Destroy existing chart if it exists
            if (summaryChart) {
                summaryChart.destroy();
            }

            summaryChart = new Chart(ctx, config);
        }

        function updateSummaryChart1() {
            const outStandingInvoices = parseInt(document.getElementById('outstanding-invoices').textContent.replace('₹', '')) || 0;
            const paidInvoices = parseInt(document.getElementById('paid-invoices').textContent.replace('₹', '')) || 0;
            const totalSales = parseInt(document.getElementById('total-sales').textContent.replace('₹', '')) || 0;
            const openInvoices = parseInt(document.getElementById('open-invoices').textContent.replace('₹', '')) || 0;
            const overDueInvoices = parseInt(document.getElementById('overdue-invoices').textContent.replace('₹', '')) || 0;

            const data = {
                labels: ['Outstanding', 'Paid', 'Total Sales', 'Open Invoices', 'Overdue Invoices'],
                datasets: [{
                    label: 'Sales',
                    data: [outStandingInvoices, paidInvoices, totalSales, openInvoices, overDueInvoices],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 25, 0.2)',
                        'rgba(255, 206, 186, 0.2)',
                        'rgba(235, 216, 46, 0.2)',
                        'rgba(153, 100, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(153, 202, 255, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            };

            const config = {
                type: 'pie',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Sales Chart'
                        }
                    }
                },
            };

            const ctx = document.getElementById('summary-chart-1').getContext('2d');

            // Destroy existing chart if it exists
            if (salesChart) {
                salesChart.destroy();
            }

            salesChart = new Chart(ctx, config);
        }

        function updateSummaryChart2() {
            const totalExpenses = parseInt(document.getElementById('total-expenses-overview').textContent.replace('₹', '')) || 0;
            const recentExpenses = parseInt(document.getElementById('recent-expenses').textContent.replace('₹', '')) || 0;
            const paidBills = parseInt(document.getElementById('paid-bills').textContent.replace('₹', '')) || 0;
            const outstandingBills = parseInt(document.getElementById('outstanding-bills').textContent.replace('₹', '')) || 0;

            const data = {
                labels: ['Total Expenses', 'Recent Expenses', 'Outstanding', 'Paid'],
                datasets: [{
                    label: 'Expenses',
                    data: [totalExpenses, recentExpenses, outstandingBills, paidBills],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 25, 0.2)',
                        'rgba(255, 206, 186, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            };

            const config = {
                type: 'pie',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Expenses Chart'
                        }
                    }
                },
            };

            const ctx = document.getElementById('summary-chart-2').getContext('2d');

            // Destroy existing chart if it exists
            if (expensesChart) {
                expensesChart.destroy();
            }

            expensesChart = new Chart(ctx, config);
        }

        // Initialize the summary charts when the page loads
        updateSummaryChart();
        updateSummaryChart1();
        updateSummaryChart2();
    }
});
