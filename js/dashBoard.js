document.addEventListener('DOMContentLoaded', function () {
    // get stored values from local storage
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const items = card.querySelectorAll('p');
        items.forEach((item, index) => {
            const spanId = item.querySelector('span').id;
            const storedValue = localStorage.getItem(spanId);
            console.log(storedValue);
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

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function () {
            currentCard = card;
            modalTitle.textContent = card.querySelector('h3').textContent;
            modalForm.innerHTML = '';
            let spanId = null;
            const items = card.querySelectorAll('p');
            items.forEach((item, index) => {
                const label = item.textContent.split(':')[0];
                spanId = item.querySelector('span').id;

                const formGroup = document.createElement('div');
                formGroup.classList.add('form-group');

                const inputLabel = document.createElement('label');
                inputLabel.setAttribute('for', `modal-input-${index}`);
                inputLabel.textContent = label;

                const inputField = document.createElement('input');
                inputField.type = 'number';
                inputField.id = `modal-input-${index}`;
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
                const items = card.querySelectorAll('p');
                items.forEach((item, index) => {
                    const span = item.querySelector('span');
                    const value = document.getElementById(`modal-input-${index}`).value;
                    const formattedValue = '$' + value;
                    span.textContent = formattedValue;
                    // Store the updated value in local storage
                    localStorage.setItem(span.id, formattedValue);
                });
                modal.style.display = 'none';
            });

            clearBtn.addEventListener('click', function () {
                const inputs = modalForm.querySelectorAll('input');
                inputs.forEach(input => {
                    input.value = '';
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
});
