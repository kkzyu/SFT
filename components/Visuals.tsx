import React, { useState } from 'react';
import { ArrowRight, Database, Brain, Cpu, FileText, CheckCircle, Play, TrendingUp, Microscope, Sigma, Variable, Server, Zap, GitMerge } from 'lucide-react';

// --- LLM Architecture Cards ---
export const LLMArchitectureVisual = () => {
  const [active, setActive] = useState<string>('autoregressive');

  const types = [
    { 
      id: 'autoregressive', 
      name: '自回归 (Autoregressive)', 
      sub: 'Decoder-only',
      examples: 'GPT-4, Llama-3, Qwen', 
      desc: '基于前文预测下一个 Token。最适合生成任务。',
      color: 'border-blue-500 bg-blue-900/20'
    },
    { 
      id: 'autoencoder', 
      name: '自编码 (Autoencoder)', 
      sub: 'Encoder-only',
      examples: 'BERT, RoBERTa', 
      desc: '重建被掩盖的输入。擅长理解和分类，不擅长生成。',
      color: 'border-slate-600 bg-slate-800/20'
    },
    { 
      id: 'encoder-decoder', 
      name: '编码-解码 (Encoder-Decoder)', 
      sub: 'Seq2Seq',
      examples: 'T5, BART', 
      desc: '编码源文本，解码目标文本。传统上用于翻译/改写。',
      color: 'border-slate-600 bg-slate-800/20'
    },
    { 
      id: 'diffusion', 
      name: '扩散模型 (Diffusion)', 
      sub: 'Denoising',
      examples: 'Stable Diffusion', 
      desc: '去噪过程。主要用于图像生成，文本生成领域较少。',
      color: 'border-slate-600 bg-slate-800/20'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {types.map((t) => (
        <div 
          key={t.id}
          onClick={() => setActive(t.id)}
          className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
            active === t.id ? t.color + ' shadow-lg shadow-blue-500/20 scale-105' : 'border-slate-700 hover:border-slate-500 opacity-60'
          }`}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg mb-1">{t.name}</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">{t.sub}</span>
          </div>
          <p className="text-xs text-blue-300 font-mono mb-2">{t.examples}</p>
          <p className="text-sm text-slate-300">{t.desc}</p>
          {active === t.id && t.id === 'autoregressive' && (
            <div className="mt-3 text-green-400 text-xs flex items-center gap-1 font-bold animate-pulse">
              <CheckCircle size={14} /> 本次任务选择 (Llama-3)
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// --- Pipeline Visualization ---
export const PipelineVisual = () => {
  const [stage, setStage] = useState(1);

  return (
    <div className="flex flex-col items-center mt-8 w-full">
      <div className="flex items-center justify-between w-full max-w-4xl relative px-8">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-700 -z-10"></div>
        
        {/* Stage 1 */}
        <div 
          className={`flex flex-col items-center cursor-pointer transition-all duration-500 ${stage === 0 ? 'scale-110 opacity-100' : 'opacity-50'}`}
          onClick={() => setStage(0)}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${stage === 0 ? 'bg-slate-800 border-indigo-500 text-indigo-400' : 'bg-slate-900 border-slate-700 text-slate-600'}`}>
            <Database size={24} />
          </div>
          <div className="mt-3 text-center">
            <h4 className="font-bold">Pre-training (预训练)</h4>
            <span className="text-xs text-slate-400">海量无标注数据</span>
          </div>
        </div>

        <ArrowRight size={32} className="text-slate-600" />

        {/* Stage 2 (Active) */}
        <div 
          className={`flex flex-col items-center cursor-pointer transition-all duration-500 ${stage === 1 ? 'scale-125 opacity-100' : 'opacity-50'}`}
          onClick={() => setStage(1)}
        >
          <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 ${stage === 1 ? 'bg-blue-900 border-blue-400 text-blue-300 shadow-xl shadow-blue-500/30' : 'bg-slate-900 border-slate-700 text-slate-600'}`}>
            <Brain size={32} />
          </div>
          <div className="mt-3 text-center">
            <h4 className="font-bold text-blue-400">SFT (监督微调)</h4>
            <span className="text-xs text-slate-400">指令微调 / 风格迁移</span>
            <div className="text-[10px] bg-blue-900/50 px-2 py-0.5 rounded-full text-blue-200 mt-1 border border-blue-700">本次汇报重点</div>
          </div>
        </div>

        <ArrowRight size={32} className="text-slate-600" />

        {/* Stage 3 */}
        <div 
          className={`flex flex-col items-center cursor-pointer transition-all duration-500 ${stage === 2 ? 'scale-110 opacity-100' : 'opacity-50'}`}
          onClick={() => setStage(2)}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${stage === 2 ? 'bg-slate-800 border-purple-500 text-purple-400' : 'bg-slate-900 border-slate-700 text-slate-600'}`}>
            <CheckCircle size={24} />
          </div>
          <div className="mt-3 text-center">
            <h4 className="font-bold">RLHF / DPO</h4>
            <span className="text-xs text-slate-400">人类价值观对齐</span>
            <span className="text-[10px] block text-slate-500">(下周内容)</span>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700 max-w-2xl text-center min-h-[100px] flex items-center justify-center">
        {stage === 0 && <p><strong>Pre-training:</strong> 让模型学会“说话”和“世界知识”。在海量数据上做 Next Token Prediction。产出 Base Model。</p>}
        {stage === 1 && <p className="text-blue-200"><strong>SFT (Supervised Fine-Tuning):</strong> 让模型学会“听懂指令”和“特定格式”。我们使用 (Instruction, Input, Output) 数据对教会它什么是“人类学术风格”。</p>}
        {stage === 2 && <p><strong>RLHF/DPO:</strong> 让模型学会“判别好坏”。通过人类偏好数据进行对齐。对于简单的风格迁移任务，通常 SFT 就足够了。</p>}
      </div>
    </div>
  );
};

// --- SFT Data & Loss Visual ---
export const SFTMechanicsVisual = () => {
  const [activeTab, setActiveTab] = useState<'concept' | 'math' | 'optimization'>('math');

  return (
    <div className="w-full mt-4 bg-slate-900 rounded-xl border border-slate-700 overflow-hidden flex flex-col h-[500px]">
      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        <button 
          onClick={() => setActiveTab('concept')}
          className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'concept' ? 'bg-slate-800 text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:bg-slate-800/50'}`}
        >
          <Brain size={16} /> 1. 概念与动机
        </button>
        <button 
          onClick={() => setActiveTab('math')}
          className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'math' ? 'bg-slate-800 text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:bg-slate-800/50'}`}
        >
          <Sigma size={16} /> 2. 数学原理 (Math)
        </button>
        <button 
          onClick={() => setActiveTab('optimization')}
          className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'optimization' ? 'bg-slate-800 text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:bg-slate-800/50'}`}
        >
          <TrendingUp size={16} /> 3. 梯度优化 (Optimizer)
        </button>
      </div>

      {/* Content Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        
        {activeTab === 'concept' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-200">为什么需要 SFT?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                预训练后的模型虽然“博学”但“未经驯化”。
                SFT 是后训练 (Post-training) 的第一步，旨在将预训练模型转化为“有用、无害、诚实”的助手。
              </p>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600">
                <h4 className="font-bold text-indigo-300 mb-2 flex items-center gap-2"><CheckCircle size={16}/> SFT 的核心作用</h4>
                <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
                  <li><strong>指令遵循：</strong> 教会模型理解 "Prompt" 的意图。</li>
                  <li><strong>格式对齐：</strong> 学习特定的输出格式 (如 JSON, 学术风格)。</li>
                  <li><strong>RL 的"冷启动"：</strong> 如果直接进行强化学习 (RL)，模型因能力过差很难获得正向奖励。SFT 相当于"岗前培训"，让模型先达到 60 分。</li>
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center">
               <div className="relative w-full max-w-sm">
                 <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
                 <div className="bg-slate-800 p-6 rounded-xl border border-slate-600 relative z-10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-mono text-slate-500">Training Pipeline</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 opacity-50">
                        <Database className="text-slate-500" /> 
                        <span className="text-slate-500">Pre-training</span>
                      </div>
                      <div className="flex justify-center"><ArrowRight className="rotate-90 text-slate-600" size={20}/></div>
                      <div className="flex items-center gap-3 p-2 bg-indigo-900/30 border border-indigo-500/50 rounded-lg">
                        <Brain className="text-indigo-400" />
                        <span className="text-indigo-200 font-bold">Supervised Fine-Tuning</span>
                      </div>
                      <div className="flex justify-center"><ArrowRight className="rotate-90 text-slate-600" size={20}/></div>
                      <div className="flex items-center gap-3 opacity-50">
                        <TrendingUp className="text-slate-500" />
                        <span className="text-slate-500">RLHF / PPO</span>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'math' && (
          <div className="space-y-6">
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-600">
               <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                 <Sigma className="text-blue-400" /> 极大似然估计 (Maximum Likelihood)
               </h3>
               <p className="text-sm text-slate-300 mb-4">
                 SFT 的目标是最大化在给定指令 {'$x$'} 下，生成目标回答 {'$y$'} 的条件概率。
               </p>
               <div className="bg-black/40 p-4 rounded text-center font-mono text-lg text-indigo-300 overflow-x-auto">
                 P(y|x) = <span className="text-purple-400">∏</span> P(y<sub>t</sub> | x, y<sub>&lt;t</sub>)
               </div>
               <p className="text-xs text-slate-500 mt-2 text-center">
                 即：每一个 Token 的生成概率，都依赖于 输入 {'$x$'} 和 之前生成的所有 Token {'$y_{<t}$'}。
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800 p-4 rounded-lg border border-slate-600">
                <h4 className="font-bold text-orange-300 mb-2 text-sm">Cross-Entropy Loss (交叉熵损失)</h4>
                <div className="font-mono text-xs text-slate-300 bg-black/40 p-3 rounded mb-2">
                  L(θ) = - log P(y<sub>t</sub> | x, y<sub>&lt;t</sub>; θ)
                </div>
                <p className="text-xs text-slate-400">
                  我们希望最大化概率 {'$P$'}，等价于最小化负对数概率 {'$-log P$'}。
                </p>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg border border-slate-600 relative overflow-hidden">
                <h4 className="font-bold text-green-300 mb-2 text-sm">Masking (掩码机制)</h4>
                <div className="flex gap-1 text-xs font-mono mt-3">
                  <div className="bg-slate-700 text-slate-500 px-2 py-1 rounded line-through decoration-slate-900">Instruction</div>
                  <div className="bg-slate-700 text-slate-500 px-2 py-1 rounded line-through decoration-slate-900">Input</div>
                  <div className="bg-green-900/50 text-green-400 border border-green-500 px-2 py-1 rounded shadow-[0_0_10px_rgba(34,197,94,0.3)]">Target Output</div>
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  <span className="text-red-400 font-bold">重要：</span> 只有 Target 部分的 Token 计算 Loss 并回传梯度。模型不需要学习如何生成 Instruction。
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'optimization' && (
          <div className="h-full flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-200">参数更新与优化器</h3>
              <p className="text-sm text-slate-400">
                计算出 Loss 后，我们需要通过反向传播 (Backpropagation) 更新参数 {'$\\theta$'}。
                {'$$ \\theta_{t+1} = \\theta_t - \\eta \\cdot \\text{Optimizer}(\\nabla L) $$'}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-slate-800 border border-slate-600 rounded">
                  <h4 className="text-red-300 font-bold text-sm mb-1">SGD 的问题</h4>
                  <p className="text-xs text-slate-400">
                    大模型参数稀疏且维度极高，普通 SGD 容易陷入局部最优，且梯度震荡严重，难以收敛。
                  </p>
                </div>
                 <div className="p-3 bg-indigo-900/20 border border-indigo-500/50 rounded">
                  <h4 className="text-indigo-300 font-bold text-sm mb-1">AdamW 优化器 (标准选择)</h4>
                  <p className="text-xs text-slate-400">
                    结合了 <strong>Momentum (动量)</strong> 和 <strong>Adaptive Learning Rate (自适应学习率)</strong>。
                    <br/>
                    1. 动量：像滚下山坡的小球，有惯性，抑制震荡。
                    <br/>
                    2. 自适应：为不同参数动态调整学习率。
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 mt-4">
               <div className="flex items-center justify-between">
                 <span className="text-sm font-bold text-slate-300">训练策略对比</span>
                 <span className="text-xs text-slate-500">Trade-off</span>
               </div>
               <div className="w-full h-px bg-slate-800 my-2"></div>
               <div className="flex gap-4 text-xs">
                 <div className="flex-1 opacity-60">
                   <div className="font-bold text-slate-400">Full Fine-tuning</div>
                   <div className="text-slate-600">更新所有参数</div>
                   <div className="text-red-900 mt-1">显存爆炸，易过拟合</div>
                 </div>
                 <div className="w-px bg-slate-800"></div>
                 <div className="flex-1">
                   <div className="font-bold text-green-400">PEFT (LoRA)</div>
                   <div className="text-slate-400">更新 {'$\\Delta W = BA$'}</div>
                   <div className="text-green-600 mt-1">显存极低，效果接近</div>
                 </div>
               </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// --- LoRA Interactive Visual ---
export const LoRAVisual = () => {
  const [rank, setRank] = useState(16);
  const [activeTab, setActiveTab] = useState<'background' | 'architecture' | 'analysis'>('architecture');

  return (
    <div className="w-full mt-6 bg-slate-900 rounded-xl border border-slate-700 overflow-hidden flex flex-col h-[600px]">
       {/* Tabs */}
       <div className="flex border-b border-slate-700">
        <button 
          onClick={() => setActiveTab('background')}
          className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'background' ? 'bg-slate-800 text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:bg-slate-800/50'}`}
        >
          <Server size={16} /> 1. 困境与破局 (Background)
        </button>
        <button 
          onClick={() => setActiveTab('architecture')}
          className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'architecture' ? 'bg-slate-800 text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:bg-slate-800/50'}`}
        >
          <GitMerge size={16} /> 2. 核心架构 (Architecture)
        </button>
        <button 
          onClick={() => setActiveTab('analysis')}
          className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'analysis' ? 'bg-slate-800 text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:bg-slate-800/50'}`}
        >
          <Microscope size={16} /> 3. 深度解析 (Analysis)
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">

        {/* Tab 1: Background & Motivation */}
        {activeTab === 'background' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-red-900/10 border border-red-500/30 rounded-lg">
                <h3 className="text-lg font-bold text-red-400 mb-2 flex items-center gap-2"><Server size={18}/> Full Fine-tuning 的困境</h3>
                <p className="text-sm text-slate-300 mb-2">
                  微调 7B 模型需要 3×28GB (84GB) 显存 (使用 SGD+Momentum)。
                </p>
                <div className="space-y-2 text-xs text-slate-400 mt-4">
                   <div className="flex justify-between">
                     <span>Model Weights</span>
                     <span>14 GB</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Gradients</span>
                     <span>14 GB</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Optimizer States</span>
                     <span>56 GB</span>
                   </div>
                   <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-red-600 w-full animate-pulse"></div>
                   </div>
                   <p className="text-red-500 text-right font-bold">需要 2-3 张 A100！</p>
                </div>
              </div>

              <div className="p-4 bg-green-900/10 border border-green-500/30 rounded-lg">
                <h3 className="text-lg font-bold text-green-400 mb-2 flex items-center gap-2"><Zap size={18}/> 破局：Intrinsic Dimension</h3>
                <p className="text-sm text-slate-300">
                  Aghajanyan 的研究表明：预训练模型拥有极小的<strong>内在维度 (Intrinsic Dimension)</strong>。
                </p>
                <p className="text-sm text-slate-400 mt-2">
                  <span className="text-indigo-400 font-bold">假设：</span> 微调时的参数更新量 {'$\\Delta W$'} 也存在一个极低的“内在秩” (Intrinsic Rank)。
                </p>
                <div className="mt-4 p-3 bg-slate-800 rounded border border-slate-700 text-xs font-mono text-center">
                   Full Dim: d × k (Huge) <br/>
                   Intrinsic Dim: r (Tiny) <br/>
                   <span className="text-green-400">r {'<<'} min(d, k)</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <h4 className="text-sm font-bold text-slate-200 mb-2">结论</h4>
              <p className="text-xs text-slate-400">
                如果我们能找到一种方法，只优化这个低秩的子空间，就能将参数量减少到万分之一，显存减少 2/3，且不增加推理耗时。这就是 LoRA 的诞生背景。
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Core Architecture */}
        {activeTab === 'architecture' && (
          <div className="flex flex-col items-center">
            {/* Controls */}
            <div className="flex items-center gap-4 mb-6">
              <label className="text-sm font-semibold text-slate-300">LoRA Rank (秩):</label>
              <div className="flex gap-2">
                {[4, 8, 16, 32, 64].map(r => (
                  <button 
                    key={r}
                    onClick={() => setRank(r)}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${rank === r ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-500 ml-2">参数量 {'$\\approx$'} {rank/1.28}%</span>
            </div>

            {/* Diagram */}
            <div className="relative flex items-center justify-center p-8 bg-white/5 rounded-2xl w-full max-w-3xl overflow-hidden group">
              <div className="flex items-center gap-4 relative z-10">
                {/* W0 */}
                <div className="flex flex-col items-center relative">
                  <div className="w-32 h-40 bg-slate-600 rounded-lg flex items-center justify-center border-2 border-slate-500 relative">
                    <span className="text-2xl font-bold text-slate-300">W<sub>0</sub></span>
                    <div className="absolute -top-6 text-xs text-slate-400 font-mono">d × k</div>
                  </div>
                  <span className="mt-2 text-sm text-slate-400 font-mono">Frozen (不更新)</span>
                </div>

                <div className="text-2xl font-bold text-slate-400">+</div>

                {/* LoRA Path */}
                <div className="flex flex-col items-center p-4 rounded-xl bg-indigo-900/20 border border-indigo-500/30 relative">
                  <div className="absolute -top-3 left-10 bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded shadow">
                    {'$\\Delta W = BA$'}
                  </div>
                  
                  <div className="flex items-center gap-1">
                      {/* Matrix A */}
                      <div className="flex flex-col items-center group/a">
                        <div 
                          className="bg-indigo-500 rounded-sm border border-indigo-300 transition-all duration-300 relative"
                          style={{ width: `${Math.max(10, rank/1.5)}px`, height: '160px' }}
                        ></div>
                        <span className="mt-2 text-xs text-indigo-300 font-mono">A (r × k)</span>
                        <span className="text-[9px] text-slate-500">Gaussian Init</span>
                      </div>

                      <div className="text-lg text-indigo-400">×</div>

                      {/* Matrix B */}
                      <div className="flex flex-col items-center group/b">
                        <div 
                          className="bg-purple-500 rounded-sm border border-purple-300 transition-all duration-300 relative"
                          style={{ width: '128px', height: `${Math.max(10, rank/1.5)}px` }}
                        ></div>
                        <span className="mt-2 text-xs text-purple-300 font-mono">B (d × r)</span>
                        <span className="text-[9px] text-slate-500">Zero Init</span>
                      </div>
                  </div>
                </div>

                <div className="text-2xl font-bold text-slate-400">=</div>

                {/* Output */}
                <div className="flex flex-col items-center">
                   <div className="p-4 bg-slate-800 rounded border border-slate-600 font-mono text-sm text-slate-300">
                     h = W<sub>0</sub>x + BAx
                   </div>
                   <span className="mt-2 text-sm text-slate-400">前向传播公式</span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center max-w-xl text-xs text-slate-400">
               训练初期，B 初始化为 0，所以 {'$\\Delta W = 0$'}，模型输出与预训练模型完全一致。随着训练进行，A 和 B 逐渐学习到任务特征。
            </div>
          </div>
        )}

        {/* Tab 3: Deep Analysis */}
        {activeTab === 'analysis' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-200">深度解析：LoRA 为何有效？</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                   <h4 className="font-bold text-blue-300 text-sm mb-2">Q1: 应用在哪些参数矩阵？</h4>
                   <p className="text-xs text-slate-300 mb-2">
                     作者实验发现：将所有微调参数都放到 Attention 的某一个矩阵效果并不好。
                   </p>
                   <div className="bg-black/30 p-2 rounded text-xs font-mono text-green-400">
                     最佳策略：同时微调 W<sub>q</sub> 和 W<sub>v</sub>
                   </div>
                   <p className="text-xs text-slate-500 mt-2">
                     即使 Rank 很小 (如 r=4)，在 Wq 和 Wv 上同时微调的效果 > 单独微调 Wq (r=64)。
                   </p>
                </div>

                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                   <h4 className="font-bold text-purple-300 text-sm mb-2">Q2: 最佳的 Rank 是多少？</h4>
                   <p className="text-xs text-slate-300 mb-2">
                     实验表明，非常小的 Rank (r=1 或 2) 就能取得很好的效果。
                   </p>
                   <div className="flex items-center gap-2 mt-2">
                      <div className="h-2 flex-1 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-[80%]"></div>
                      </div>
                      <span className="text-xs text-slate-400">Rank=8 效果</span>
                   </div>
                   <div className="flex items-center gap-2 mt-1">
                      <div className="h-2 flex-1 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-400 w-[82%]"></div>
                      </div>
                      <span className="text-xs text-slate-400">Rank=64 效果</span>
                   </div>
                   <p className="text-[10px] text-slate-500 mt-2">
                     通过“格拉斯曼距离”分析子空间相似度，发现 top singular vectors 重叠度极高。r=8 已经包含了大部分必要信息。
                   </p>
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <h4 className="font-bold text-orange-300 text-sm mb-2">Q3: {'$\\Delta W$'} 和 W 的关系？</h4>
                <p className="text-xs text-slate-300">
                  相比随机矩阵，{'$\\Delta W$'} 和 W 有强关联。但 {'$\\Delta W$'} <strong>并未</strong>放大 W 中的主要特征（头部奇异向量），而是放大了<strong>任务相关</strong>的特定特征。
                </p>
                <div className="mt-2 p-2 bg-slate-900 rounded text-xs text-slate-400 font-mono">
                  amplification_factor {'$\\approx$'} 21.5 (when r=4)
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// --- Comparison Demo ---
export const StyleTransferDemo = () => {
  const [isHuman, setIsHuman] = useState(false);
  
  const aiText = "The utilization of advanced computational methodologies was implemented to facilitate the optimization of the rewrite parameters.";
  const humanText = "We used advanced computational methods to optimize the rewriting parameters.";

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
      <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-slate-700">
        <span className="text-xs font-mono text-slate-400">Model Output Preview</span>
        <div className="flex items-center gap-2">
           <span className={`text-xs ${!isHuman ? 'text-blue-400 font-bold' : 'text-slate-500'}`}>Base Llama-3 (AI味)</span>
           <button 
             onClick={() => setIsHuman(!isHuman)}
             className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isHuman ? 'bg-green-600' : 'bg-slate-600'}`}
           >
             <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${isHuman ? 'translate-x-6' : 'translate-x-0'}`}></div>
           </button>
           <span className={`text-xs ${isHuman ? 'text-green-400 font-bold' : 'text-slate-500'}`}>SFT + LoRA (地道)</span>
        </div>
      </div>
      <div className="p-8 relative min-h-[120px] flex items-center justify-center">
        <p className={`text-lg text-center transition-all duration-500 absolute w-full px-8 ${isHuman ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0 text-blue-200'}`}>
          "{aiText}"
        </p>
        <p className={`text-lg text-center transition-all duration-500 absolute w-full px-8 ${!isHuman ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0 text-green-300 font-medium'}`}>
          "{humanText}"
        </p>
      </div>
    </div>
  );
};

// --- Video Placeholder Component ---
export const VideoPlaceholder = ({ title, src }: { title: string, src?: string }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-6 bg-black rounded-xl overflow-hidden border border-slate-700 shadow-2xl relative aspect-video group">
       {src ? (
          <iframe 
            width="100%" 
            height="100%" 
            src={src} 
            title={title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
       ) : (
         <div className="flex flex-col items-center justify-center h-full bg-slate-900 text-slate-500">
            <Play size={48} className="mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-slate-300">{title}</h3>
            <p className="text-sm">在此处嵌入演示视频或 GIF</p>
            <p className="text-xs mt-2 text-slate-600 font-mono">&lt;iframe src="youtube_url" /&gt;</p>
         </div>
       )}
    </div>
  );
};