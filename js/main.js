document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // フォーム送信処理
    const inquiryForm = document.getElementById('inquiry-form');
    const formStatus = document.getElementById('form-status');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // 送信中の状態表示
            formStatus.innerHTML = '<p class="sending">送信中です...</p>';
            formStatus.style.display = 'block';
            
            // フォームデータの取得
            const formData = new FormData(inquiryForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            try {
                // フォーム内容をSlackに送信せず、メール送信に置き換える
                // ここではローカルストレージに一時保存する実装例
                localStorage.setItem('form_submission', JSON.stringify({
                    name: formDataObj.name,
                    email: formDataObj.email,
                    application: formDataObj.application,
                    employees: formDataObj.employees,
                    timestamp: new Date().toISOString()
                }));
                
                // 実際のメール送信の代わりにコンソールに出力
                console.log('フォームデータをローカルに保存しました', formDataObj);
                
                // 送信成功メッセージ表示
                formStatus.innerHTML = '<p class="success">お問い合わせありがとうございます。担当者より連絡いたします。</p>';
                inquiryForm.reset();
                
                // 実際の実装では、ここでEmailJSなどのサービスを使用してメール送信する
                // 例: EmailJS.send(serviceID, templateID, formDataObj)
                
            } catch (error) {
                // 通信エラー
                formStatus.innerHTML = '<p class="error">通信エラーが発生しました。時間をおいて再度お試しください。</p>';
                console.error('Form submission error:', error);
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.padding = '10px 0';
        } else {
            header.style.padding = '15px 0';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile menu toggle (for future implementation if needed)
    // const menuToggle = document.querySelector('.menu-toggle');
    // const nav = document.querySelector('.nav');
    
    // if (menuToggle) {
    //     menuToggle.addEventListener('click', () => {
    //         nav.classList.toggle('active');
    //         menuToggle.classList.toggle('active');
    //     });
    // }
});
