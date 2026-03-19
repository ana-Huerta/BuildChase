import React, { useEffect, useRef, useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'

export default function ConfirmModal({
  isOpen,
  title = 'Confirmar acción',
  description = '',
  icon = null, // optional React node or string to choose default
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm = () => {},
  onCancel = () => {},
  closeOnBackdrop = true,
  loading = false,
  danger = true
}) {
  const [armed, setArmed] = useState(false) // require double-confirm
  const timerRef = useRef(null)
  const confirmBtnRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      setArmed(false)
      clearTimeout(timerRef.current)
    } else {
      // focus confirm button for accessibility
      setTimeout(() => confirmBtnRef.current?.focus(), 50)
    }
    return () => clearTimeout(timerRef.current)
  }, [isOpen])

  function handleBackdropClick(e) {
    if (!closeOnBackdrop) return
    if (e.target === e.currentTarget) {
      setArmed(false)
      onCancel()
    }
  }

  function handleCancel() {
    setArmed(false)
    onCancel()
  }

  function handleConfirm() {
    if (loading) return
    if (!armed) {
      setArmed(true)
      // auto-unarm after short timeout
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setArmed(false), 3500)
      return
    }
    // armed -> proceed
    setArmed(false)
    onConfirm()
  }

  if (!isOpen) return null

  return (
    <div
      className="modal-confirmation"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="modal-confirmation-backdrop" />

      <div className="modal-confirmation-panel-wrapper">
        <div className="modal-confirmation-panel">
          <div className="modal-confirmation-body">
            <div className="modal-confirmation-icon">
              {icon ? icon : (
                <div className="modal-confirmation-icon-default">
                  <AlertTriangle size={20} />
                </div>
              )}
            </div>

            <div className="modal-confirmation-content">
              <div className="modal-confirmation-header">
                <div>
                  <h3 className="modal-confirmation-title">{title}</h3>
                  {description ? <p className="modal-confirmation-desc">{description}</p> : null}
                </div>
                <button onClick={handleCancel} className="modal-confirmation-close">
                  <X size={18} />
                </button>
              </div>

              <div className="modal-confirmation-actions">
                <button
                  onClick={handleCancel}
                  className="modal-confirmation-btn modal-confirmation-btn-cancel"
                >
                  {cancelText}
                </button>

                <button
                  ref={confirmBtnRef}
                  onClick={handleConfirm}
                  disabled={loading}
                  className={`modal-confirmation-btn ${danger ? 'modal-confirmation-btn-danger' : 'modal-confirmation-btn-primary'}`}
                  aria-pressed={armed}
                >
                  {loading ? 'Cargando...' : armed ? `${confirmText} — haz clic de nuevo` : confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
