import type { WordCard as WordCardType } from "@/types/card";

interface WordCardProps {
  card: WordCardType;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function WordCard({
  card,
  isSelected = false,
  onClick,
  className = "",
}: WordCardProps) {
  // 判断字数，四字词需要特殊排版
  const isFourChars = card.word.length === 4;

  return (
    <div
      onClick={onClick}
      className={`
        group relative cursor-pointer transition-all duration-300
        ${onClick ? "hover:-translate-y-1" : ""}
        ${className}
      `}
    >
      {/* 外层边框 - 统一高度 */}
      <div 
        className={`
          relative border h-32 flex items-center justify-center
          transition-all duration-300
          ${isSelected 
            ? "border-accent bg-accent/5 shadow-geometric" 
            : "border-gray-200 bg-white hover:border-accent/50"
          }
        `}
      >
        {/* 角落装饰 */}
        <span 
          className={`
            absolute top-2 left-2 w-2 h-2 border-t border-l transition-colors duration-300
            ${isSelected ? "border-accent" : "border-gray-300 group-hover:border-accent/40"}
          `} 
        />
        <span 
          className={`
            absolute top-2 right-2 w-2 h-2 border-t border-r transition-colors duration-300
            ${isSelected ? "border-accent" : "border-gray-300 group-hover:border-accent/40"}
          `} 
        />
        <span 
          className={`
            absolute bottom-2 left-2 w-2 h-2 border-b border-l transition-colors duration-300
            ${isSelected ? "border-accent" : "border-gray-300 group-hover:border-accent/40"}
          `} 
        />
        <span 
          className={`
            absolute bottom-2 right-2 w-2 h-2 border-b border-r transition-colors duration-300
            ${isSelected ? "border-accent" : "border-gray-300 group-hover:border-accent/40"}
          `} 
        />

        {/* 字卡文字 - 根据字数调整排版 */}
        {isFourChars ? (
          // 四字词：每行两个字，居中排列（包含斜杠）
          <div className={`
            flex flex-col items-center justify-center leading-tight
            transition-colors duration-300
            ${isSelected ? "text-accent" : "text-text group-hover:text-accent"}
          `}>
            <span className="text-xl font-serif tracking-widest">{card.word.slice(0, 3)}</span>
            <span className="text-xl font-serif tracking-widest mt-1">{card.word.slice(3)}</span>
          </div>
        ) : (
          // 其他字数：单行居中
          <h3 className={`
            text-2xl font-serif tracking-wider transition-colors duration-300
            ${isSelected ? "text-accent" : "text-text group-hover:text-accent"}
          `}>
            {card.word}
          </h3>
        )}

        {/* 选中标记 */}
        {isSelected && (
          <div className="absolute top-3 right-3 w-5 h-5 bg-accent flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
