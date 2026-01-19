
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const SmartSolver: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const solveProblem = async () => {
    if (!prompt.trim() && !selectedImage) return;
    setLoading(true);
    setResponse(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let contents: any;

      if (selectedImage) {
        const base64Data = selectedImage.split(',')[1];
        contents = {
          parts: [
            { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
            { text: `Görseldeki matematik problemini tanı. Adım adım çözümü açıkla. Sonucu kalın yaz. Ek talimat: ${prompt}` }
          ]
        };
      } else {
        contents = `Profesyonel bir matematikçi gibi şu problemi adım adım çöz: "${prompt}"`;
      }

      const res = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: "Sen bir mobil eğitim asistanısın. Yanıtların Markdown formatında, temiz ve anlaşılır olsun. Matematiksel ifadeleri düzgün karakterlerle yaz.",
          temperature: 0.2,
        }
      });

      setResponse(res.text || "Üzgünüm, bir hata oluştu.");
    } catch (err) {
      setResponse("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-500 h-full">
      <div className="relative group glass rounded-[32px] p-1 shadow-2xl">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Problemi buraya yazın veya aşağıdan bir fotoğraf çekin..."
          className="w-full bg-transparent p-6 min-h-[160px] focus:outline-none text-lg resize-none placeholder:text-slate-600 text-slate-200"
        />
        
        <div className="absolute bottom-4 left-4 flex gap-3">
          <input type="file" accept="image/*" capture="environment" hidden ref={fileInputRef} onChange={handleImageSelect} />
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all active:scale-95 ${selectedImage ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-slate-800/80 text-purple-400 border border-slate-700'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span className="text-[10px] font-bold uppercase tracking-wider">{selectedImage ? 'Görüntü Hazır' : 'Fotoğraf Çek'}</span>
          </button>
        </div>

        <button
          onClick={solveProblem}
          disabled={loading || (!prompt && !selectedImage)}
          className="absolute bottom-4 right-4 bg-gradient-to-br from-blue-600 to-purple-600 disabled:from-slate-800 disabled:to-slate-800 p-4 rounded-2xl transition-all active:scale-90 shadow-xl shadow-blue-600/20"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          )}
        </button>
      </div>

      {selectedImage && (
        <div className="relative w-full h-32 rounded-[24px] overflow-hidden glass animate-in zoom-in-95">
          <img src={selectedImage} alt="Preview" className="w-full h-full object-cover opacity-40 blur-[1px]" />
          <div className="absolute inset-0 flex items-center justify-between px-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Görsel Hazır</span>
            <button onClick={() => setSelectedImage(null)} className="p-2 bg-red-500/20 text-red-400 rounded-xl text-[10px] font-bold">İPTAL</button>
          </div>
        </div>
      )}

      {response && (
        <div className="glass rounded-[32px] p-7 overflow-y-auto animate-in slide-in-from-bottom-6 duration-700 shadow-inner">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-purple-400 font-bold uppercase text-[10px] tracking-[0.2em]">Yapay Zeka Yanıtı</span>
          </div>
          <div className="text-slate-200 leading-relaxed text-[15px] space-y-4">
            {response.split('\n').map((line, i) => (
              <p key={i} className={line.startsWith('**') ? 'font-bold text-white text-lg' : ''}>
                {line.replace(/\*\*/g, '')}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSolver;
