import React, { useState, useEffect } from 'react';
import { 
  FileJson, Table, Download, 
  TrendingUp, CheckCircle, ArrowRight, ChevronDown, Info, BookOpen, Zap, Lock, Copy, Key
} from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';
import { datasets, apiInfo } from '../../../data/datasetsData';

/**
 * Genera la API key para un email (debe coincidir con el backend)
 * Esta es una versión simplificada usando la misma lógica que el servidor
 */
async function generateApiKeyForEmail(email: string): Promise<string> {
  const secret = '***REMOVED***';
  const data = email.toLowerCase() + secret;
  
  // Use Web Crypto API for SHA-256
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return 'ds_' + hashHex.substring(0, 32);
}

interface GeneratedDataset {
  dataset_type: string;
  description: string;
  tables: { [key: string]: any[] };
  schema: { [key: string]: string[] };
  relationships: string[];
}

interface DatasetSuggestion {
  id: string;
  suggestion: string;
  votes: number;
  voters: string[];
  created_at: string;
}

const DatasetSuggestionBox: React.FC<{ userEmail: string }> = ({ userEmail }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useLanguage();
  const [suggestion, setSuggestion] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState<DatasetSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [justVoted, setJustVoted] = useState<string | null>(null);
  const [justSubmitted, setJustSubmitted] = useState(false);

  // Cargar sugerencias al montar
  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    try {
      const res = await fetch('/api/dataset-suggestions.php?action=list');
      const data = await res.json();
      if (data.success) {
        setSuggestions(data.suggestions || []);
      }
    } catch (err) {
      console.error('Error loading suggestions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!suggestion.trim()) return;
    
    setSubmitting(true);
    try {
      const res = await fetch('/api/dataset-suggestions.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'suggest',
          email: userEmail, 
          suggestion: suggestion.trim()
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuggestion('');
        setJustSubmitted(true);
        setTimeout(() => setJustSubmitted(false), 3000);
        loadSuggestions();
      }
    } catch (err) {
      console.error('Error submitting suggestion:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (suggestionId: string) => {
    try {
      const res = await fetch('/api/dataset-suggestions.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'vote',
          email: userEmail, 
          suggestion_id: suggestionId
        })
      });
      const data = await res.json();
      if (data.success) {
        setJustVoted(suggestionId);
        setTimeout(() => setJustVoted(null), 2000);
        loadSuggestions();
      }
    } catch (err) {
      console.error('Error voting:', err);
    }
  };

  const hasVoted = (sug: DatasetSuggestion) => sug.voters?.includes(userEmail);
  const topSuggestion = suggestions.length > 0 ? suggestions[0] : null;

  return (
    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-6 border border-amber-500/30">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🗳️</span>
          <div>
            <h3 className="text-lg font-semibold text-white">{t('datasets.voting.title')}</h3>
            <p className="text-amber-400/70 text-sm">{t('datasets.voting.subtitle')}</p>
          </div>
        </div>
        {topSuggestion && (
          <div className="bg-amber-500/20 px-3 py-1 rounded-full">
            <span className="text-amber-300 text-sm font-medium">{t('datasets.voting.leader', { votes: topSuggestion.votes })}</span>
          </div>
        )}
      </div>

      {/* Input para nueva sugerencia */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          placeholder={t('datasets.voting.placeholder')}
          aria-label={t('datasets.voting.placeholder')}
          className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={submitting || !suggestion.trim()}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          {submitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : justSubmitted ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
          {justSubmitted ? t('datasets.voting.added') : t('datasets.voting.suggest')}
        </button>
      </div>

      {/* Lista de sugerencias con votos */}
      {loading ? (
        <div className="text-slate-400 text-sm text-center py-4">{t('datasets.voting.loading')}</div>
      ) : suggestions.length === 0 ? (
        <div className="text-slate-400 text-sm text-center py-4 bg-slate-800/30 rounded-lg">
          {t('datasets.voting.firstSuggest')}
        </div>
      ) : (
        <div>
          {/* Top 3 siempre visibles */}
          <div className="space-y-2">
            {suggestions.slice(0, 3).map((sug, idx) => (
              <div 
                key={sug.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  idx === 0 
                    ? 'bg-amber-500/20 border border-amber-500/40' 
                    : 'bg-slate-800/50 border border-slate-700/50'
                } ${justVoted === sug.id ? 'ring-2 ring-emerald-500' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                  </span>
                  <span className={`font-medium ${idx === 0 ? 'text-amber-300' : 'text-white'}`}>
                    {sug.suggestion}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${idx === 0 ? 'text-amber-400' : 'text-slate-400'}`}>
                    {sug.votes}
                  </span>
                  <button
                    onClick={() => handleVote(sug.id)}
                    disabled={hasVoted(sug)}
                    className={`p-2 rounded-lg transition-all ${
                      hasVoted(sug)
                        ? 'bg-emerald-500/20 text-emerald-400 cursor-default'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                    title={hasVoted(sug) ? t('datasets.voting.alreadyVoted') : t('datasets.voting.vote')}
                  >
                    {hasVoted(sug) ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <TrendingUp className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resto colapsable */}
          {suggestions.length > 3 && (
            <div className="mt-3">
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1"
              >
                {expanded ? (
                  <>
                    <ChevronDown className="w-4 h-4 rotate-180" />
                    {t('datasets.voting.hideMore', { count: suggestions.length - 3 })}
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    {t('datasets.voting.showMore', { count: suggestions.length - 3 })}
                  </>
                )}
              </button>
              
              {expanded && (
                <div className="mt-2 space-y-2">
                  {suggestions.slice(3).map((sug, idx) => (
                    <div 
                      key={sug.id}
                      className={`flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 ${
                        justVoted === sug.id ? 'ring-2 ring-emerald-500' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 text-sm font-mono w-6">#{idx + 4}</span>
                        <span className="text-slate-300">{sug.suggestion}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">{sug.votes}</span>
                        <button
                          onClick={() => handleVote(sug.id)}
                          disabled={hasVoted(sug)}
                          className={`p-2 rounded-lg transition-all ${
                            hasVoted(sug)
                              ? 'bg-emerald-500/20 text-emerald-400 cursor-default'
                              : 'bg-slate-700 hover:bg-slate-600 text-white'
                          }`}
                          title={hasVoted(sug) ? t('datasets.voting.alreadyVoted') : t('datasets.voting.vote')}
                        >
                          {hasVoted(sug) ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <TrendingUp className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <div className="mt-4 text-xs text-slate-500 flex items-center gap-2">
        <Info className="w-3 h-3" />
        {t('datasets.voting.info')}
      </div>
    </div>
  );
};

// FREE USER CONFIG: Only 'ecommerce' dataset is free
const FREE_DATASET_IDS = ['ecommerce'];

export const DatasetsTab: React.FC<{ userEmail: string; isFreeUser?: boolean }> = ({ userEmail, isFreeUser = false }) => {
  const { t, tLocalized, language } = useLanguage();
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [userApiKey, setUserApiKey] = useState<string>('');

  // Generate API key on mount
  useEffect(() => {
    if (userEmail) {
      generateApiKeyForEmail(userEmail).then(key => setUserApiKey(key));
    }
  }, [userEmail]);
  
  // Check if a dataset is free
  const isDatasetFree = (datasetId: string): boolean => {
    if (!isFreeUser) return true;
    return FREE_DATASET_IDS.includes(datasetId);
  };
  const [rowCount, setRowCount] = useState(100);
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [generating, setGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<GeneratedDataset | null>(null);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!selectedDataset) return;
    
    setGenerating(true);
    setError(null);
    setGeneratedData(null);
    setSelectedTable('');
    
    try {
      const response = await fetch(`/api/datasets.php?type=${selectedDataset}&rows=${rowCount}&format=json&email=${encodeURIComponent(userEmail)}&key=${encodeURIComponent(userApiKey)}&lang=${language}`);
      
      if (!response.ok) {
        throw new Error(tLocalized({ es: 'Error al generar el dataset', en: 'Error generating dataset', pt: 'Erro ao gerar o dataset' }));
      }
      
      const data = await response.json();
      setGeneratedData(data);
      
      // Select first table by default
      if (data.tables) {
        const tableNames = Object.keys(data.tables);
        if (tableNames.length > 0) {
          setSelectedTable(tableNames[0]);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : tLocalized({ es: 'Error desconocido', en: 'Unknown error', pt: 'Erro desconhecido' }));
    } finally {
      setGenerating(false);
    }
  };

  const arrayToCsv = (data: any[]): string => {
    if (!data || data.length === 0) return '';
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(h => {
          const val = row[h];
          if (val === null || val === undefined) return '';
          if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
            return `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        }).join(',')
      )
    ];
    return csvRows.join('\n');
  };

  const downloadTable = (tableName: string) => {
    if (!generatedData || !generatedData.tables[tableName]) return;
    
    const tableData = generatedData.tables[tableName];
    let content: string;
    let mimeType: string;
    let extension: string;

    if (format === 'json') {
      content = JSON.stringify(tableData, null, 2);
      mimeType = 'application/json';
      extension = 'json';
    } else {
      content = arrayToCsv(tableData);
      mimeType = 'text/csv';
      extension = 'csv';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedDataset}_${tableName}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAllTables = () => {
    if (!generatedData) return;
    Object.keys(generatedData.tables).forEach((tableName, index) => {
      setTimeout(() => downloadTable(tableName), index * 200);
    });
  };

  return (
    <div className="space-y-8">
                    <div>
        <h2 className="text-2xl font-bold text-white mb-2">📊 {tLocalized({ es: 'Datasets & APIs', en: 'Datasets & APIs', pt: 'Datasets & APIs' })}</h2>
        <p className="text-slate-400">{tLocalized({ es: 'Generá datasets realistas para practicar. Descargá en CSV, JSON o usá la API.', en: 'Generate realistic datasets for practice. Download in CSV, JSON or use the API.', pt: 'Gere datasets realistas para praticar. Baixe em CSV, JSON ou use a API.' })}</p>
                      </div>

      {/* Dataset Generator - PRINCIPAL */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl p-6 border border-emerald-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">🚀 {tLocalized({ es: 'Generador de Datasets', en: 'Dataset Generator', pt: 'Gerador de Datasets' })}</h3>
          <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">{tLocalized({ es: 'Usá abajo ↓', en: 'Use below ↓', pt: 'Use abaixo ↓' })}</span>
        </div>
        <p className="text-slate-300">
          {tLocalized({ 
            es: 'Seleccioná un tipo de dataset, elegí la cantidad de filas y hacé click en "Generar". Podés descargar el resultado en CSV o JSON.', 
            en: 'Select a dataset type, choose the number of rows and click "Generate". You can download the result in CSV or JSON.', 
            pt: 'Selecione um tipo de dataset, escolha o número de linhas e clique em "Gerar". Você pode baixar o resultado em CSV ou JSON.' 
          })}
        </p>
      </div>

      {/* API Documentation - SECUNDARIO */}
      <details className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/30 overflow-hidden group">
        <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-purple-500/5 transition-colors">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-bold text-white">API REST</h3>
            <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-full">{tLocalized({ es: 'Para uso externo', en: 'For external use', pt: 'Para uso externo' })}</span>
          </div>
          <ChevronDown className="w-5 h-5 text-purple-400 group-open:rotate-180 transition-transform" />
        </summary>
        
        <div className="px-6 pb-6 pt-2 border-t border-purple-500/20 space-y-4">
          <p className="text-slate-300">{tLocalized({ es: 'Consumí datasets desde tus scripts de Python, notebooks, etc:', en: 'Consume datasets from your Python scripts, notebooks, etc:', pt: 'Consuma datasets dos seus scripts Python, notebooks, etc:' })}</p>
          
          {/* Credenciales del usuario */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Key className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-emerald-300 font-medium mb-2">
                  {tLocalized({ es: '🔐 Tus credenciales de API', en: '🔐 Your API credentials', pt: '🔐 Suas credenciais de API' })}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg px-3 py-2">
                    <span className="text-slate-400 text-sm w-16">Email:</span>
                    <code className="text-cyan-400 flex-1 text-sm">{userEmail}</code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(userEmail);
                      }}
                      className="p-1 hover:bg-slate-700 rounded"
                      title="Copiar"
                    >
                      <Copy className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg px-3 py-2">
                    <span className="text-slate-400 text-sm w-16">API Key:</span>
                    <code className="text-emerald-400 flex-1 text-sm font-mono">{userApiKey || '...'}</code>
                    <button
                      onClick={() => {
                        if (userApiKey) navigator.clipboard.writeText(userApiKey);
                      }}
                      className="p-1 hover:bg-slate-700 rounded"
                      title="Copiar"
                    >
                      <Copy className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>
                <p className="text-slate-500 text-xs mt-2">
                  {tLocalized({ 
                    es: 'Usá estas credenciales en tus scripts. No compartas tu API Key.', 
                    en: 'Use these credentials in your scripts. Do not share your API Key.', 
                    pt: 'Use essas credenciais em seus scripts. Não compartilhe sua API Key.' 
                  })}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <p className="text-slate-500"># Python example</p>
            <p className="text-emerald-400">import requests</p>
            <p className="text-white mt-2">response = requests.get(</p>
            <p className="text-yellow-400 ml-4">"{apiInfo.baseUrl}?email=<span className="text-cyan-400">{userEmail}</span>&key=<span className="text-emerald-400">{userApiKey || 'TU_API_KEY'}</span>&type=ecommerce&rows=1000"</p>
            <p className="text-white">)</p>
            <p className="text-white">data = response.json()</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-400 mb-1">{tLocalized({ es: 'Tipos disponibles:', en: 'Available types:', pt: 'Tipos disponíveis:' })}</p>
              <ul className="text-slate-300 space-y-1">
                {datasets.map(d => (
                  <li key={d.id}><code className="text-purple-400">type={d.id}</code></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-slate-400 mb-1">{tLocalized({ es: 'Parámetros:', en: 'Parameters:', pt: 'Parâmetros:' })}</p>
              <ul className="text-slate-300 space-y-1">
                <li><code className="text-cyan-400">&email=tu@email.com</code> - {tLocalized({ es: 'Tu email', en: 'Your email', pt: 'Seu email' })}</li>
                <li><code className="text-emerald-400">&key=ds_xxx...</code> - {tLocalized({ es: 'Tu API Key', en: 'Your API Key', pt: 'Sua API Key' })}</li>
                <li><code className="text-blue-400">&type=ecommerce</code> - {tLocalized({ es: 'Tipo de dataset', en: 'Dataset type', pt: 'Tipo de dataset' })}</li>
                <li><code className="text-blue-400">&rows=1000</code> - {tLocalized({ es: 'Cantidad', en: 'Quantity', pt: 'Quantidade' })} (max {apiInfo.rateLimit.maxRowsPerRequest})</li>
                <li><code className="text-blue-400">&format=json|csv</code> - {tLocalized({ es: 'Formato', en: 'Format', pt: 'Formato' })}</li>
              </ul>
            </div>
          </div>
        </div>
      </details>

      {/* Dataset Selector */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">{tLocalized({ es: 'Seleccioná un dataset:', en: 'Select a dataset:', pt: 'Selecione um dataset:' })}</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {datasets.map((dataset) => {
            const isFree = isDatasetFree(dataset.id);
            const isLocked = !isFree;
            
            return (
            <button
              key={dataset.id}
              onClick={() => !isLocked && setSelectedDataset(dataset.id)}
              disabled={isLocked}
              className={`p-4 rounded-xl border text-left transition-all relative ${
                isLocked
                  ? 'bg-slate-800/30 border-slate-700/30 opacity-60 cursor-not-allowed'
                  : selectedDataset === dataset.id
                    ? 'bg-emerald-500/10 border-emerald-500/50'
                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              }`}
            >
              {isLocked && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-400 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Premium
                </div>
              )}
              {isFree && isFreeUser && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded text-xs text-emerald-400">
                  ✓ FREE
                </div>
              )}
              <div className="text-3xl mb-2">{dataset.icon}</div>
              <h4 className={`font-semibold ${isLocked ? 'text-slate-500' : 'text-white'}`}>{tLocalized(dataset.name)}</h4>
              <p className={`text-sm ${isLocked ? 'text-slate-600' : 'text-slate-400'}`}>{tLocalized(dataset.description)}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {dataset.fields.slice(0, 4).map((field, idx) => (
                  <span key={idx} className="text-xs bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded">{field.name}</span>
                ))}
                {dataset.fields.length > 4 && (
                  <span className="text-xs text-slate-500">+{dataset.fields.length - 4}</span>
                )}
              </div>
            </button>
          );
          })}
        </div>
      </div>

      {/* Generator Config */}
      {selectedDataset && (
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">{tLocalized({ es: 'Configuración', en: 'Configuration', pt: 'Configuração' })}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{tLocalized({ es: 'Filas (tabla principal)', en: 'Rows (main table)', pt: 'Linhas (tabela principal)' })}</label>
              <select value={rowCount} onChange={(e) => setRowCount(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white">
                <option value={100}>100 {tLocalized({ es: 'filas', en: 'rows', pt: 'linhas' })}</option>
                <option value={500}>500 {tLocalized({ es: 'filas', en: 'rows', pt: 'linhas' })}</option>
                <option value={1000}>1,000 {tLocalized({ es: 'filas', en: 'rows', pt: 'linhas' })}</option>
                <option value={5000}>5,000 {tLocalized({ es: 'filas', en: 'rows', pt: 'linhas' })} (max)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{tLocalized({ es: 'Formato descarga', en: 'Download format', pt: 'Formato de download' })}</label>
              <div className="flex gap-2">
                {(['csv', 'json'] as const).map((f) => (
                  <button key={f} onClick={() => setFormat(f)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                      format === f
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-slate-900 border-slate-700 text-slate-300'
                    }`}>
                    {f === 'csv' ? <Table className="w-4 h-4" /> : <FileJson className="w-4 h-4" />}
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-end">
              <button onClick={handleGenerate} disabled={generating}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                {generating ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> {tLocalized({ es: 'Generando...', en: 'Generating...', pt: 'Gerando...' })}</>
                ) : (
                  <><Zap className="w-4 h-4" /> {tLocalized({ es: 'Generar Dataset', en: 'Generate Dataset', pt: 'Gerar Dataset' })}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
          {error}
        </div>
      )}

      {/* Generated Data Results */}
      {generatedData && generatedData.tables && (
        <div className="space-y-4">
          {/* Success Header */}
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h4 className="text-emerald-400 font-medium flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  {tLocalized({ es: 'Dataset generado correctamente', en: 'Dataset generated successfully', pt: 'Dataset gerado com sucesso' })}
                </h4>
                <p className="text-slate-400 text-sm mt-1">{generatedData.description}</p>
              </div>
              <button
                onClick={downloadAllTables}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                {tLocalized({ es: 'Descargar Todo', en: 'Download All', pt: 'Baixar Tudo' })} ({Object.keys(generatedData.tables).length} {tLocalized({ es: 'archivos', en: 'files', pt: 'arquivos' })})
              </button>
            </div>
          </div>

          {/* Schema & Relationships */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
              <h5 className="text-white font-medium mb-2 text-sm">📊 {tLocalized({ es: 'Esquema de tablas', en: 'Table Schema', pt: 'Esquema de tabelas' })}</h5>
              <div className="space-y-2">
                {Object.entries(generatedData.schema).map(([table, columns]) => (
                  <div key={table} className="text-xs">
                    <span className="text-emerald-400 font-medium">{table}:</span>
                    <span className="text-slate-400 ml-2">{(columns as string[]).join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
              <h5 className="text-white font-medium mb-2 text-sm">🔗 {tLocalized({ es: 'Relaciones', en: 'Relationships', pt: 'Relacionamentos' })}</h5>
              <ul className="space-y-1">
                {generatedData.relationships.map((rel, idx) => (
                  <li key={idx} className="text-slate-400 text-xs font-mono">{rel}</li>
                  ))}
                </ul>
            </div>
          </div>

          {/* Table Tabs */}
          <div>
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
              {Object.keys(generatedData.tables).map((tableName) => (
                <button
                  key={tableName}
                  onClick={() => setSelectedTable(tableName)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    selectedTable === tableName
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {tableName} ({generatedData.tables[tableName].length})
                </button>
              ))}
            </div>

            {/* Selected Table Preview */}
            {selectedTable && generatedData.tables[selectedTable] && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">
                    {tLocalized({ es: 'Vista previa de', en: 'Preview of', pt: 'Visualização de' })} <span className="text-white font-medium">{selectedTable}</span>
                  </span>
                  <button
                    onClick={() => downloadTable(selectedTable)}
                    className="flex items-center gap-1 px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs hover:bg-slate-700 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    {format.toUpperCase()}
                  </button>
                </div>
                <div className="bg-slate-950 rounded-lg p-4 overflow-x-auto max-h-48">
                  <pre className="text-xs text-slate-400">
                    {JSON.stringify(generatedData.tables[selectedTable].slice(0, 3), null, 2)}
                    {generatedData.tables[selectedTable].length > 3 && 
                      '\n... y ' + (generatedData.tables[selectedTable].length - 3) + ' filas más'}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/30">
        <h3 className="text-lg font-semibold text-blue-400 mb-3">💡 {t('datasets.tips.title')}</h3>
        <ul className="space-y-2 text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: t('datasets.tips.tip1') }} />
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: t('datasets.tips.tip2') }} />
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: t('datasets.tips.tip3') }} />
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: t('datasets.tips.tip4') }} />
          </li>
        </ul>
      </div>

      {/* Suggest Dataset */}
      <DatasetSuggestionBox userEmail={userEmail} />
    </div>
  );
};
