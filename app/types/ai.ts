export enum LLMEnum {
  GPT4O = 'gpt-4o',
  GPT4O_MINI = 'gpt-4o-mini',
  MISTRAL_LARGE_LATEST = 'mistral-large-latest',
  GEMINI_2_FLASH = 'gemini-2.0-flash',
  Stellia_SM_2 = 'stellia/stellialm_small_qwen7b_9tasks',
}


export const LLMName: Record<LLMEnum, string> = {
  [LLMEnum.GPT4O]: 'GPT-4o',
  [LLMEnum.GPT4O_MINI]: 'GPT-4o-mini',
  [LLMEnum.MISTRAL_LARGE_LATEST]: 'mistral-large',
  [LLMEnum.GEMINI_2_FLASH]: 'gemini-2.0-flash',
  [LLMEnum.Stellia_SM_2]: 'stellia-sm-2',
};


export const LLMDescription: Record<LLMEnum, string> = {
  [LLMEnum.GPT4O]: 'Great for high-quality, reliable responses with minimal hallucination, making it a solid default choice.',
  [LLMEnum.GPT4O_MINI]: 'A more affordable option with similar reliability, suitable for less demanding tasks.',
  [LLMEnum.MISTRAL_LARGE_LATEST]: 'Best for those who prefer a French-based AI solution.',
  [LLMEnum.GEMINI_2_FLASH]: 'Ideal for cost-effective, factual responses, perfect for concise and straightforward answers.',
  [LLMEnum.Stellia_SM_2]: 'Our proprietary model, excellent for top privacy and quality answers, matching top models in specific tasks.',
};


export interface AISettings {
  model: LLMEnum;
}