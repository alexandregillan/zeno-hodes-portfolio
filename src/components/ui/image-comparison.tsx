// Motion Primitives · image-comparison
// Source: github.com/ibelick/motion-primitives (MIT) · listed on 21st.dev: https://21st.dev/@ibelick/components/image-comparison
'use client';
import { cn } from '@/lib/utils';
import { useState, createContext, useContext, useEffect } from 'react';
import {
  motion,
  MotionValue,
  SpringOptions,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';

const ImageComparisonContext = createContext<
  | {
      sliderPosition: number;
      setSliderPosition: (pos: number) => void;
      motionSliderPosition: MotionValue<number>;
    }
  | undefined
>(undefined);

export type ImageComparisonProps = {
  children: React.ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
  /** Added for this site: start position, a label for assistive tech, and a handle on the position. */
  defaultPosition?: number;
  label?: string;
  onPosition?: (value: MotionValue<number>) => void;
};

const DEFAULT_SPRING_OPTIONS = {
  bounce: 0,
  duration: 0,
};

function ImageComparison({
  children,
  className,
  enableHover,
  springOptions,
  defaultPosition = 50,
  label,
  onPosition,
}: ImageComparisonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const motionValue = useMotionValue(defaultPosition);
  const motionSliderPosition = useSpring(
    motionValue,
    springOptions ?? DEFAULT_SPRING_OPTIONS
  );
  const [sliderPosition, setSliderPosition] = useState(defaultPosition);

  useEffect(() => {
    onPosition?.(motionValue);
    return motionValue.on('change', (v) => setSliderPosition(v));
  }, [motionValue]);

  const handleKey = (event: React.KeyboardEvent) => {
    const step = event.shiftKey ? 10 : 4;
    if (event.key === 'ArrowLeft') motionValue.set(Math.max(0, motionValue.get() - step));
    else if (event.key === 'ArrowRight') motionValue.set(Math.min(100, motionValue.get() + step));
    else if (event.key === 'Home') motionValue.set(0);
    else if (event.key === 'End') motionValue.set(100);
    else return;
    event.preventDefault();
  };

  const handleDrag = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && !enableHover) return;

    const containerRect = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect();
    const x =
      'touches' in event
        ? event.touches[0].clientX - containerRect.left
        : (event as React.MouseEvent).clientX - containerRect.left;

    const percentage = Math.min(
      Math.max((x / containerRect.width) * 100, 0),
      100
    );
    motionValue.set(percentage);
    setSliderPosition(percentage);
  };

  return (
    <ImageComparisonContext.Provider
      value={{ sliderPosition, setSliderPosition, motionSliderPosition }}
    >
      <div
        className={cn(
          'relative touch-pan-y select-none overflow-hidden',
          enableHover && 'cursor-ew-resize',
          className
        )}
        role='slider'
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        onKeyDown={handleKey}
        onMouseMove={handleDrag}
        onMouseDown={(e) => {
          if (enableHover) return;
          setIsDragging(true);
          const r = e.currentTarget.getBoundingClientRect();
          motionValue.set(Math.min(Math.max(((e.clientX - r.left) / r.width) * 100, 0), 100));
        }}
        onMouseUp={() => !enableHover && setIsDragging(false)}
        onMouseLeave={() => !enableHover && setIsDragging(false)}
        onTouchMove={handleDrag}
        onTouchStart={() => !enableHover && setIsDragging(true)}
        onTouchEnd={() => !enableHover && setIsDragging(false)}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  );
}

const ImageComparisonImage = ({
  className,
  alt,
  src,
  position,
}: {
  className?: string;
  alt: string;
  src: string;
  position: 'left' | 'right';
}) => {
  const { motionSliderPosition } = useContext(ImageComparisonContext)!;
  const leftClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 0 0 ${value}%)`
  );
  const rightClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 ${100 - value}% 0 0)`
  );

  return (
    <motion.img
      src={src}
      alt={alt}
      draggable={false}
      className={cn('absolute inset-0 h-full w-full object-cover', className)}
      style={{
        clipPath: position === 'left' ? leftClipPath : rightClipPath,
      }}
    />
  );
};

const ImageComparisonSlider = ({
  className,
  children,
}: {
  className: string;
  children?: React.ReactNode;
}) => {
  const { motionSliderPosition } = useContext(ImageComparisonContext)!;

  const left = useTransform(motionSliderPosition, (value) => `${value}%`);

  return (
    <motion.div
      className={cn('absolute bottom-0 top-0 w-1 cursor-ew-resize', className)}
      style={{
        left,
      }}
    >
      {children}
    </motion.div>
  );
};

export { ImageComparison, ImageComparisonImage, ImageComparisonSlider };
