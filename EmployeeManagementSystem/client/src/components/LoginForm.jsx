import React, { useState } from 'react'
import LoginLeftSide from './LoginLeftside'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react'


const LoginForm = ({role, title, subtitle}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  }
  return (
    
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftSide/>
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">

      
      <div className="w-full max-w-md animate-fade-in">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-400 
                hover:text-slate-700 text-sm mb-10 transition-colors">
          <ArrowLeftIcon size={16}/> Back to Portal Selection
        </Link>
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-medium text-zinc-800">{title}</h1>
          <p className="text-slate-500">{subtitle}</p>
        </div>
        {
          error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm 
            rounded-xl flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"/>
              {error}
            </div>
          )
        }
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="username@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
                  <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-4 py-2 border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="••••••••"
                      required
                    />  
                    <button type="button" className="absolute inset-y-0 right-0 px-3 flex 
                    items-center text-slate-400 hover:text-slate-600" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOffIcon size={18}/> : <EyeIcon size={18}/> }
                    </button>
            </div>          
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg 
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
            ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
           
          >
            {loading && <Loader2Icon className="animate-spin h-4 w-4 mr-2"/>}
            Sign In
          </button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default LoginForm