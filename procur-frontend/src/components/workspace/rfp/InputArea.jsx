import React from "react";

const InputArea = ({ inputText, onInputChange, onGenerate, isGenerating, step }) => (
  <div className="rounded-2xl bg-slate-900/80 border border-slate-800/50 p-6 shadow-lg shadow-slate-900/30 backdrop-blur-xl">
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/50">
      <div className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
      <span className="text-lg font-semibold text-slate-200 font-mono tracking-wide">
        AI RFP Generator
      </span>
    </div>

    {step === "input" && (
      <div className="space-y-4">
        <textarea
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder='Try: "Cloud hosting services for e-commerce platform with auto-scaling, 99.9% uptime, 24/7 support. Budget 4000 USD, 1 year contract."'
          className="w-full h-24 resize-none rounded-xl bg-slate-950/50 border-2 border-slate-700/50 p-4 text-base text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all duration-300 font-medium shadow-inner"
        />
        <button
          onClick={onGenerate}
          disabled={!inputText.trim() || isGenerating}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-lg shadow-indigo-700/40 hover:shadow-indigo-600/50 transition-all duration-300 hover:-translate-y-1 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 justify-center h-12"
        >
          {isGenerating ? (
            <>
              <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              <span>Generating RFP...</span>
            </>
          ) : (
            <>✨ Generate Structured RFP</>
          )}
        </button>
      </div>
    )}

    {(step === "generating") && (
      <div className="flex flex-col items-center justify-center space-y-8 py-16">
        <div className="h-20 w-20 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-700/50">
          <svg className="w-10 h-10 text-white animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-black text-slate-200">Processing your request</h3>
          <p className="text-md text-slate-400 max-w-md">AI is structuring your RFP... This usually takes a few seconds.</p>
          <div className="flex space-x-2 justify-center">
            <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" />
            <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{animationDelay: '0.1s'}} />
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce" style={{animationDelay: '0.2s'}} />
          </div>
        </div>
      </div>
    )}

    {step === "preview" && (
      <div className="mt-6 rounded-lg border border-slate-700/40 bg-slate-800/20 p-4 text-slate-300 font-mono select-text break-words whitespace-pre-wrap">
        {inputText || "No prompt entered."}
      </div>
    )}
  </div>
);

export default InputArea;
