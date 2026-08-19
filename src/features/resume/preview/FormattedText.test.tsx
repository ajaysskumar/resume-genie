import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FormattedText } from './FormattedText'

describe('FormattedText', () => {
  it('renders b tags as strong elements', () => {
    render(<FormattedText>{'Before <b>bold</b> after'}</FormattedText>)

    expect(screen.getByText('bold').tagName).toBe('STRONG')
    expect(screen.getByText(/Before/)).toHaveTextContent('Before bold after')
  })

  it('keeps unsupported markup as text', () => {
    render(<FormattedText>{'Use <em>plain text</em>'}</FormattedText>)

    expect(screen.getByText('Use <em>plain text</em>')).toBeInTheDocument()
  })
})