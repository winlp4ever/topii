import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  MutableRefObject,
} from 'react';
import type { HTMLAttributes } from 'react';

export interface ResizableDivProps extends HTMLAttributes<HTMLDivElement> {
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  lockAspectRatio?: boolean;
  onCustomResize?: (width: number, height: number) => void;
  selected?: boolean;
  selectable?: boolean;
  className?: string;
}

const ResizableDiv = forwardRef<HTMLDivElement, ResizableDivProps>(({
  className = '',
  children,
  minWidth = 50,
  minHeight = 50,
  maxWidth = Infinity,
  maxHeight = Infinity,
  lockAspectRatio = false,
  onCustomResize,
  selected = false,
  selectable = false,
  ...props
}, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isResizingRef = useRef(false);
  const aspectRatioRef = useRef(1);
  const currentHandle = useRef<string | null>(null);

  const [dimensions, setDimensions] = useState<{ width?: number; height?: number }>({});

  // Forward ref
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(containerRef.current);
    } else {
      (ref as MutableRefObject<HTMLDivElement | null>).current = containerRef.current;
    }
  }, [ref]);

  const startResize = (e: MouseEvent | TouchEvent, handle: string) => {
    e.preventDefault?.();
    isResizingRef.current = true;
    currentHandle.current = handle;

    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const startWidth = rect.width;
    const startHeight = rect.height;
    const startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    if (lockAspectRatio) {
      aspectRatioRef.current = startWidth / startHeight;
    }

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isResizingRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      // Horizontal resize
      if (handle.includes('right')) {
        newWidth = startWidth + deltaX;
      } else if (handle.includes('left')) {
        newWidth = startWidth - deltaX;
      }

      // Vertical resize
      if (handle.includes('bottom')) {
        newHeight = startHeight + deltaY;
      } else if (handle.includes('top')) {
        newHeight = startHeight - deltaY;
      }

      // Aspect ratio lock
      if (lockAspectRatio) {
        const ratio = aspectRatioRef.current;
        if (newWidth / newHeight > ratio) {
          newWidth = newHeight * ratio;
        } else {
          newHeight = newWidth / ratio;
        }
      }

      newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
      newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

      setDimensions({ width: newWidth, height: newHeight });
      onCustomResize?.(newWidth, newHeight);
    };

    const onEnd = () => {
      isResizingRef.current = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
  };


  const handleDown = (handle: string) => (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startResize(e.nativeEvent, handle);
  };

  const resizeHandles = [
    { pos: 'top-left', class: 'top-0 left-0 cursor-nwse-resize' },
    { pos: 'top-right', class: 'top-0 right-0 cursor-nesw-resize' },
    { pos: 'bottom-left', class: 'bottom-0 left-0 cursor-nesw-resize' },
    { pos: 'bottom-right', class: 'bottom-0 right-0 cursor-nwse-resize' },
  ];

  return (
    <div
      ref={containerRef}
      {...props}
      className={`relative ${className}`}
      style={{
        ...(dimensions.width !== undefined ? { width: dimensions.width } : {}),
        ...(dimensions.height !== undefined ? { height: dimensions.height } : {}),
        ...props.style,
      }}
    >
      {children}

      {selectable && selected && (
        <>
          {/* Contour box */}
          <div className="absolute -inset-1 pointer-events-none border border-blue-500 rounded-md" />

          {/* 4 corner resize points */}
          {resizeHandles.map(({ pos, class: posClass }) => (
            <div
              key={pos}
              data-no-drag
              onMouseDown={handleDown(pos)}
              onTouchStart={handleDown(pos)}
              className={`absolute w-3 h-3 bg-white border border-blue-500 rounded-full ${posClass} z-20`}
              style={{
                transform: `translate(${pos.includes('right') ? '50%' : '-50%'}, ${pos.includes('bottom') ? '50%' : '-50%'})`,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
});

ResizableDiv.displayName = 'ResizableDiv';
export default ResizableDiv;
