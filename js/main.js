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
                    // 相対パスを使用（同じドメイン上の/api/submit-formを指す）
                    const apiUrl = '/api/submit-form';
                    const fallbackUrl = 'https://cratte-8z7ns533f-cratte.vercel.app/api/submit-form';
                    
                    console.log('Sending form data to:', apiUrl);
                    console.log('Form data:', formDataObj);
                    
                    let response;
                    
                    try {
                        // 最初に相対パスで試す
                        response = await fetch(apiUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formDataObj)
                        });
                    } catch (firstError) {
                        console.log('First attempt failed, trying fallback URL:', fallbackUrl);
                        
                        // 失敗したらフォールバックURLを試す
                        response = await fetch(fallbackUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formDataObj),
                            mode: 'cors'
                        });
                    }
                    
                    // レスポンスのステータスをログに出力
                    console.log('Response status:', response.status);
                    
                    const result = await response.json();
                    console.log('Response data:', result);
                    
                    if (response.ok) {
                        // 送信成功
                        formStatus.innerHTML = '<p class="success">お問い合わせありがとうございます。担当者より連絡いたします。</p>';
                        inquiryForm.reset();
                    } else {
                        // エラーメッセージの表示
                        const errorDetails = result.details ? `: ${result.details}` : '';
                        formStatus.innerHTML = `<p class="error">エラーが発生しました: ${result.error}${errorDetails}</p>`;
                    }
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
