import { cn } from '../../../lib/classNames'
import { ReactNode } from 'react'

interface TableProps {
  children: ReactNode
  className?: string
}

interface TableHeaderProps {
  children: ReactNode
  className?: string
}

interface TableRowProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

interface TableCellProps {
  children: ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
}

export function Table({ children, className }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full", className)}>
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <thead className={cn("border-b border-gray-200 dark:border-gray-700", className)}>
      <tr>{children}</tr>
    </thead>
  )
}

export function TableRow({ children, className, hover = true }: TableRowProps) {
  return (
    <tr className={cn(
      "border-b border-gray-100 dark:border-gray-800",
      hover && "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
      className
    )}>
      {children}
    </tr>
  )
}

export function TableCell({ children, className, align = 'left' }: TableCellProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  return (
    <td className={cn(
      "py-4 px-4",
      alignClasses[align],
      className
    )}>
      {children}
    </td>
  )
}

export function TableHead({ children, className, align = 'left' }: TableCellProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  return (
    <th className={cn(
      "py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400",
      alignClasses[align],
      className
    )}>
      {children}
    </th>
  )
}