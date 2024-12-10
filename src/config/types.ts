import type {
  TypeBaseBlockSkeleton,
  TypeBlogHomeSkeleton,
  TypeButtonSkeleton,
  TypeLandingPageSkeleton,
  TypePostSkeleton,
  TypePressRoomSkeleton,
} from '@/contentful/types'
import type { Entry, EntryCollection } from 'contentful'

export type BaseBlockEntry = Entry<TypeBaseBlockSkeleton, undefined, string>
export type ButtonEntry = Entry<TypeButtonSkeleton, undefined, string>
export type LandingPageEntry = Entry<TypeLandingPageSkeleton, undefined, string>
export type PressRoomEntry = Entry<TypePressRoomSkeleton, undefined, string>
export type BlogHomeEntry = Entry<TypeBlogHomeSkeleton, undefined, string>
export type BlogPostEntry = Entry<TypePostSkeleton, undefined, string>
export type PostEntryCollection = EntryCollection<TypePostSkeleton, undefined, string>
