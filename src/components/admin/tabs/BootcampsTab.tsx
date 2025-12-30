import React from 'react';
import { 
  Users, CheckCircle, XCircle, DollarSign, Calendar, 
  Edit2, Trash2, UserPlus, MessageCircle, ExternalLink, Play
} from 'lucide-react';
import { BootcampStudent, renderFeedbackMarkdown } from '../types';

interface BootcampsTabProps {
  bootcampStudents: BootcampStudent[];
  bootcampFeedbacks: any[];
  loadingFeedbacks: boolean;
  showAddBootcampModal: boolean;
  showFeedbackModal: boolean;
  newBootcampStudent: any;
  editingBootcampStudent: BootcampStudent | null;
  feedbackForm: any;
  setShowAddBootcampModal: (show: boolean) => void;
  setShowFeedbackModal: (show: boolean) => void;
  setNewBootcampStudent: (student: any) => void;
  setEditingBootcampStudent: (student: BootcampStudent | null) => void;
  setFeedbackForm: (form: any) => void;
  handleAddBootcampStudent: () => void | Promise<void>;
  handleUpdateBootcampStudent: () => void | Promise<void>;
  handleDeleteBootcampStudent: (id: number, email: string, name: string) => void | Promise<void>;
  handleToggleDelivery: (studentId: number, deliveryIndex: number, completed: boolean) => void | Promise<void>;
  handleCreateFeedback: () => void | Promise<void>;
  handleDeleteFeedback: (id: number) => void | Promise<void>;
}

