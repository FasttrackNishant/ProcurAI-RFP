import React from "react";

function Landing({ onGetStarted }) {
  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-950 to-indigo-950 px-12 py-12 text-slate-50 overflow-hidden font-[Inter]">
        {/* Subtle background glows - no blinking */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-[25rem] w-[30rem] rounded-full bg-indigo-600/10 blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute bottom-16 left-16 h-[24rem] w-[24rem] rounded-full bg-emerald-600/8 blur-2xl animate-pulse delay-1000" />

        {/* Main content wrapper */}
        <div className="z-10 flex w-full max-w-[1440px] flex-row rounded-3xl bg-slate-900/85 p-20 shadow-2xl shadow-indigo-900/30 backdrop-blur-xl border border-slate-800/50">
          {/* Left: Text content */}
          <div className="flex flex-1 flex-col justify-center pr-20 md:pr-32">
            <div className="flex items-center gap-6 pb-8">
              
                	<img
							src="/logo.png"
							alt="ProcurAI Logo"
							className="h-30 w-30 rounded-full object-cover "
						/>
              {/* </div> */}
              <div>
                <h1 className="text-6xl font-black tracking-tight text-white">
                  ProcurAI
                </h1>
                <p className="mt-2 text-lg text-indigo-300 font-light">
                  AI-powered RFP management made simple
                </p>
              </div>
            </div>

            <h2 className="mb-8 max-w-xl text-5xl font-semibold leading-tight text-slate-100 animate-fadeInLeft">
              Automate your procurement workflow{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-black">
                from start to finish
              </span>
            </h2>
            <p className="mb-12 max-w-lg text-xl leading-relaxed text-slate-300 font-medium">
              Create RFPs with natural language, manage vendors, parse proposals 
              with AI, and get smart recommendations — all in one sleek app.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-max">
              <button
                onClick={onGetStarted}
                className="group rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-10 py-4 text-xl font-semibold text-white shadow-xl shadow-indigo-700/40 hover:shadow-indigo-600/50 transition-all duration-300 hover:-translate-y-1 hover:from-indigo-600 hover:to-purple-700 active:scale-95 flex-1 sm:flex-none"
              >
                <span>Start your free demo</span>
              </button>
              <button
                onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
                className="rounded-2xl border-2 border-slate-600/50 bg-slate-900/50 px-10 py-4 text-xl font-semibold text-slate-200 shadow-lg backdrop-blur-sm hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300 hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1 active:scale-95 flex-1 sm:flex-none"
              >
                Watch Demo Video →
              </button>
            </div>
          </div>

          {/* Right: Clean Demo Workflow */}
          <div className="flex flex-1 animate-fadeInRight">
            <div className="w-full rounded-3xl border border-indigo-800/40 bg-gradient-to-br from-slate-900/95 to-indigo-900/80 p-10 shadow-2xl shadow-indigo-900/40 backdrop-blur-xl">
              {/* Header */}
              <div className="mb-10 flex items-center justify-between pb-6 border-b border-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-gradient-to-r from-emerald-400 to-indigo-400" />
                  <span className="text-lg font-mono font-semibold text-indigo-300 tracking-wide">
                     Workflow
                  </span>
                </div>
                <div className="rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-500/40">
                  Ready
                </div>
              </div>

              {/* Clean workflow steps */}
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="group relative rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 backdrop-blur-sm hover:border-indigo-500/60 hover:bg-indigo-500/8 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-400 hover:scale-[1.015] cursor-pointer">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 border-2 border-indigo-500/40 group-hover:bg-indigo-500/25 group-hover:border-indigo-400 transition-all duration-300">
                      <svg className="w-6 h-6 text-indigo-400 group-hover:text-indigo-200 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.5h3m1.5-3h3.5-3.5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-16">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold mb-2">
                      Step 01
                    </div>
                    <p className="text-lg font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors">
                      Natural language RFPs
                    </p>
                    <p className="mt-1 text-sm text-slate-400 group-hover:text-slate-300">
                      "Need 20 laptops, 15 monitors, $50K budget..."
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="group relative rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 backdrop-blur-sm hover:border-emerald-500/60 hover:bg-emerald-500/8 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-400 hover:scale-[1.015] cursor-pointer">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 border-2 border-emerald-500/40 group-hover:bg-emerald-500/25 group-hover:border-emerald-400 transition-all duration-300">
                      <svg className="w-6 h-6 text-emerald-400 group-hover:text-emerald-200 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-16">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                      Step 02
                    </div>
                    <p className="text-lg font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">
                      Automated vendor emails
                    </p>
                    <p className="mt-1 text-sm text-slate-400 group-hover:text-slate-300">
                      One-click structured RFPs to multiple vendors
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="group relative rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 backdrop-blur-sm hover:border-purple-500/60 hover:bg-purple-500/8 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-400 hover:scale-[1.015] cursor-pointer">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 border-2 border-purple-500/40 group-hover:bg-purple-500/25 group-hover:border-purple-400 transition-all duration-300">
                      <svg className="w-6 h-6 text-purple-400 group-hover:text-purple-200 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-16">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold mb-2">
                      Step 03
                    </div>
                    <p className="text-lg font-semibold text-slate-100 group-hover:text-purple-300 transition-colors">
                      AI proposal analysis
                    </p>
                    <p className="mt-1 text-sm text-slate-400 group-hover:text-slate-300">
                      Automatic price extraction & vendor recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer credit */}
       <footer className="fixed bottom-4 left-0 right-0 z-50 flex justify-center text-sm text-indigo-400 font-light select-none pointer-events-none">
  <div className="rounded-xl bg-slate-900/70 px-5 py-2 backdrop-blur-md shadow-lg shadow-indigo-900/40">
    Made with <span className="text-red-500 font-bold">♥</span> by devnishant
  </div>
</footer>


        {/* Smooth animations */}
        <style>{`
          @keyframes fadeInLeft {
            0% { opacity: 0; transform: translateX(-40px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeInRight {
            0% { opacity: 0; transform: translateX(40px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .animate-fadeInLeft { animation: fadeInLeft 1s ease-out forwards; }
          .animate-fadeInRight { animation: fadeInRight 1s ease-out 0.2s forwards; }
        `}</style>
      </div>
    </>
  );
}

export default Landing;
