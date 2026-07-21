import { useQuery } from '@tanstack/react-query'
import { getProjects, getProjectBySlug } from '../api/projects.js'

export const useProjects = (options = {}) => {
  return useQuery({
    queryKey: ['projects', options],
    queryFn: () => getProjects(options),
    select: (response) => response.data || [],
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    ...options,
  })
}

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ['projects', { featured: true }],
    queryFn: () => getProjects({ featured: true }),
    select: (response) => response.data || [],
    staleTime: 5 * 60 * 1000,
  })
}

export const useProjectBySlug = (slug) => {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: () => getProjectBySlug(slug),
    select: (response) => response.data,
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  })
}

export const prefetchProjects = async (queryClient) => {
  await queryClient.prefetchQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  })
}