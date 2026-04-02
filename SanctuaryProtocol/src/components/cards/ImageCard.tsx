"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Card } from "@/config/cards";

interface ImageCardProps {
  card: Card;
  onClick?: () => void;
  onDoubleClick?: () => void;
  isSelected?: boolean;
  className?: string;
  size?: "small" | "medium" | "large";
}

export default function ImageCard({
  card,
  onClick,
  onDoubleClick,
  isSelected = false,
  className = "",
  size = "medium",
}: ImageCardProps) {
  const t = useTranslations();
  
  const sizeClasses = {
    small: "w-24",
    medium: "w-full",
    large: "w-full max-w-md",
  };

  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={`
        group relative cursor-pointer transition-all duration-500
        ${onClick ? "hover:-translate-y-1" : ""}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {/* 外层几何边框 */}
      <div 
        className={`
          relative border transition-all duration-300 bg-white
          ${isSelected 
            ? "border-accent shadow-geometric" 
            : "border-gray-200 group-hover:border-accent/50"
          }
        `}
      >
        {/* 内层装饰边框 */}
        <div 
          className={`
            absolute inset-1 border transition-all duration-300 pointer-events-none
            ${isSelected ? "border-accent/30" : "border-transparent group-hover:border-accent/10"}
          `} 
        />

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

        {/* 卡牌图片容器 - 9:16 纵向比例 */}
        <div className="aspect-[9/16] relative overflow-hidden bg-gray-50 m-3">
          <Image
            src={card.imagePath}
            alt={t('select.imageCards')}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            draggable={false}
          />
          
          {/* 悬浮遮罩 */}
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
          
          {/* 双击提示 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs text-white bg-black/50 px-2 py-1">
              {t('select.doubleClickToView')}
            </span>
          </div>
        </div>

        {/* 选中标记 */}
        {isSelected && (
          <div className="absolute top-4 right-4 w-6 h-6 bg-accent flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
