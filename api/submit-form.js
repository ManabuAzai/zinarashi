// Vercel Serverless Function for form submission
export default async function handler(req, res) {
    // CORS設定
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // OPTIONS（プリフライト）リクエストの処理
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // POSTリクエスト以外は拒否
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    
    try {
        const { name, email, application, employees } = req.body;
        
        // 必須フィールドの検証
        if (!name || !email || !application || !employees) {
            return res.status(400).json({ error: '必須項目が入力されていません' });
        }
        
        // Slackへの通知は行わず、メール送信のサンプルコード
        // 実際の実装では、EmailJSやNodemailerなどでメール送信を行う
        console.log('フォーム送信:', {
            name,
            email,
            application,
            employees,
            timestamp: new Date().toISOString()
        });
        
        // 成功レスポンス
        return res.status(200).json({ 
            success: true,
            message: 'フォームデータを受け取りました。担当者からの連絡をお待ちください。'
        });
    } catch (error) {
        console.error('Form submission error:', error);
        return res.status(500).json({ 
            error: 'サーバーエラーが発生しました',
            details: error.message 
        });
    }
}
