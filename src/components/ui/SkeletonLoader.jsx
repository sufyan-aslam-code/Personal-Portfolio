export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-4"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  return (
    <div className={`skeleton rounded-full ${sizes[size]} ${className}`} />
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`rounded-2xl p-6 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-800 ${className}`}>
      <div className="skeleton h-40 mb-4 rounded-xl" />
      <div className="skeleton h-5 w-3/4 mb-3" />
      <div className="skeleton h-4 w-full mb-2" />
      <div className="skeleton h-4 w-5/6 mb-4" />
      <div className="flex gap-2">
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonBadge({ className = '' }) {
  return (
    <div className={`rounded-2xl p-5 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-gray-800 ${className}`}>
      <div className="skeleton h-16 w-16 rounded-xl mx-auto mb-4" />
      <div className="skeleton h-4 w-3/4 mx-auto mb-2" />
      <div className="skeleton h-3 w-1/2 mx-auto" />
    </div>
  );
}

export function SkeletonTimeline({ items = 3, className = '' }) {
  return (
    <div className={`space-y-8 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="skeleton w-4 h-4 rounded-full" />
            {i < items - 1 && <div className="skeleton w-0.5 flex-1 mt-2" />}
          </div>
          <div className="flex-1 pb-8">
            <div className="skeleton h-5 w-48 mb-2" />
            <div className="skeleton h-4 w-32 mb-3" />
            <div className="skeleton h-4 w-full mb-1" />
            <div className="skeleton h-4 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
