document.addEventListener('DOMContentLoaded', function () {
    const financialData = {
        summary: {
            totalIncome: 15000,
            totalExpenses: 6000,
            netProfit: 9000,
            assets: 25000,
            liabilities: 12000,
            equity: 13000
        },
        sales: {
            outstandingInvoices: 3000,
            paidInvoices: 12000,
            totalSales: 15000,
            openInvoices: 3000,
            overdueInvoices: 600
        },
        expenses: {
            totalExpensesOverview: 6000,
            recentExpenses: 1400,
            outstandingBills: 1200,
            paidBills: 4800
        }
    };

    // Update financial data
    document.getElementById('total-income').textContent = `$${financialData.summary.totalIncome.toLocaleString()}`;
    document.getElementById('total-expenses').textContent = `$${financialData.summary.totalExpenses.toLocaleString()}`;
    document.getElementById('net-profit').textContent = `$${financialData.summary.netProfit.toLocaleString()}`;
    document.getElementById('assets').textContent = `$${financialData.summary.assets.toLocaleString()}`;
    document.getElementById('liabilities').textContent = `$${financialData.summary.liabilities.toLocaleString()}`;
    document.getElementById('equity').textContent = `$${financialData.summary.equity.toLocaleString()}`;

    document.getElementById('outstanding-invoices').textContent = `$${financialData.sales.outstandingInvoices.toLocaleString()}`;
    document.getElementById('paid-invoices').textContent = `$${financialData.sales.paidInvoices.toLocaleString()}`;
    document.getElementById('total-sales').textContent = `$${financialData.sales.totalSales.toLocaleString()}`;
    document.getElementById('open-invoices').textContent = `$${financialData.sales.openInvoices.toLocaleString()}`;
    document.getElementById('overdue-invoices').textContent = `$${financialData.sales.overdueInvoices.toLocaleString()}`;

    document.getElementById('total-expenses-overview').textContent = `$${financialData.expenses.totalExpensesOverview.toLocaleString()}`;
    document.getElementById('recent-expenses').textContent = `$${financialData.expenses.recentExpenses.toLocaleString()}`;
    document.getElementById('outstanding-bills').textContent = `$${financialData.expenses.outstandingBills.toLocaleString()}`;
    document.getElementById('paid-bills').textContent = `$${financialData.expenses.paidBills.toLocaleString()}`;

   
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
        }, { threshold: 0.1 });

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
});
