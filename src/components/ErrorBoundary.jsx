import { Component } from 'react'
import SEO from './SEO.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen flex items-center justify-center bg-background p-4'>
          <SEO title='Error' />
          <div className='max-w-md w-full bg-surface-container rounded-lg border border-outline-variant p-8 text-center'>
            <div className='w-16 h-16 mx-auto mb-6 rounded-full bg-error/10 flex items-center justify-center'>
              <span className='material-symbols-outlined text-error text-[32px]'>
                error_outline
              </span>
            </div>
            <h1 className='font-headline-sm text-headline-sm text-on-surface mb-2'>
              Something went wrong
            </h1>
            <p className='font-body-md text-body-md text-on-surface-variant mb-6'>
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <div className='bg-surface-variant rounded p-3 mb-6 text-left'>
              <code className='font-code-sm text-code-sm text-error break-all'>
                {this.state.error?.message || 'Unknown error'}
              </code>
            </div>
            <button
              onClick={() => window.location.reload()}
              className='px-6 py-3 bg-primary text-on-primary font-label-caps text-label-caps rounded hover:opacity-90 smooth-transition active:scale-95'
            >
              REFRESH PAGE
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
