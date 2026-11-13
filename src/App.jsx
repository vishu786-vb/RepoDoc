import { useState } from 'react'
import {
  Github, ArrowRight, Check, RefreshCw, Star, Terminal, Code2,
  BookOpen, ShieldCheck, Zap, FileText, GitBranch, Menu, X, ChevronRight
} from 'lucide-react'

const examples = [
  { name: 'facebook/react', description: 'The library for web and native user interfaces', language: 'JavaScript', stars: '232k', url: 'https://github.com/facebook/react' },
  { name: 'vercel/next.js', description: 'The React framework for the web', language: 'TypeScript', stars: '128k', url: 'https://github.com/vercel/next.js' },
  { name: 'fastapi/fastapi', description: 'Modern, fast Python web framework', language: 'Python', stars: '82k', url: 'https://github.com/fastapi/fastapi' },
  { name: 'tailwindlabs/tailwindcss', description: 'A utility-first CSS framework', language: 'CSS', stars: '86k', url: 'https://github.com/tailwindlabs/tailwindcss' },
]

export default function App() {
  const [repo, setRepo] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const goToGenerator = () => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })

  async function generate(e) {
    e.preventDefault()
    setError('')
    setResult(null)
    const value = repo.trim()
    const valid = /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/.test(value) || /^[\w.-]+\/[\w.-]+$/.test(value)
    if (!valid) {
      setError('Please enter a valid GitHub repository URL, such as https://github.com/facebook/react.')
      return
    }
    const repositoryUrl = value.startsWith('http') ? value.replace(/\/$/, '') : `https://github.com/${value}`
    const apiBase = import.meta.env.VITE_API_BASE_URL
    if (!apiBase) {
      setError('Connect your AI backend to enable live documentation. Set VITE_API_BASE_URL in your .env file, then try again.')
      return
    }
    setBusy(true)
    try {
      const response = await fetch(`${apiBase.replace(/\/$/, '')}/v1/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repository_url: repositoryUrl }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || data.message || 'Documentation generation failed.')
      setResult(data)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100">
      <div className="site-glow site-glow-left" />
      <div className="site-glow site-glow-right" />
      <header className="relative z-20 border-b border-white/[.07]">
        <div className="mx-auto flex h-[78px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
          <a href="#" className="text-[20px] font-extrabold tracking-tight text-white">Repo<span className="text-[#3985ff]">Doc</span></a>
          <nav className="hidden items-center gap-10 text-[14px] font-medium text-slate-300 md:flex">
            <a href="#how-it-works" className="transition hover:text-white">How It Works</a>
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#pricing" className="transition hover:text-white">Pricing</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </nav>
          <div className="hidden md:block">
            <button onClick={goToGenerator} className="blue-button flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold">Sign In <ChevronRight size={16}/></button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg border border-white/10 p-2 md:hidden" aria-label="Toggle navigation">{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
        </div>
        {menuOpen && <nav className="mx-5 mb-4 grid gap-1 rounded-xl border border-white/10 bg-[#0c1426] p-3 md:hidden">
          {['How It Works','Features','Pricing','FAQ'].map((label,i)=><a key={label} href={['#how-it-works','#features','#pricing','#faq'][i]} onClick={()=>setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5">{label}</a>)}
          <button onClick={()=>{setMenuOpen(false);goToGenerator()}} className="mt-1 rounded-lg bg-blue-600 px-3 py-2 text-left text-sm font-bold">Sign In</button>
        </nav>}
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-[1280px] items-center gap-14 px-5 pb-24 pt-16 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:px-8 lg:pb-28 lg:pt-[86px]">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#4778e9]/35 bg-gradient-to-r from-[#11294c] to-[#20133f] px-4 py-2.5 text-[13px] font-medium text-slate-200 shadow-[0_0_30px_rgba(42,105,255,.08)]">
              <Star size={15} className="fill-[#63a6ff] text-[#63a6ff]"/> No repository data has been stored in our db.
            </div>
            <h1 className="text-[58px] font-extrabold leading-[1.02] tracking-[-.055em] text-white sm:text-[72px]">Repo<span className="text-[#3985ff]">Doc</span></h1>
            <div className="my-5 flex max-w-[590px] items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-500/40"/>
              <span className="rounded-full border border-blue-400/20 bg-[#0d1c36] px-4 py-1.5 text-[13px] font-semibold tracking-[.1em] text-blue-300">AI DOCUMENTATION ENGINE</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-500/40"/>
            </div>
            <p className="max-w-[590px] text-[17px] leading-[1.72] text-slate-300">
              Transform your GitHub repositories with stunning, professional README files. Our AI analyzes your code and generates comprehensive documentation that showcases your project's true potential.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button onClick={goToGenerator} className="blue-button flex items-center gap-3 rounded-full px-8 py-4 text-[15px] font-bold">Try RepoDoc Free <ArrowRight size={18}/></button>
              <span className="flex items-center gap-2 text-[13px] text-slate-400"><Check size={16} className="text-emerald-400"/> No credit card required</span>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs text-slate-500">
              <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-blue-400"/> Your code stays yours</span>
              <span className="flex items-center gap-2"><Zap size={15} className="text-blue-400"/> Documentation in minutes</span>
            </div>
          </div>

          <div className="terminal-window mx-auto w-full max-w-[590px]">
            <div className="terminal-top flex h-[49px] items-center justify-between border-b border-white/10 px-5">
              <div className="flex gap-2"><i className="h-3 w-3 rounded-full bg-[#e34d70]"/><i className="h-3 w-3 rounded-full bg-[#e9bd35]"/><i className="h-3 w-3 rounded-full bg-[#28bb91]"/></div>
              <div className="flex items-center gap-2 rounded-md bg-[#14213d] px-3 py-1 text-[12px] text-blue-200"><Terminal size={13}/> RepoDoc AI</div>
              <span className="w-10"/>
            </div>
            <div className="p-5 sm:p-6">
              <div className="terminal-screen min-h-[248px] rounded-lg border border-white/10 p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-2 font-mono text-[11px] tracking-wide text-slate-400"><span className="rounded bg-blue-500/15 p-1 text-blue-400"><Terminal size={13}/></span> RepoDoc AI Engine</div>
                <div className="space-y-4 font-mono text-[12px] sm:text-[13px]">
                  <div className="text-blue-300">→ Analyzing repository structure... <Check className="ml-1 inline text-emerald-400" size={14}/><p className="ml-7 mt-2 text-[11px] text-violet-300">Primary language: <span className="text-amber-200">TypeScript</span></p></div>
                  <div className="text-blue-300">→ Extracting project metadata... <Check className="ml-1 inline text-emerald-400" size={14}/><p className="ml-7 mt-2 text-[11px] text-violet-300">Processed: 42 files and dependencies</p></div>
                  <div className="text-emerald-300">→ Identifying key features... <RefreshCw className="ml-1 inline animate-spin text-blue-300" size={14}/></div>
                </div>
              </div>
              <div className="mt-5 h-[4px] overflow-hidden rounded-full bg-slate-700/70"><div className="h-full w-[66%] rounded-full bg-gradient-to-r from-[#2878ff] to-[#3f9bff] shadow-[0_0_12px_#3985ff]"/></div>
              <div className="mt-5 flex justify-end"><span className="blue-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13px] font-semibold">Analyzing... <RefreshCw size={14} className="animate-spin"/></span></div>
            </div>
          </div>
        </section>

        <section id="generator" className="border-y border-white/[.07] bg-[#091121]/90 py-16">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <div className="mx-auto mb-8 max-w-xl text-center">
              <p className="text-xs font-bold tracking-[.2em] text-blue-400">START WITH A REPOSITORY</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white">Generate your documentation</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">Paste a public GitHub URL and let RepoDoc map out your project.</p>
            </div>
            <form onSubmit={generate} className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-blue-400/20 bg-[#0b1425] p-3 shadow-[0_15px_60px_rgba(0,0,0,.25)] sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <Github size={21} className="shrink-0 text-slate-400"/>
                <input value={repo} onChange={e=>setRepo(e.target.value)} placeholder="https://github.com/username/repository" className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500" aria-label="GitHub repository URL"/>
              </div>
              <button disabled={busy} className="blue-button flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-bold disabled:opacity-60">{busy ? 'Generating...' : 'Generate Documentation'} <ArrowRight size={16}/></button>
            </form>
            {error && <p className="mx-auto mt-4 max-w-3xl rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">{error}</p>}
            {result && <div className="mx-auto mt-5 max-w-3xl rounded-xl border border-emerald-400/20 bg-[#0b1824] p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h3 className="font-bold text-white">{result.repository?.full_name || result.repository_url || 'Generated documentation'}</h3><button onClick={()=>navigator.clipboard?.writeText(result.markdown || result.documentation || JSON.stringify(result,null,2))} className="text-xs font-bold text-blue-300">Copy documentation</button></div>
              <pre className="max-h-[480px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-slate-300">{result.markdown || result.documentation || JSON.stringify(result,null,2)}</pre>
            </div>}
            <div className="mt-8">
              <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[.15em] text-slate-500">Or try an example repository</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {examples.map(item=><button key={item.name} onClick={()=>{setRepo(item.url);setError('');setResult(null)}} className="rounded-xl border border-white/[.08] bg-white/[.025] p-4 text-left transition hover:border-blue-400/30 hover:bg-blue-400/[.06]">
                  <div className="flex items-center justify-between"><span className="text-sm font-bold text-slate-200">{item.name}</span><GitBranch size={14} className="text-blue-400"/></div>
                  <p className="mt-2 min-h-9 text-xs leading-5 text-slate-500">{item.description}</p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500"><span>{item.language}</span><span>★ {item.stars}</span></div>
                </button>)}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
          <div className="text-center"><p className="text-xs font-bold tracking-[.2em] text-blue-400">BUILT FOR DEVELOPERS</p><h2 className="mt-3 text-3xl font-extrabold text-white">Everything your README should be.</h2></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[{icon:Code2,title:'Understand the code',text:'AI reads your repository structure and identifies the important building blocks.'},{icon:BookOpen,title:'Professional README',text:'Create polished documentation with setup instructions, features, and usage.'},{icon:FileText,title:'Project insights',text:'Surface dependencies, key modules, and architecture in an easy-to-follow format.'}].map(({icon:Icon,title,text})=><article key={title} className="feature-panel"><div className="mb-5 inline-flex rounded-xl border border-blue-400/20 bg-blue-500/10 p-3 text-blue-300"><Icon size={21}/></div><h3 className="text-lg font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></article>)}
          </div>
        </section>

        <section id="how-it-works" className="border-y border-white/[.07] bg-[#091121]/70 py-16">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <div className="text-center"><p className="text-xs font-bold tracking-[.2em] text-blue-400">HOW IT WORKS</p><h2 className="mt-3 text-3xl font-extrabold text-white">Three steps to clarity</h2></div>
            <div className="mt-10 grid gap-7 md:grid-cols-3">{[['01','Connect GitHub','Add a public repository URL to get started.'],['02','AI analyzes your code','RepoDoc maps structure, metadata, and key features.'],['03','Get your documentation','Review and use your generated project README.']].map(([n,t,d])=><div key={n} className="flex gap-4"><span className="font-mono text-sm font-bold text-blue-400">{n}</span><div><h3 className="font-bold text-white">{t}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{d}</p></div></div>)}</div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-4xl px-5 py-16 text-center"><p className="text-xs font-bold tracking-[.2em] text-blue-400">SIMPLE TO GET STARTED</p><h2 className="mt-3 text-3xl font-extrabold text-white">Try RepoDoc for free</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">Start exploring your repositories and see how much easier documentation can be.</p><button onClick={goToGenerator} className="blue-button mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold">Generate documentation <ArrowRight size={16}/></button></section>

        <section id="faq" className="border-t border-white/[.07] bg-[#080e1b] py-12">
          <div className="mx-auto max-w-3xl px-5"><h2 className="text-center text-2xl font-extrabold text-white">Frequently asked questions</h2><div className="mt-7 grid gap-4 sm:grid-cols-2"><div className="rounded-xl border border-white/[.08] p-5"><h3 className="text-sm font-bold text-white">Which repositories can I analyze?</h3><p className="mt-2 text-xs leading-5 text-slate-400">The starter integration is designed for public GitHub repositories. Private repository support requires secure backend authentication.</p></div><div className="rounded-xl border border-white/[.08] p-5"><h3 className="text-sm font-bold text-white">Does it generate documentation automatically?</h3><p className="mt-2 text-xs leading-5 text-slate-400">Yes, once your AI summarization backend is connected to the documented API endpoint.</p></div></div></div>
        </section>
      </main>
      <footer className="border-t border-white/[.07] px-5 py-7"><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row"><span className="font-bold text-slate-300">Repo<span className="text-blue-400">Doc</span></span><span>Turn complex code into clear documentation.</span><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-blue-300">Built for GitHub repositories</a></div></footer>
    </div>
  )
}
