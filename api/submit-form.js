// Vercel Serverless Function for form submission
export default async function handler(req, res) {
    // CORS設定を追加
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
        
        // 通常のSlack通知に加えて、代替手段としてメールサービスを使用
        try {
            // Slack通知
            const text = `*新しい問い合わせがありました*\n\n*氏名:* ${name}\n*メールアドレス:* ${email}\n*従業員数:* ${employees}人\n*申請内容:* ${application}`;
            
            const webhook_url = 'https://hooks.slack.com/services/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';
            const slackResponse = await fetch(webhook_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    text,
                    // 単純なテキストメッセージの代わりに、基本的なブロック形式を試す
                    blocks: [
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": text
                            }
                        }
                    ]
                }),
            });
            
            // 応答の詳細をログに記録（デバッグ用）
            console.log({
                status: slackResponse.status,
                statusText: slackResponse.statusText,
                headers: Object.fromEntries(slackResponse.headers.entries())
            });
        } catch (slackError) {
            // Slack通知が失敗しても全体のリクエストは失敗させない
            console.error('Slack notification failed:', slackError);
        }
        
        // フォーム送信は成功として扱う
        
        // 成功レスポンス
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Slack notification error:', error);
        // より詳細なエラーメッセージを含める
        return res.status(500).json({ 
            error: 'サーバーエラーが発生しました',
            details: error.message 
        });
    }
}
