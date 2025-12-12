import React, { useState } from 'react';
import { SlideType } from '../types';
import { LLMArchitectureVisual, PipelineVisual, SFTMechanicsVisual, LoRAVisual, StyleTransferDemo, VideoPlaceholder } from './Visuals';
import { Layers, Zap, Code, AlertTriangle, MousePointer2 } from 'lucide-react';

interface SlideContentProps {
  type: SlideType;
}

// --- Interactive Code Block with Tooltips ---
const InteractiveCodeBlock = ({ lines }: { lines: { code: string; explanation?: string; highlight?: boolean }[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#1e1e1e] rounded-lg p-4 overflow-hidden text-sm font-mono border border-slate-700 shadow-inner relative group">
      <div className="absolute top-2 right-2 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
        <MousePointer2 size={12} /> 悬浮查看代码解释
      </div>
      <pre className="text-gray-300 space-y-1">
        {lines.map((line, idx) => (
          <div 
            key={idx}
            onMouseEnter={() => line.explanation && setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative px-2 -mx-2 rounded transition-colors cursor-default ${
              line.explanation ? 'hover:bg-slate-700/50 cursor-help' : ''
            } ${line.highlight ? 'bg-indigo-900/20 border-l-2 border-indigo-500 pl-3' : ''}`}
          >
            <code>{line.code}</code>
            {hoveredIndex === idx && line.explanation && (
              <div className="absolute left-0 bottom-full mb-2 w-max max-w-sm bg-indigo-900/90 text-white text-xs p-2 rounded shadow-xl border border-indigo-400 z-50 backdrop-blur-sm pointer-events-none">
                {line.explanation}
              </div>
            )}
          </div>
        ))}
      </pre>
    </div>
  );
};

export const SlideContent: React.FC<SlideContentProps> = ({ type }) => {
  switch (type) {
    case SlideType.INTRO:
      return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="bg-indigo-500/10 p-6 rounded-full ring-1 ring-indigo-500/50 animate-pulse">
            <Layers size={64} className="text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
            SFT Rewriter (拟人改写器) 训练
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            利用监督微调 (SFT) 和 LoRA 技术，教会 Llama-3 什么是“人类学术风格”。
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-left max-w-3xl w-full mt-8">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors">
              <h3 className="font-bold text-blue-400 mb-2">目标 (Goal)</h3>
              <p className="text-sm text-slate-300">构建一个 Style Transfer 模型，消除文本中的“AI 味 (AI flavor)”，使其更符合地道的人类学术表达。</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-green-500 transition-colors">
               <h3 className="font-bold text-green-400 mb-2">技术栈 (Tech Stack)</h3>
               <p className="text-sm text-slate-300">Base Model: Llama-3-8B-Instruct / Qwen2.5<br/>Method: LoRA (PEFT), SFTTrainer</p>
            </div>
          </div>

          <div className="w-full max-w-3xl mx-auto mt-4 text-left">
            <details className="cursor-pointer group">
              <summary className="text-slate-500 text-sm hover:text-indigo-400 transition-colors list-none flex items-center gap-2">
                 <Zap size={14} /> 点击查看项目演示视频 (Placeholder)
              </summary>
              <div className="mt-2 animate-in fade-in slide-in-from-top-4 duration-300">
                 <VideoPlaceholder title="Rewriter 效果演示" />
              </div>
            </details>
          </div>
        </div>
      );

    case SlideType.LLM_TYPES:
      return (
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-slate-300">
              在开始微调之前，我们先回顾一下目前的 LLM 架构体系。为了完成改写任务，我们选择了目前生成能力最强的自回归模型。
            </p>
          </div>
          <LLMArchitectureVisual />
          <div className="mt-6 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg flex items-start gap-3">
            <Zap className="text-yellow-400 shrink-0 mt-1" size={20} />
            <div>
              <h4 className="font-bold text-blue-200">为什么选择 Autoregressive (Decoder-only)?</h4>
              <p className="text-sm text-slate-300">
                虽然传统的风格迁移 (Style Transfer) 常使用 Encoder-Decoder (如 T5)，但 Llama-3 等现代 Decoder-only 模型具备更强的 Zero-shot 推理能力和对细微语气 (Nuance) 的把控力，非常适合捕捉“学术感”这种抽象特征。
              </p>
            </div>
          </div>
        </div>
      );

    case SlideType.TRAINING_STAGES:
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-200">大模型训练的三阶段</h2>
          <PipelineVisual />
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="p-4 bg-slate-800/40 rounded border border-slate-700 opacity-50">
              <h3 className="font-mono text-sm text-slate-400 mb-2">Stage 1: Pre-training (预训练)</h3>
              <ul className="list-disc list-inside text-sm text-slate-500 space-y-1">
                <li>数据：CommonCrawl, Wikipedia 等海量文本。</li>
                <li>任务：预测下一个词。</li>
                <li>缺陷：只会续写，不懂得遵循指令。</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-900/20 rounded border border-blue-500/50 shadow-lg shadow-blue-500/10">
              <h3 className="font-mono text-sm text-blue-300 mb-2">Stage 2: SFT (本次重点)</h3>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                <li>数据：高质量的指令对 (Instruction, Output)。</li>
                <li>任务：学习特定的<strong>格式</strong>和<strong>口吻</strong>。</li>
                <li><strong>应用：</strong> 教会模型“Academic Style”意味着被动语态的恰当使用、客观的语气和精确的词汇。</li>
              </ul>
            </div>
          </div>
        </div>
      );

    case SlideType.SFT_DEEP_DIVE:
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-200">SFT (Supervised Fine-Tuning) 核心详解</h2>
              <p className="text-slate-400">从概率分布到梯度优化：SFT 如何让模型学会“听话”。</p>
            </div>
            <div className="px-3 py-1 bg-yellow-900/30 text-yellow-500 border border-yellow-700/50 rounded text-xs font-mono flex items-center gap-1">
              <AlertTriangle size={12} /> Data: ~1,000 Pairs
            </div>
          </div>
          
          <p className="text-sm text-slate-300">
            请点击下方选项卡切换查看 SFT 的数学原理与优化细节。
          </p>

          <SFTMechanicsVisual />

          <div className="mt-4 text-sm text-slate-400 bg-slate-800/50 p-4 rounded-lg border-l-4 border-indigo-500">
            <strong>Agentic SFT 启示：</strong> 对于我们的 Rewriter，本质也是一个 Agentic 任务。
            我们不仅要生成文本，还要让模型学会在改写时“思考” (Think) 如何保持原意并优化语气。
            SFT 是为了让 RL 阶段（如果有）能够冷启动的关键。
          </div>
        </div>
      );

    case SlideType.LORA_MECHANICS:
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
             <h2 className="text-2xl font-bold text-slate-200">LoRA (Low-Rank Adaptation)</h2>
             <span className="text-xs font-mono text-slate-500">PEFT 参数高效微调</span>
          </div>
          
          <p className="text-sm text-slate-300">
             从显存困境到低秩矩阵分解：请查看下方交互模块。
          </p>

          <LoRAVisual />

          <StyleTransferDemo />
        </div>
      );

    case SlideType.CODE_WALKTHROUGH:
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full overflow-y-auto pb-20">
          <div className="space-y-4">
            <h3 className="font-bold text-blue-300 flex items-center gap-2">
              <Code size={18} /> 核心配置讲解
            </h3>
            <p className="text-sm text-slate-400">
              使用 HuggingFace <code>peft</code> 和 <code>trl</code> 库。鼠标悬浮代码可查看解释。
            </p>
            
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-500">1. LoRA Config (peft)</span>
              <InteractiveCodeBlock lines={[
                { code: 'from peft import LoraConfig, TaskType', highlight: false },
                { code: '', highlight: false },
                { code: 'lora_config = LoraConfig(', highlight: false },
                { code: '    r=32,', explanation: '秩的大小 (Rank)。值越大，参数越多，拟合能力越强，但也更容易过拟合。', highlight: true },
                { code: '    lora_alpha=64,', explanation: '缩放系数。通常设为 2*r。用于控制 LoRA 权重的影响力。', highlight: true },
                { code: '    target_modules=["q_proj", "v_proj"],', explanation: '将 LoRA 适配器应用到哪些层。通常是 Attention 层的 query 和 value 投影。', highlight: true },
                { code: '    lora_dropout=0.05,', explanation: '防止过拟合的 Dropout 率。', highlight: false },
                { code: '    task_type=TaskType.CAUSAL_LM', explanation: '任务类型：因果语言模型 (即自回归生成)。', highlight: false },
                { code: ')', highlight: false },
              ]} />
            </div>

             <div className="space-y-2">
              <span className="text-xs font-mono text-slate-500">2. Training Arguments</span>
               <InteractiveCodeBlock lines={[
                { code: 'args = TrainingArguments(', highlight: false },
                { code: '    output_dir="./rewriter_lora",', highlight: false },
                { code: '    learning_rate=2e-4,', explanation: 'LoRA 的学习率通常比全量微调 (1e-5) 大一个数量级。', highlight: true },
                { code: '    per_device_train_batch_size=4,', highlight: false },
                { code: '    gradient_accumulation_steps=4,', explanation: '显存优化技巧。累积梯度后再更新，模拟大 Batch Size。', highlight: false },
                { code: '    fp16=True,', explanation: '混合精度训练，节省显存并加速。', highlight: false },
                { code: '    num_train_epochs=3,', highlight: false },
                { code: ')', highlight: false },
              ]} />
            </div>
          </div>

          <div className="space-y-4">
             <h3 className="font-bold text-green-300 flex items-center gap-2">
              <Zap size={18} /> 训练与执行
            </h3>
            
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-500">3. SFTTrainer 初始化</span>
               <InteractiveCodeBlock lines={[
                { code: 'from trl import SFTTrainer', highlight: false },
                { code: '', highlight: false },
                { code: 'trainer = SFTTrainer(', highlight: false },
                { code: '    model=model,', highlight: false },
                { code: '    train_dataset=dataset,', highlight: false },
                { code: '    peft_config=lora_config,', explanation: '传入 LoRA 配置，SFTTrainer 会自动包装模型。', highlight: true },
                { code: '    args=args,', highlight: false },
                { code: '    formatting_func=format_prompt,', explanation: '将数据集中的 row 转换为 Prompt 格式的函数。', highlight: true },
                { code: ')', highlight: false },
              ]} />
            </div>

             <div className="space-y-2">
              <span className="text-xs font-mono text-slate-500">4. 开始训练与推理</span>
               <InteractiveCodeBlock lines={[
                { code: 'trainer.train()', highlight: false },
                { code: 'trainer.save_model("./final_adapter")', highlight: false },
                { code: '', highlight: false },
                { code: '# Inference (推理)', highlight: false },
                { code: 'input_text = "Rewrite: " + ai_text', highlight: false },
                { code: 'output = model.generate(input_text)', explanation: '加载了 LoRA 权重后的模型进行生成。', highlight: true },
              ]} />
            </div>
            
            <div className="bg-slate-800 p-4 rounded border border-slate-700 mt-4">
              <h4 className="text-sm font-bold text-white mb-2">预期产出</h4>
              <p className="text-xs text-slate-400">
                最终获得一个轻量级的 Adapter 权重 (~50MB)。加载该权重后，Llama-3 的语气将从“机械感”转变为“人类学术感”。
              </p>
            </div>
          </div>
        </div>
      );
    
    default:
      return <div>Select a slide</div>;
  }
};