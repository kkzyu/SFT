export enum SlideType {
  INTRO = 'INTRO',
  LLM_TYPES = 'LLM_TYPES',
  TRAINING_STAGES = 'TRAINING_STAGES',
  SFT_DEEP_DIVE = 'SFT_DEEP_DIVE',
  LORA_MECHANICS = 'LORA_MECHANICS',
  CODE_WALKTHROUGH = 'CODE_WALKTHROUGH'
}

export interface SlideData {
  id: SlideType;
  title: string;
  subtitle?: string;
}

export const SLIDES: SlideData[] = [
  { id: SlideType.INTRO, title: "Rewriter (拟人改写器) 训练", subtitle: "基于 SFT 与 LoRA 的风格迁移任务" },
  { id: SlideType.LLM_TYPES, title: "大模型架构概览", subtitle: "为什么选择自回归模型 (Decoder-only)？" },
  { id: SlideType.TRAINING_STAGES, title: "大模型训练三阶段", subtitle: "SFT 在其中的位置" },
  { id: SlideType.SFT_DEEP_DIVE, title: "SFT 全流程详解", subtitle: "从数据构造到 Loss 计算" },
  { id: SlideType.LORA_MECHANICS, title: "LoRA 原理", subtitle: "低秩适应 (Low-Rank Adaptation)" },
  { id: SlideType.CODE_WALKTHROUGH, title: "代码实战", subtitle: "配置与训练流程" },
];