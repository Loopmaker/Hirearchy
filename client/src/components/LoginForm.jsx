import { useEffect, useState } from 'react'
import LoginLeftside from './LoginLeftside'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, EyeOffIcon, EyeIcon, Loader2Icon } from 'lucide-react'

const LoginForm = ({role, title, subtitle}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
 
  const handleSubmit = async (e) => {
    e.preventDefault();
  }
  return (
    <main className='min-h-screen flex flex-col md:flex-row'>
      <LoginLeftside />
      <section className='flex-1 flex items-center justify-center p-6 sm:p-12 bg-white relative overflow-y-auto min-h-screen'>

        <div className='w-full max-w-md animate-fade-in'>
          <Link to="/login" className='inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm mb-10 transition-colors'>
            <ArrowLeftIcon size={16}/> Back to portal
          </Link>
          <div className='mb-8'>
            <h1 className='text-2xl sm:text-3xl font-medium text-zinc-800'>{title}</h1>
            <p className='text-slate-500 text-sm sm:text-base mt-2'>{subtitle}</p>
          </div>
          {error && (
            <div className='mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-500 text-sm rounded-xl flex items-start gap-3'>
              <div className='w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0'/>
              {error}
            </div>
          )}
          <form className='space-y-6' onSubmit={handleSubmit}> 
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-slate-700 mb-2'>Email</label>
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='example@gmail.com' id='email'/>
            </div>
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-slate-700 mb-2'>Password</label>
              <div className='relative'>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className='pr-11' required placeholder='••••••••' id='password'/>
                <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700'>
                  {showPassword ? <EyeOffIcon size={16}/> : <EyeIcon size={16}/> }
                </button>
              </div>
            </div>
            <button type='submit' disabled={loading} className='w-full bg-slate-900 text-white py-2.5 rounded-md text-sm hover:bg-slate-800 font-semibold disabled:opacity-50 transition-all duration-200 shadow-lg active:scale-[0.98] flex items-center justify-center cursor-pointer'>
              {loading && <Loader2Icon className='animate-spin h-4 w-4 mr-2'/>}
              Sign In
            </button>
          </form>
        </div>

      </section>
    </main>

  )
}

export default LoginForm