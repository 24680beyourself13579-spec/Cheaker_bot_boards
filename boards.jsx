import React, { useState } from 'react';
import { 
  GitMerge, 
  GitBranch, 
  Target, 
  Crown, 
  Cpu, 
  RefreshCcw, 
  Swords, 
  BrainCircuit, 
  Activity,
  ArrowRight,
  Database,
  Play,
  RotateCcw,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

// --- Reusable Components (Mind-Map / Sketch Theme) ---

const PanelContainer = ({ children, title, subtitle }) => (
  <div className="w-full max-w-6xl mx-auto mb-16 animate-in fade-in zoom-in duration-500">
    <div className="text-center mb-12 relative">
      <div className="inline-block relative">
        {/* Sketchy background highlight for title */}
        <div className="absolute -inset-2 bg-[#f5c643] rounded-3xl transform -rotate-2 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] -z-10"></div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tight px-6 py-2">
          {title}
        </h1>
      </div>
      {subtitle && <h2 className="text-xl md:text-2xl mt-8 text-slate-700 font-bold max-w-3xl mx-auto uppercase tracking-widest">{subtitle}</h2>}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
      {children}
    </div>
  </div>
);

const Card = ({ children, title, icon: Icon, color, className = "", span = "col-span-12 lg:col-span-6" }) => {
  // Colors perfectly matched to the provided mind-map image
  const themeMap = {
    teal: "border-slate-900 bg-[#3b9f9f] text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]", // PLANNING bubble
    orange: "border-slate-900 bg-[#f49352] text-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]", // Research/DO! bubble
    red: "border-slate-900 bg-[#cd484a] text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]", // STRATEGY bubble
    charcoal: "border-slate-900 bg-[#3c3d3d] text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]", // IDEAS hub
    yellow: "border-slate-900 bg-[#f5c643] text-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]", // Lightbulbs/highlights
    white: "border-slate-900 bg-white text-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]",
  };

  const isDarkText = color === 'orange' || color === 'yellow' || color === 'white';

  return (
    <div className={`border-[4px] rounded-[2rem] p-6 flex flex-col ${themeMap[color]} ${className} ${span} transition-transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] duration-300`}>
      <div className="flex items-center mb-5 border-b-[3px] border-current pb-4 opacity-90">
        {Icon && <Icon className={`w-8 h-8 mr-3 flex-shrink-0`} strokeWidth={3} />}
        <h3 className={`text-2xl font-black uppercase tracking-wide`}>{title}</h3>
      </div>
      <div className={`flex-grow font-medium leading-relaxed text-base ${isDarkText ? 'text-slate-800' : 'text-slate-100'}`}>
        {children}
      </div>
    </div>
  );
};

// --- Math Helpers ---
const MathVar = ({ children }) => <span className="italic font-serif font-bold">{children}</span>;
const MathSub = ({ children }) => <sub className="text-xs font-sans font-bold">{children}</sub>;

// --- Interactive MCTS Visualizer Component ---
const MCTSVisualizer = () => {
  const [step, setStep] = useState(0);
  
  const stepDescriptions = [
    "Ready to explore. Root node represents the current board state.",
    "1. SELECTION: Using UCT, we navigate down to find a leaf node.",
    "2. EXPANSION: We generate a new valid move, adding a node.",
    "3. SIMULATION: We play completely random moves until the game ends.",
    "4. BACKPROPAGATION: The Win(1)/Loss(0) result is passed back up the path."
  ];

  const handleNext = () => setStep((s) => (s + 1) % 5);
  const handleReset = () => setStep(0);

  const treeNodes = [
    { id: 'root', x: 150, y: 30, w: step === 4 ? 11 : 10, v: step === 4 ? 6 : 5 },
    { id: 'l1', x: 75, y: 100, w: step === 4 ? 4 : 3, v: step === 4 ? 2 : 1 },
    { id: 'r1', x: 225, y: 100, w: 6, v: 4 },
    { id: 'l2', x: 75, y: 170, w: step === 4 ? 1 : 0, v: step >= 2 ? (step === 4 ? 1 : 0) : null }, 
  ];

  return (
    <div className="w-full bg-white border-[4px] border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rounded-2xl p-4 flex flex-col items-center mt-6 relative overflow-hidden">
      {/* Sketchy background dots */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:16px_16px] pointer-events-none"></div>
      
      <div className="flex justify-between items-center w-full mb-4 relative z-10">
        <h4 className="font-black text-slate-900 uppercase">Interactive Loop</h4>
        <div className="flex gap-2">
          <button onClick={handleNext} className="bg-[#cd484a] hover:bg-red-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] px-4 py-2 rounded-xl font-black uppercase text-sm transition-transform active:translate-y-1 active:shadow-none flex items-center">
            {step === 4 ? "Restart" : "Next Step"} <Play size={16} className="ml-2" />
          </button>
          <button onClick={handleReset} className="bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] p-2 rounded-xl transition-transform active:translate-y-1 active:shadow-none">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
      
      <div className="h-16 flex items-center justify-center text-center px-4 bg-[#f5c643] border-[3px] border-slate-900 rounded-xl w-full mb-4 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] text-sm font-bold text-slate-900 relative z-10">
        {stepDescriptions[step]}
      </div>

      <div className="relative w-full max-w-[300px] h-[260px] bg-slate-50 border-[3px] border-slate-900 rounded-xl overflow-hidden relative z-10">
        <svg width="100%" height="100%" viewBox="0 0 300 260">
          <line x1="150" y1="30" x2="75" y2="100" stroke={step >= 1 ? "#f49352" : "#94a3b8"} strokeWidth={step >= 1 ? 6 : 3} />
          <line x1="150" y1="30" x2="225" y2="100" stroke="#94a3b8" strokeWidth="3" />
          
          {step >= 2 && (
            <line x1="75" y1="100" x2="75" y2="170" stroke={step >= 2 ? "#f49352" : "#94a3b8"} strokeWidth={step >= 2 ? 6 : 3} />
          )}
          
          {step === 3 && (
            <path d="M75,170 Q45,210 75,250" stroke="#cd484a" strokeWidth="4" strokeDasharray="8 8" fill="none" className="animate-pulse" />
          )}

          {step >= 3 && (
             <text x="85" y="240" fill="#cd484a" fontSize="18" fontWeight="900">+1 WIN!</text>
          )}

          {treeNodes.map((n) => {
            if (n.v === null) return null;
            const isHighlighted = (n.id === 'root' && step >= 1) || (n.id === 'l1' && step >= 1) || (n.id === 'l2' && step >= 2);
            return (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r="24" fill={isHighlighted && step < 4 ? "#f5c643" : (step === 4 && isHighlighted ? "#3b9f9f" : "white")} stroke="#0f172a" strokeWidth="4" />
                <text x={n.x} y={n.y - 2} textAnchor="middle" fontSize="14" fontWeight="900" fill="#0f172a">{n.w} / {n.v}</text>
                <text x={n.x} y={n.y + 14} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">W / N</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};


// --- Panel 1: Deterministic Path ---
const PanelOne = () => (
  <PanelContainer 
    title="Solving Checkers" 
    subtitle="The Deterministic Path & Algorithmic Optimizations"
  >
    <Card title="Formal Search Problem" icon={BrainCircuit} color="teal" span="col-span-12 lg:col-span-5">
      <div className="mb-4 bg-[#2c7a7a] p-4 rounded-xl border-[3px] border-slate-900 text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        <strong>DEFINITION:</strong> Two-player, finite, deterministic. <br/>
        <strong className="text-[#f5c643]">Zero-sum:</strong> My win is your loss.<br/>
        <strong className="text-[#f49352]">Perfect Information:</strong> Nothing hidden.
      </div>
      <ul className="space-y-4 font-bold">
        <li className="flex gap-3 items-center">
          <span className="bg-white text-slate-900 border-2 border-slate-900 px-3 py-1 rounded-lg w-28 text-center shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">States (S)</span>
          <span>Coordinate board mapping.</span>
        </li>
        <li className="flex gap-3 items-center">
          <span className="bg-white text-slate-900 border-2 border-slate-900 px-3 py-1 rounded-lg w-28 text-center shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">Initial</span>
          <span><MathVar>s</MathVar><MathSub>0</MathSub> (Standard setup).</span>
        </li>
        <li className="flex gap-3 items-center">
          <span className="bg-white text-slate-900 border-2 border-slate-900 px-3 py-1 rounded-lg w-28 text-center shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">Actions</span>
          <span><MathVar>A(s)</MathVar> (Legal moves/jumps).</span>
        </li>
        <li className="flex gap-3 items-center">
          <span className="bg-white text-slate-900 border-2 border-slate-900 px-3 py-1 rounded-lg w-28 text-center shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">Transition</span>
          <span><MathVar>T(s, a)</MathVar> &rarr; <MathVar>s'</MathVar></span>
        </li>
      </ul>
    </Card>

    <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
      
      <Card title="Problem Scale" icon={Activity} color="orange" span="col-span-12">
        <div className="flex flex-col md:flex-row items-center justify-around h-full py-4">
          <div className="text-center mb-6 md:mb-0">
            <div className="text-5xl font-black text-slate-900 mb-3 bg-white border-4 border-slate-900 px-4 py-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] inline-block transform -rotate-2">
              ~ 5 &times; 10<sup>20</sup>
            </div>
            <div className="font-black uppercase tracking-wider text-sm mt-2">Total States |S|</div>
          </div>
          <div className="hidden md:block w-2 h-20 bg-slate-900 rounded-full"></div>
          <div className="text-center">
            <div className="text-5xl font-black text-slate-900 mb-3 bg-white border-4 border-slate-900 px-4 py-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] inline-block transform rotate-2">
              ~ 10<sup>40</sup>
            </div>
            <div className="font-black uppercase tracking-wider text-sm mt-2">Game Tree Size</div>
          </div>
        </div>
      </Card>

      <Card title="The Calculated Planner: Minimax" icon={GitBranch} color="charcoal" span="col-span-12">
        <div className="flex flex-col xl:flex-row gap-6 items-center">
          <div className="flex-1">
            <p className="font-medium mb-4">
              Explores possible moves by alternating between maximizing our score and minimizing the opponent's.
            </p>
            {/* The Evaluation Function Box */}
            <div className="bg-white text-slate-900 p-5 rounded-2xl border-[4px] border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transform -rotate-1">
              <div className="flex items-center text-[#cd484a] mb-2 font-black uppercase text-xl border-b-4 border-[#cd484a] pb-2 inline-flex">
                <Lightbulb className="mr-2 w-6 h-6" strokeWidth={3}/> The Evaluation Function
              </div>
              <p className="mb-4 text-sm font-bold text-slate-600">Evaluates board states at depth limits.</p>
              
              <div className="bg-[#f5c643] border-4 border-slate-900 py-4 px-3 rounded-xl text-center shadow-inner">
                <div className="font-serif font-black text-lg sm:text-xl whitespace-nowrap overflow-x-auto">
                  Score = (Pieces + 2 &times; Kings)<MathSub>Self</MathSub> <br className="md:hidden" />
                  <span className="text-[#cd484a]">&minus; (Pieces + 2 &times; Kings)<MathSub>Opponent</MathSub></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </PanelContainer>
);

// --- Panel 2: MCTS Deep Dive ---
const PanelMCTS = () => (
  <PanelContainer 
    title="Monte Carlo Tree Search"
  >
    <div className="col-span-12 bg-white border-4 border-slate-900 rounded-[2rem] p-6 text-center shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] mb-4">
      <p className="text-xl font-bold text-slate-800 max-w-4xl mx-auto leading-relaxed">
        When a game’s state space is too massive for traditional algorithms (like Go, with <span className="bg-[#f5c643] px-2 py-1 border-2 border-slate-900 rounded font-black">10<sup>360</sup></span> states), we cannot evaluate every move. Instead, MCTS builds an asymmetrical tree by playing <strong className="text-[#cd484a] underline decoration-4 underline-offset-4">thousands of completely random, simulated games</strong> to see which moves statistically lead to the most wins.
      </p>
    </div>

    {/* Section 1: UCT Equation */}
    <Card title="Balancing the Unknown" icon={BrainCircuit} color="yellow" span="col-span-12 lg:col-span-6">
      
      {/* Math Display */}
      <div className="flex items-center justify-center text-slate-900 font-serif text-3xl py-8 bg-white border-4 border-slate-900 rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] mb-8 transform rotate-1">
        <span className="mr-3 italic font-black">UCT = </span>
        
        <div className="flex flex-col items-center mx-2 font-black text-[#cd484a]">
          <span className="border-b-4 border-[#cd484a] px-2 leading-none pb-1">w<MathSub>i</MathSub></span>
          <span className="leading-none pt-2">n<MathSub>i</MathSub></span>
        </div>
        
        <span className="mx-4 font-black">+ c &middot; </span>
        
        <div className="flex items-center font-black text-[#3b9f9f]">
          <span className="text-5xl font-light mr-1">&radic;</span>
          <div className="flex flex-col items-center border-t-4 border-[#3b9f9f] pt-1 mt-2">
            <span className="border-b-4 border-[#3b9f9f] px-2 leading-none pb-1">ln N<MathSub>i</MathSub></span>
            <span className="leading-none pt-2">n<MathSub>i</MathSub></span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border-4 border-slate-900 p-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(205,72,74,1)] relative">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 bg-[#cd484a] w-8 h-8 rounded-full border-4 border-slate-900 flex items-center justify-center">
            <CheckCircle2 size={16} color="white" />
          </div>
          <h4 className="font-black text-slate-900 text-lg uppercase mb-2 ml-4">
            Exploitation <span className="font-serif ml-2 px-2 bg-[#cd484a] text-white border-2 border-slate-900 rounded">w<MathSub>i</MathSub> / n<MathSub>i</MathSub></span>
          </h4>
          <p className="font-bold ml-4 text-slate-700">
            The win rate. <em>"Pick the move that usually wins."</em> (<MathVar>w<MathSub>i</MathSub></MathVar> = wins, <MathVar>n<MathSub>i</MathSub></MathVar> = total visits to this node).
          </p>
        </div>

        <div className="bg-white border-4 border-slate-900 p-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(59,159,159,1)] relative">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 bg-[#3b9f9f] w-8 h-8 rounded-full border-4 border-slate-900 flex items-center justify-center">
            <Target size={16} color="white" />
          </div>
          <h4 className="font-black text-slate-900 text-lg uppercase mb-2 ml-4">
            Exploration <span className="font-serif ml-2 px-2 bg-[#3b9f9f] text-white border-2 border-slate-900 rounded">c&radic;(...)</span>
          </h4>
          <p className="font-bold ml-4 text-slate-700">
            The curiosity term. <em>"Try a move we haven't tested much yet."</em> (<MathVar>N<MathSub>i</MathSub></MathVar> = visits to parent). As the parent gets visited more (<MathVar>ln N<MathSub>i</MathSub></MathVar> grows) but the child is ignored (<MathVar>n<MathSub>i</MathSub></MathVar> stays small), this term explodes, forcing the algorithm to test the neglected move.
          </p>
        </div>
      </div>
    </Card>

    {/* Section 2: 4-Phase Cycle */}
    <Card title="The 4-Phase Cycle" icon={RefreshCcw} color="white" span="col-span-12 lg:col-span-6 flex flex-col">
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <div className="bg-[#f49352] border-4 border-slate-900 p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transform hover:scale-105 transition-transform">
          <div className="font-black text-slate-900 text-sm tracking-wider uppercase mb-2 bg-white inline-block px-2 py-1 border-2 border-slate-900 rounded">Selection (Travel Down)</div>
          <p className="font-bold text-slate-900 leading-tight">Starting from the root, the algorithm uses the UCT formula to choose the most "urgent" child node, repeating this until it hits a leaf node (a state it hasn't fully explored).</p>
        </div>
        
        <div className="bg-[#3b9f9f] border-4 border-slate-900 p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transform hover:scale-105 transition-transform">
          <div className="font-black text-slate-900 text-sm tracking-wider uppercase mb-2 bg-white inline-block px-2 py-1 border-2 border-slate-900 rounded">Expansion (Grow Tree)</div>
          <p className="font-bold text-white leading-tight">Unless the game is over, the algorithm generates one new legal move from this leaf node and adds it to the tree.</p>
        </div>
        
        <div className="bg-[#cd484a] border-4 border-slate-900 p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transform hover:scale-105 transition-transform">
          <div className="font-black text-slate-900 text-sm tracking-wider uppercase mb-2 bg-white inline-block px-2 py-1 border-2 border-slate-900 rounded">Simulation (Rollout)</div>
          <p className="font-bold text-white leading-tight">From this brand new node, the bot stops thinking and simply plays completely random moves for both sides until the game ends in a Win (1) or Loss (0).</p>
        </div>
        
        <div className="bg-[#3c3d3d] border-4 border-slate-900 p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transform hover:scale-105 transition-transform">
          <div className="font-black text-slate-900 text-sm tracking-wider uppercase mb-2 bg-white inline-block px-2 py-1 border-2 border-slate-900 rounded">Backpropagation</div>
          <p className="font-bold text-white leading-tight">The bot takes the result of that random game and travels backward up the exact path it took. It adds +1 to "Visits" everywhere, and +1 to "Wins" if successful.</p>
        </div>
      </div>
      
      <MCTSVisualizer />
    </Card>
  </PanelContainer>
);

// --- Panel 3: Conclusion ---
const PanelThree = () => (
  <PanelContainer 
    title="The 2007 Proof" 
    subtitle="Checkers is Solved"
  >
    <Card title="Jonathan Schaeffer's Chinook Project" icon={Target} color="yellow" span="col-span-12">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <p className="text-xl font-bold flex-1">
          The culmination of an 18-year effort. Chinook became the first program to achieve perfect play in a game of this complexity, proving mathematically that perfect play by both sides leads to a <strong className="bg-[#cd484a] text-white px-3 py-1 border-[3px] border-slate-900 rounded-lg inline-block transform -rotate-2 ml-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">GUARANTEED DRAW</strong>.
        </p>
        <div className="w-28 h-28 bg-white rounded-full border-[4px] border-slate-900 flex items-center justify-center flex-shrink-0 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <Crown className="text-[#f5c643]" size={60} strokeWidth={2.5} />
        </div>
      </div>
    </Card>

    <div className="col-span-12 relative my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Retrograde Funnel */}
        <div className="bg-white border-[4px] border-slate-900 p-8 rounded-[2rem] rounded-br-none flex flex-col items-center text-center relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(205,72,74,1)]">
          <Database className="text-[#cd484a] w-16 h-16 mb-4" strokeWidth={2} />
          <h3 className="text-3xl font-black text-slate-900 mb-2 uppercase">Retrograde Analysis</h3>
          <h4 className="text-sm font-bold text-white bg-[#cd484a] border-2 border-slate-900 uppercase tracking-widest mb-6 py-1 px-4 rounded-full">The Past</h4>
          <p className="text-lg font-bold text-slate-700">
            Working backward. Pre-solved databases of exact mathematical outcomes for all <strong className="text-slate-900 bg-[#f5c643] border-2 border-slate-900 px-2 rounded">3.9 &times; 10<sup>13</sup></strong> board states with 10 or fewer pieces.
          </p>
        </div>

        {/* Forward Search Funnel */}
        <div className="bg-white border-[4px] border-slate-900 p-8 rounded-[2rem] rounded-bl-none flex flex-col items-center text-center relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(59,159,159,1)]">
          <BrainCircuit className="text-[#3b9f9f] w-16 h-16 mb-4" strokeWidth={2} />
          <h3 className="text-3xl font-black text-slate-900 mb-2 uppercase">Forward Search</h3>
          <h4 className="text-sm font-bold text-white bg-[#3b9f9f] border-2 border-slate-900 uppercase tracking-widest mb-6 py-1 px-4 rounded-full">The Future</h4>
          <p className="text-lg font-bold text-slate-700">
            Searching from the start. Deep search algorithms expanding from the initial state until they intersect the pre-calculated databases.
          </p>
        </div>
      </div>
      
      {/* Convergence point */}
      <div className="relative md:absolute md:left-1/2 md:top-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 mt-8 md:mt-0 z-10 w-full md:w-72">
        <div className="bg-white p-3 rounded-3xl shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] border-[4px] border-slate-900 rotate-3 hover:rotate-0 transition-transform">
          <div className="bg-[#f5c643] px-6 py-8 rounded-2xl text-center border-4 border-slate-900">
             <h3 className="text-2xl font-black text-slate-900 uppercase mb-3">Weakly Solved</h3>
             <div className="bg-white rounded-xl py-3 text-slate-900 font-black font-mono text-3xl tracking-widest border-[4px] border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transform -rotate-2">DRAW</div>
          </div>
        </div>
      </div>
    </div>

    <Card title="Beyond Checkers" icon={Swords} color="charcoal" span="col-span-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <p className="text-xl leading-relaxed max-w-2xl font-bold">
          Solving checkers laid the foundational groundwork for modern computational game theory. It proved that deep search combined with massive knowledge databases could conquer massive complexities, directly paving the way for milestones in Chess (Deep Blue) and Go (AlphaGo).
        </p>
        <div className="flex gap-6">
          <div className="bg-white p-5 rounded-2xl border-[4px] border-slate-900 flex flex-col items-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transform rotate-2">
            <Crown className="text-[#cd484a] w-12 h-12 mb-3" strokeWidth={2.5} />
            <span className="text-lg uppercase font-black text-slate-900">Chess</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border-[4px] border-slate-900 flex flex-col items-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transform -rotate-3">
            <div className="flex gap-1 mb-3 mt-2">
              <div className="w-6 h-6 rounded-full bg-white border-[3px] border-slate-900 shadow-sm"></div>
              <div className="w-6 h-6 rounded-full bg-slate-900 border-[3px] border-slate-900 shadow-sm"></div>
            </div>
            <span className="text-lg uppercase font-black text-slate-900 pt-3">Go</span>
          </div>
        </div>
      </div>
    </Card>
  </PanelContainer>
);


// --- Main App ---
export default function App() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'View All Boards' },
    { id: 'panel1', label: 'Board 1: Agent' },
    { id: 'panel2', label: 'Board 2: MCTS Deep-Dive' },
    { id: 'panel3', label: 'Board 3: Conclusion' },
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-slate-900 font-sans p-4 md:p-8 selection:bg-[#f5c643] selection:text-slate-900">
      
      {/* Navigation */}
      <div className="max-w-6xl mx-auto mb-16 flex flex-wrap justify-center gap-4 bg-white p-4 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] border-[4px] border-slate-900 relative z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-3 rounded-2xl font-black uppercase tracking-wide text-sm transition-all duration-300 border-[3px] ${
              activeTab === tab.id 
                ? 'bg-[#3c3d3d] text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] scale-105 border-slate-900' 
                : 'bg-white text-slate-600 border-slate-300 hover:border-slate-900 hover:text-slate-900 hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Rendering */}
      <div className="pb-32">
        {(activeTab === 'all' || activeTab === 'panel1') && (
          <div className={activeTab === 'all' ? 'mb-32' : ''}>
            <PanelOne />
            {activeTab === 'all' && <div className="w-full max-w-4xl mx-auto border-b-[6px] border-dashed border-slate-300 my-24"></div>}
          </div>
        )}
        
        {(activeTab === 'all' || activeTab === 'panel2') && (
          <div className={activeTab === 'all' ? 'mb-32' : ''}>
            <PanelMCTS />
            {activeTab === 'all' && <div className="w-full max-w-4xl mx-auto border-b-[6px] border-dashed border-slate-300 my-24"></div>}
          </div>
        )}
        
        {(activeTab === 'all' || activeTab === 'panel3') && (
          <PanelThree />
        )}
      </div>
      
    </div>
  );
}
