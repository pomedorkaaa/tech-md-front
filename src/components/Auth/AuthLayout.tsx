import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  subtitle?: string;
  showWatermark?: boolean;
}

export default function AuthLayout({ children, subtitle, showWatermark = false }: AuthLayoutProps) {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-12 relative overflow-hidden min-h-screen">
      {/* Background Ambient Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-lg z-10">
        {/* Brand Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center justify-center gap-3 mb-2 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-xl shadow-lg shadow-primary/20">
              <span className="text-white font-sans font-black text-xl">TM</span>
            </div>
            <h1 className="font-sans font-extrabold text-4xl tracking-tighter text-text-primary flex items-center">
              Tech<span className="text-primary">Moldova</span>
            </h1>
          </Link>
          {subtitle && (
            <p className="text-text-secondary font-sans text-sm tracking-wide mt-2">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content Box */}
        {children}

        {/* Watermark */}
        {showWatermark && (
          <>
            <div className="mt-12 flex justify-center items-center gap-6 opacity-20 grayscale">
              <div className="h-[1px] w-12 bg-border"></div>
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-blue-500"></div>
                <div className="w-1 h-3 bg-yellow-500"></div>
                <div className="w-1 h-3 bg-red-500"></div>
              </div>
              <div className="h-[1px] w-12 bg-border"></div>
            </div>

            <p className="mt-6 text-center font-sans text-medium text-[10px] text-text-muted/40 uppercase tracking-widest">
              Designed for the Moldovan Tech Ecosystem
            </p>
          </>
        )}
      </div>
    </main>
  );
}