export const BootcampsTab: React.FC<BootcampsTabProps> = ({
  bootcampStudents,
  bootcampFeedbacks,
  loadingFeedbacks,
  showAddBootcampModal,
  showFeedbackModal,
  newBootcampStudent,
  editingBootcampStudent,
  feedbackForm,
  setShowAddBootcampModal,
  setShowFeedbackModal,
  setNewBootcampStudent,
  setEditingBootcampStudent,
  setFeedbackForm,
  handleAddBootcampStudent,
  handleUpdateBootcampStudent,
  handleDeleteBootcampStudent,
  handleToggleDelivery,
  handleCreateFeedback,
  handleDeleteFeedback
}) => {
  return (
    <div className="space-y-6">
      {/* Header con stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-emerald-500" />
            <div>
              <div className="text-2xl font-bold text-white">{bootcampStudents.length}</div>
              <div className="text-slate-400 text-sm">Total Estudiantes</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
            <div>
              <div className="text-2xl font-bold text-white">
                {bootcampStudents.filter(s => s.payment_status === 'paid').length}
              </div>
              <div className="text-slate-400 text-sm">Pagos Completos</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-amber-500" />
            <div>
              <div className="text-2xl font-bold text-white">
                ${bootcampStudents.reduce((sum, s) => sum + (s.amount_paid || 0), 0).toLocaleString()}
              </div>
              <div className="text-slate-400 text-sm">Total Recaudado</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-violet-500" />
            <div>
              <div className="text-2xl font-bold text-white">
                Ed. {Math.max(...bootcampStudents.map(s => s.edition), 1)}
              </div>
              <div className="text-slate-400 text-sm">Última Edición</div>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowAddBootcampModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Agregar Estudiante
        </button>
        <button
          onClick={() => {
            setFeedbackForm({ student_email: '', edition: 1, feedback_text: '', video_url: '' });
            setShowFeedbackModal(true);
          }}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Nueva Devolución
        </button>
      </div>

      {/* Tabla de estudiantes */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr className="text-left text-slate-400 text-sm">
                <th className="p-4">Estudiante</th>
                <th className="p-4">Edición</th>
                <th className="p-4">Pago</th>
                <th className="p-4">Entregas</th>
                <th className="p-4">Acceso</th>
                <th className="p-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bootcampStudents.map(student => (
                <tr key={student.id} className="border-t border-slate-700/50 hover:bg-slate-800/50">
                  <td className="p-4">
                    <div>
                      <div className="text-white font-medium">{student.name}</div>
                      <div className="text-slate-400 text-sm">{student.email}</div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">#{student.edition}</td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium inline-block w-fit ${
                        student.payment_status === 'paid' ? 'bg-emerald-500/20 text-emerald-400' :
                        student.payment_status === 'partial' ? 'bg-amber-500/20 text-amber-400' :
                        student.payment_status === 'invited' ? 'bg-violet-500/20 text-violet-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {student.payment_status === 'paid' ? 'Pagado' :
                         student.payment_status === 'partial' ? 'Parcial' :
                         student.payment_status === 'invited' ? 'Invitado' : 'Pendiente'}
                      </span>
                      <span className="text-xs text-slate-400">
                        ${student.amount_paid}/${student.amount_total}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {student.deliveries.map((done, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleToggleDelivery(student.id, idx, !done)}
                          className={`w-6 h-6 rounded text-xs font-medium transition-colors ${
                            done 
                              ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' 
                              : 'bg-slate-700 text-slate-500 hover:bg-slate-600'
                          }`}
                          title={`Entrega ${idx + 1}`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    {student.has_platform_access ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingBootcampStudent(student);
                          setNewBootcampStudent({
                            email: student.email,
                            name: student.name,
                            edition: student.edition,
                            amount_paid: student.amount_paid,
                            amount_total: student.amount_total,
                            payment_status: student.payment_status,
                            has_platform_access: student.has_platform_access,
                            notes: student.notes || ''
                          });
                          setShowAddBootcampModal(true);
                        }}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBootcampStudent(student.id, student.email, student.name)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sección de Devoluciones */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-violet-400" />
          Devoluciones Personalizadas
        </h3>
        
        {loadingFeedbacks ? (
          <div className="text-center py-8 text-slate-400">Cargando...</div>
        ) : bootcampFeedbacks.length === 0 ? (
          <div className="text-center py-8 text-slate-400">No hay devoluciones aún</div>
        ) : (
          <div className="space-y-4">
            {bootcampFeedbacks.map(feedback => (
              <div key={feedback.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-white font-medium">{feedback.student_email}</div>
                    <div className="text-slate-400 text-sm">Edición #{feedback.edition}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {feedback.video_url && (
                      <a
                        href={feedback.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors"
                        title="Ver video"
                      >
                        <Play className="w-4 h-4" />
                      </a>
                    )}
                    <a
                      href={`/bootcamp/feedback/${feedback.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                      title="Ver página pública"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => {
                        if (window.confirm('¿Eliminar esta devolución?')) {
                          handleDeleteFeedback(feedback.id);
                        }
                      }}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div 
                  className="prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderFeedbackMarkdown(feedback.feedback_text?.substring(0, 200) + '...') }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Agregar/Editar Estudiante */}
      {showAddBootcampModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingBootcampStudent ? 'Editar Estudiante' : 'Agregar Estudiante'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={newBootcampStudent.email}
                  onChange={(e) => setNewBootcampStudent({ ...newBootcampStudent, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  placeholder="email@ejemplo.com"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Nombre</label>
                <input
                  type="text"
                  value={newBootcampStudent.name}
                  onChange={(e) => setNewBootcampStudent({ ...newBootcampStudent, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  placeholder="Nombre completo"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Edición</label>
                  <input
                    type="number"
                    value={newBootcampStudent.edition}
                    onChange={(e) => setNewBootcampStudent({ ...newBootcampStudent, edition: parseInt(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Estado Pago</label>
                  <select
                    value={newBootcampStudent.payment_status}
                    onChange={(e) => setNewBootcampStudent({ ...newBootcampStudent, payment_status: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="pending">Pendiente</option>
                    <option value="partial">Parcial</option>
                    <option value="paid">Pagado</option>
                    <option value="invited">Invitado</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Monto Pagado</label>
                  <input
                    type="number"
                    value={newBootcampStudent.amount_paid}
                    onChange={(e) => setNewBootcampStudent({ ...newBootcampStudent, amount_paid: parseInt(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Monto Total</label>
                  <input
                    type="number"
                    value={newBootcampStudent.amount_total}
                    onChange={(e) => setNewBootcampStudent({ ...newBootcampStudent, amount_total: parseInt(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                    min="0"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="has_platform_access"
                  checked={newBootcampStudent.has_platform_access}
                  onChange={(e) => setNewBootcampStudent({ ...newBootcampStudent, has_platform_access: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700"
                />
                <label htmlFor="has_platform_access" className="text-sm text-slate-300">
                  Acceso a plataforma
                </label>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Notas</label>
                <textarea
                  value={newBootcampStudent.notes}
                  onChange={(e) => setNewBootcampStudent({ ...newBootcampStudent, notes: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-20"
                  placeholder="Notas adicionales..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddBootcampModal(false);
                  setEditingBootcampStudent(null);
                  setNewBootcampStudent({
                    email: '', name: '', edition: 1, amount_paid: 0, amount_total: 149,
                    payment_status: 'pending', has_platform_access: false, notes: ''
                  });
                }}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={editingBootcampStudent ? handleUpdateBootcampStudent : handleAddBootcampStudent}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                {editingBootcampStudent ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Feedback */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">Nueva Devolución</h3>
            <div className="grid grid-cols-2 gap-6">
              {/* Formulario */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Email del estudiante</label>
                  <select
                    value={feedbackForm.student_email}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, student_email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="">Seleccionar estudiante...</option>
                    {bootcampStudents.map(s => (
                      <option key={s.id} value={s.email}>{s.name} ({s.email})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Edición</label>
                  <input
                    type="number"
                    value={feedbackForm.edition}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, edition: parseInt(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">URL del video (opcional)</label>
                  <input
                    type="url"
                    value={feedbackForm.video_url}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, video_url: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Feedback (Markdown)</label>
                  <textarea
                    value={feedbackForm.feedback_text}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, feedback_text: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-64 font-mono text-sm"
                    placeholder="# Título&#10;&#10;Tu feedback aquí... Soporta **negrita**, *cursiva*, `código` y más."
                  />
                </div>
              </div>
              {/* Preview */}
              <div>
                <label className="block text-sm text-slate-400 mb-1">Preview</label>
                <div 
                  className="bg-slate-900 border border-slate-700 rounded-lg p-4 h-[400px] overflow-y-auto prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderFeedbackMarkdown(feedbackForm.feedback_text) }}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateFeedback}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
              >
                Crear Devolución
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BootcampsTab;

