// ===== API Key Generation =====
function generateApiKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const segments = [];
    
    // Generate key in format: fa_XXXX-XXXX-XXXX-XXXX
    const prefix = 'fa';
    for (let i = 0; i < 4; i++) {
        let segment = '';
        for (let j = 0; j < 8; j++) {
            segment += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        segments.push(segment);
    }
    
    const apiKey = `${prefix}_${segments.join('-')}`;
    
    // Update UI
    const keyPlaceholder = document.getElementById('keyPlaceholder');
    const keyValue = document.getElementById('keyValue');
    const copyBtn = document.getElementById('copyBtn');
    const generateBtn = document.getElementById('generateBtn');
    
    keyPlaceholder.style.display = 'none';
    keyValue.style.display = 'inline';
    keyValue.textContent = apiKey;
    copyBtn.disabled = false;
    
    // Animate button
    generateBtn.innerHTML = '<span class="btn-icon">✓</span> Generated!';
    generateBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    setTimeout(() => {
        generateBtn.innerHTML = '<span class="btn-icon">⚡</span> Regenerate';
        generateBtn.style.background = '';
    }, 2000);

    // Store key in localStorage for reference
    const keys = JSON.parse(localStorage.getItem('freeapi_keys') || '[]');
    keys.push({ key: apiKey, created: new Date().toISOString() });
    localStorage.setItem('freeapi_keys', JSON.stringify(keys));
}

// ===== Copy API Key =====
function copyApiKey() {
    const keyValue = document.getElementById('keyValue');
    const toast = document.getElementById('copyToast');
    
    if (!keyValue.textContent) return;
    
    navigator.clipboard.writeText(keyValue.textContent).then(() => {
        // Show toast
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = keyValue.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    });
}

// ===== Code Tab Switching =====
function switchTab(tab) {
    // Hide all code blocks
    document.querySelectorAll('.code-block').forEach(block => {
        block.style.display = 'none';
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(t => {
        t.classList.remove('active');
    });
    
    // Show selected code block
    document.getElementById(`code-${tab}`).style.display = 'block';
    
    // Add active class to clicked tab
    event.currentTarget.classList.add('active');
}

// ===== Copy Code Snippets =====
function copyCode(tab) {
    const codeBlock = document.querySelector(`#code-${tab} code`);
    const text = codeBlock.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector(`#code-${tab} .copy-code-btn`);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.background = '#10b981';
        btn.style.borderColor = '#10b981';
        btn.style.color = 'white';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.style.color = '';
        }, 2000);
    });
}

// ===== Smooth Scroll for Navigation =====
document.addEventListener('DOMContentLoaded', () => {
    // Add subtle entrance animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .api-card, .generator-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
