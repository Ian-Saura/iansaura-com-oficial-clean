import React, { useState, useEffect } from 'react';
import { Play, Sparkles, ArrowRight, Zap, Target, Gift } from 'lucide-react';

// sql.js types - loaded dynamically
type Database = any;

interface QuickWinChallengeProps {
  onComplete: () => void;
  onSkip: () => void;
  isVisible: boolean;
}

/**
 * Quick Win Challenge - Mini ejercicio SQL para enganchar usuarios nuevos
 * Aparece al inicio para dar una "victoria rápida" y activar dopamina
 */
export const QuickWinChallenge: React.FC<QuickWinChallengeProps> = ({ 
  onComplete, 
  onSkip,
  isVisible 
}) => {
  const [db, setDb] = useState<Database | null>(null);
  const [userQuery, setUserQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Initialize SQL.js dynamically from CDN
  useEffect(() => {
    const initDb = async () => {
      try {
        // Load sql.js script dynamically if not already loaded
        if (!(window as any).initSqlJs) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://sql.js.org/dist/sql-wasm.js';
            script.onload = () => resolve();
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }
        
        const SQL = await (window as any).initSqlJs({
          locateFile: (file: string) => `https://sql.js.org/dist/${file}`
        });
        const database = new SQL.Database();
        
        // Create sample table
        database.run(`
          CREATE TABLE ventas (
            id INTEGER PRIMARY KEY,
            producto TEXT,
            cantidad INTEGER,
            precio REAL,
            fecha TEXT
          );
          
          INSERT INTO ventas VALUES 
            (1, 'Laptop', 5, 999.99, '2024-01-15'),
            (2, 'Mouse', 50, 29.99, '2024-01-15'),
            (3, 'Teclado', 30, 79.99, '2024-01-16'),
            (4, 'Monitor', 10, 299.99, '2024-01-16'),
            (5, 'Laptop', 3, 999.99, '2024-01-17'),
            (6, 'Mouse', 25, 29.99, '2024-01-17'),
            (7, 'Auriculares', 40, 149.99, '2024-01-18'),
            (8, 'Webcam', 15, 89.99, '2024-01-18');
        `);
        
        setDb(database);
      } catch (err) {
        console.error('Error initializing SQL.js:', err);
      }
    };
    
    if (isVisible) {
      initDb();
    }
  }, [isVisible]);

  const executeQuery = () => {
    if (!db || !userQuery.trim()) return;
    
    setAttempts(prev => prev + 1);
    setError(null);
    setResult(null);
    
    try {
      const results = db.exec(userQuery);
      
      if (results.length > 0) {
        setResult(results[0]);
        
        // Check if correct (should return total revenue)
        const values = results[0].values;
        if (values.length === 1 && values[0].length === 1) {
          const totalRevenue = Number(values[0][0]);
          // Expected: 5*999.99 + 50*29.99 + 30*79.99 + 10*299.99 + 3*999.99 + 25*29.99 + 40*149.99 + 15*89.99
          // = 4999.95 + 1499.5 + 2399.7 + 2999.9 + 2999.97 + 749.75 + 5999.6 + 1349.85 = 22998.22
          if (Math.abs(totalRevenue - 22998.22) < 1) {
            setIsCorrect(true);
            setShowCelebration(true);
            setTimeout(() => {
              onComplete();
            }, 3000);
          }
        }
      } else {
        setError('La consulta no devolvió resultados. Intentá de nuevo.');
      }
    } catch (err: any) {
      setError(err.message || 'Error en la consulta SQL');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-emerald-500/30 max-w-3xl w-full shadow-2xl shadow-emerald-500/10 my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 p-6 rounded-t-2xl border-b border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">🎯 Tu Primer Desafío SQL</h2>
              <p className="text-slate-400 text-sm">Completalo en 2 minutos y ganá +50 XP</p>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${isCorrect ? 'bg-emerald-500 w-full' : 'bg-emerald-500/50 w-0'}`}
              />
            </div>
            <span className="text-emerald-400 text-sm font-medium">
              {isCorrect ? '✓ Completado' : 'En progreso'}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Challenge description */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white mb-2">El Desafío:</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Tenés una tabla <code className="bg-slate-700 px-1.5 py-0.5 rounded text-emerald-400">ventas</code> con 
                  productos vendidos. <strong className="text-white">Calculá el total de ingresos</strong> (cantidad × precio).
                </p>
              </div>
            </div>
          </div>

          {/* Schema preview */}
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
            <div className="text-xs text-slate-500 mb-2 font-mono">📊 Tabla: ventas</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-700">
                    <th className="text-left py-1 px-2">id</th>
                    <th className="text-left py-1 px-2">producto</th>
                    <th className="text-left py-1 px-2">cantidad</th>
                    <th className="text-left py-1 px-2">precio</th>
                    <th className="text-left py-1 px-2">fecha</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300 font-mono text-xs">
                  <tr><td className="py-1 px-2">1</td><td className="py-1 px-2">Laptop</td><td className="py-1 px-2">5</td><td className="py-1 px-2">999.99</td><td className="py-1 px-2">2024-01-15</td></tr>
                  <tr><td className="py-1 px-2">2</td><td className="py-1 px-2">Mouse</td><td className="py-1 px-2">50</td><td className="py-1 px-2">29.99</td><td className="py-1 px-2">2024-01-15</td></tr>
                  <tr className="text-slate-500"><td className="py-1 px-2" colSpan={5}>... 6 filas más</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SQL Editor */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">Tu consulta SQL:</label>
              {attempts > 2 && !showHint && (
                <button 
                  onClick={() => setShowHint(true)}
                  className="text-xs text-amber-400 hover:underline"
                >
                  💡 Mostrar pista
                </button>
              )}
            </div>
            
            {showHint && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-sm text-amber-300">
                💡 <strong>Pista:</strong> Usá <code className="bg-slate-700 px-1 rounded">SUM(cantidad * precio)</code> para calcular el total
              </div>
            )}
            
            <div className="relative">
              <textarea
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="SELECT ..."
                className="w-full h-24 bg-slate-900 border border-slate-600 rounded-xl p-4 text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                disabled={isCorrect}
              />
              {!isCorrect && (
                <button
                  onClick={executeQuery}
                  disabled={!userQuery.trim() || !db}
                  className="absolute bottom-3 right-3 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Ejecutar
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
              ❌ {error}
            </div>
          )}
          
          {result && !isCorrect && (
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="text-sm text-slate-400 mb-2">Resultado:</div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-700">
                      {result.columns.map((col: string, i: number) => (
                        <th key={i} className="text-left py-1 px-2">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-white font-mono">
                    {result.values.slice(0, 5).map((row: any[], i: number) => (
                      <tr key={i}>
                        {row.map((val, j) => (
                          <td key={j} className="py-1 px-2">{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-amber-400 text-xs mt-2">
                🤔 Casi... el resultado debería ser un solo número con el total de ingresos
              </p>
            </div>
          )}

          {/* Success celebration */}
          {showCelebration && (
            <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl p-6 border border-emerald-500/50 text-center animate-pulse">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-2xl font-bold text-white mb-2">¡Excelente!</h3>
              <p className="text-emerald-400 mb-4">Acabás de ejecutar tu primera consulta SQL</p>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="text-white font-bold">+50 XP</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-lg">
                  <Gift className="w-5 h-5 text-amber-400" />
                  <span className="text-white font-bold">+10 DataCoins</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-between">
          <button
            onClick={onSkip}
            className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
          >
            Saltar por ahora
          </button>
          
          {isCorrect && (
            <button
              onClick={onComplete}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Continuar al Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickWinChallenge;


// sql.js types - loaded dynamically
