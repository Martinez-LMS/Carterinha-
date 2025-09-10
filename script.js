document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('student-form');
    const generateBtn = document.getElementById('generate-card');
    const downloadBtn = document.getElementById('download-card');
    const printBtn = document.getElementById('print-card');
    
    // Get form inputs
    const nameInput = document.getElementById('student-name');
    const idInput = document.getElementById('student-id');
    const courseInput = document.getElementById('course');
    const universityInput = document.getElementById('university');
    const semesterInput = document.getElementById('semester');
    const photoFileInput = document.getElementById('student-photo');
    const photoUrlInput = document.getElementById('photo-url');
    
    // Get card elements
    const cardName = document.getElementById('card-name');
    const cardId = document.getElementById('card-id');
    const cardCourse = document.getElementById('card-course');
    const cardUniversity = document.getElementById('card-university');
    const cardSemester = document.getElementById('card-semester');
    const cardPhoto = document.getElementById('card-photo');
    const cardValidity = document.getElementById('card-validity');
    
    // Set default validity date (next year)
    function setDefaultValidity() {
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        const day = nextYear.getDate().toString().padStart(2, '0');
        const month = (nextYear.getMonth() + 1).toString().padStart(2, '0');
        const year = nextYear.getFullYear();
        cardValidity.textContent = `${day}/${month}/${year}`;
    }
    
    // Initialize default validity
    setDefaultValidity();
    
    // Real-time preview updates
    nameInput.addEventListener('input', function() {
        cardName.textContent = this.value.toUpperCase() || 'NOME DO ESTUDANTE';
    });
    
    idInput.addEventListener('input', function() {
        cardId.textContent = this.value || '000000000';
    });
    
    courseInput.addEventListener('input', function() {
        cardCourse.textContent = this.value.toUpperCase() || 'CURSO';
    });
    
    universityInput.addEventListener('input', function() {
        const university = this.value.toUpperCase() || 'UNIVERSIDADE';
        cardUniversity.textContent = university;
    });
    
    semesterInput.addEventListener('change', function() {
        cardSemester.textContent = this.value || 'SEMESTRE';
    });
    
    // Handle photo upload
    photoFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                updateCardPhoto(e.target.result);
            };
            reader.readAsDataURL(file);
            // Clear URL input when file is selected
            photoUrlInput.value = '';
        }
    });
    
    // Handle photo URL
    photoUrlInput.addEventListener('input', function() {
        if (this.value) {
            updateCardPhoto(this.value);
            // Clear file input when URL is provided
            photoFileInput.value = '';
        }
    });
    
    function updateCardPhoto(src) {
        cardPhoto.innerHTML = `<img src="${src}" alt="Foto do estudante" onerror="this.parentElement.innerHTML='📷'">`;
    }
    
    // Generate card button
    generateBtn.addEventListener('click', function() {
        if (validateForm()) {
            // Update all card information
            updateCard();
            showSuccessMessage();
        } else {
            showErrorMessage();
        }
    });
    
    function validateForm() {
        const requiredFields = [nameInput, idInput, courseInput, universityInput, semesterInput];
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '#e0e0e0';
            }
        });
        
        return isValid;
    }
    
    function updateCard() {
        cardName.textContent = nameInput.value.toUpperCase();
        cardId.textContent = idInput.value;
        cardCourse.textContent = courseInput.value.toUpperCase();
        cardUniversity.textContent = universityInput.value.toUpperCase();
        cardSemester.textContent = semesterInput.value;
        
        // Handle photo
        if (photoFileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                updateCardPhoto(e.target.result);
            };
            reader.readAsDataURL(photoFileInput.files[0]);
        } else if (photoUrlInput.value) {
            updateCardPhoto(photoUrlInput.value);
        }
    }
    
    function showSuccessMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 600;
        `;
        message.textContent = '✅ Carterinha gerada com sucesso!';
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
    
    function showErrorMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 600;
        `;
        message.textContent = '❌ Por favor, preencha todos os campos obrigatórios!';
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
    
    // Download card as image
    downloadBtn.addEventListener('click', function() {
        html2canvas(document.getElementById('id-card')).then(canvas => {
            const link = document.createElement('a');
            link.download = `carterinha_${idInput.value || 'estudante'}.png`;
            link.href = canvas.toDataURL();
            link.click();
        }).catch(() => {
            // Fallback: save as PDF using browser print
            window.print();
        });
    });
    
    // Print card
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // Generate sample data button for testing
    function addSampleDataButton() {
        const sampleBtn = document.createElement('button');
        sampleBtn.type = 'button';
        sampleBtn.textContent = '📝 Dados de Exemplo';
        sampleBtn.style.cssText = `
            background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            margin-top: 10px;
            width: 100%;
            transition: all 0.3s ease;
        `;
        
        sampleBtn.addEventListener('click', function() {
            nameInput.value = 'Maria Silva Santos';
            idInput.value = '202301234';
            courseInput.value = 'Engenharia de Software';
            universityInput.value = 'Universidade Federal do Brasil';
            semesterInput.value = '5º Semestre';
            photoUrlInput.value = 'https://images.unsplash.com/photo-1494790108755-2616b2ae0896?w=200&h=250&fit=crop&crop=face';
            
            // Trigger input events for real-time preview
            nameInput.dispatchEvent(new Event('input'));
            idInput.dispatchEvent(new Event('input'));
            courseInput.dispatchEvent(new Event('input'));
            universityInput.dispatchEvent(new Event('input'));
            semesterInput.dispatchEvent(new Event('change'));
            photoUrlInput.dispatchEvent(new Event('input'));
            
            showSampleMessage();
        });
        
        sampleBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(243, 156, 18, 0.3)';
        });
        
        sampleBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        generateBtn.parentNode.appendChild(sampleBtn);
    }
    
    function showSampleMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f39c12;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 600;
        `;
        message.textContent = '📝 Dados de exemplo carregados!';
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
    
    // Add sample data button
    addSampleDataButton();
    
    // Add html2canvas library dynamically for download functionality
    if (!window.html2canvas) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        document.head.appendChild(script);
    }
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to form inputs
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add card flip animation on generation
    const idCard = document.getElementById('id-card');
    const originalGenerateBtn = document.getElementById('generate-card');
    
    originalGenerateBtn.addEventListener('click', function() {
        if (document.getElementById('student-name').value) {
            idCard.style.transform = 'rotateY(10deg) scale(1.05)';
            setTimeout(() => {
                idCard.style.transform = 'rotateY(0deg) scale(1)';
            }, 500);
        }
    });
});

// Add PWA-like functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Register service worker for offline functionality (optional)
        console.log('Carterinha app ready for offline use');
    });
}