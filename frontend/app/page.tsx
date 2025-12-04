import TriageContainer from '@/components/TriageContainer';
import AnimatedTips from '@/components/AnimatedTips';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      <AnimatedTips />
      <Link href="/">
        <div className="w-full max-w-3xl text-center mt-12 mb-8 px-4">
          <h1 className="text-3xl font-bold text-blue-900 mb-2 hover:text-blue-700 transition-colors">
            Ilumino
          </h1>
          <p className="text-gray-600">Lançando luz sobre sua saúde.</p>
        </div>
      </Link>

      <TriageContainer />

      <footer className="mt-12 mb-8 text-sm text-gray-400 text-center px-4 max-w-2xl">
        <p className="mb-3 text-gray-500 italic text-xs leading-relaxed">
          ⚕️ Este aplicativo é apenas para ajudar te orientar sobre questões de saúde. De modo algum pretende substituir a consulta com enfermeiro e médico, apenas serve de suporte a questionamentos.
        </p>
        <p className="mb-2">QDS Ilumino - MIT OSS License</p>
        <p className="mb-2">Não armazenamos seus dados pessoais.</p>
        <div className="flex items-center justify-center gap-4 mt-3">
          <a
            href="https://github.com/drandreq/qds_ilumino"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors flex items-center gap-2"
            title="Veja o código no GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github-icon lucide-github">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span className="text-xs">Confira no GitHub</span>
          </a>
          <a
            href="https://instagram.com/dr.andreq"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram-icon lucide-instagram">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span className="text-xs">@dr.andreq</span>
          </a>
        </div>
      </footer>
    </main>
  );
}
