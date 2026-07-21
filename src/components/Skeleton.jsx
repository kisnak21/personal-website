export const ProjectSkeleton = () => (
  <div className="bg-surface-container rounded-lg border border-outline-variant p-6 animate-pulse">
    <div className="w-12 h-12 bg-surface-variant rounded mb-4" />
    <div className="h-6 bg-surface-variant rounded w-3/4 mb-3" />
    <div className="h-4 bg-surface-variant rounded w-full mb-2" />
    <div className="h-4 bg-surface-variant rounded w-5/6 mb-4" />
    <div className="flex gap-2 mb-6">
      <div className="h-5 w-16 bg-surface-variant rounded" />
      <div className="h-5 w-20 bg-surface-variant rounded" />
      <div className="h-5 w-14 bg-surface-variant rounded" />
    </div>
    <div className="flex gap-4">
      <div className="h-4 w-28 bg-surface-variant rounded" />
      <div className="h-4 w-24 bg-surface-variant rounded" />
    </div>
  </div>
)

export const SkillSkeleton = () => (
  <div className="border border-outline-variant bg-surface-container-lowest px-4 py-3 rounded animate-pulse">
    <div className="flex items-center justify-between mb-2">
      <div className="h-5 w-24 bg-surface-variant rounded" />
      <div className="h-4 w-20 bg-surface-variant rounded" />
    </div>
    <div className="w-full h-1.5 bg-surface-variant rounded overflow-hidden">
      <div className="h-full bg-surface-variant w-3/4 rounded" />
    </div>
  </div>
)

export const ProjectCardSkeleton = () => (
  <div className="bg-surface-container rounded-lg border border-outline-variant overflow-hidden animate-pulse">
    <div className="p-6">
      <div className="w-12 h-12 bg-surface-variant rounded mb-4" />
      <div className="h-6 bg-surface-variant rounded w-3/4 mb-3" />
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-surface-variant rounded w-full" />
        <div className="h-4 bg-surface-variant rounded w-5/6" />
      </div>
      <div className="flex gap-2 mb-6">
        <div className="h-5 w-16 bg-surface-variant rounded" />
        <div className="h-5 w-20 bg-surface-variant rounded" />
      </div>
      <div className="flex gap-4">
        <div className="h-4 w-28 bg-surface-variant rounded" />
        <div className="h-4 w-24 bg-surface-variant rounded" />
      </div>
    </div>
  </div>
)