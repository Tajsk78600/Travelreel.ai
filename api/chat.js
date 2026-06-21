export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { messages } = req.body;
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({ 
        model: 'llama3-8b-8192', 
        messages, 
        max_tokens: 300, 
        temperature: 0.8 
      })
    });
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Kuch gadbad ho gayi!';
    res.status(200).json({ reply });
  } catch (e) {
    res.status(500).json({ reply: 'Server error aa gaya yaar! 😅' });
  }
}
