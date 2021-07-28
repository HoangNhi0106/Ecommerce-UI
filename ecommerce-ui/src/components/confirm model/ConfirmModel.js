import React, { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useConfirm from '../../hooks/useConfirm';
import { ConfirmContext } from '../../store/ConfirmContext';
import './ConfirmModel.css'


const ConfirmModel = (props) => {
    const { onConfirm, onCancel } = useConfirm();
    const {state} = useContext(ConfirmContext);

    const portalElement = document.getElementById('portal');
    const component = state.show ? (
        <div className="portal-overlay">
            <div className="confirm-dialog">
                <p>{state?.text && state.text}</p>
                <div className="confirm-dialog__footer">
                    <button className="btn" onClick={onConfirm}>
                        Yes
                    </button>
                    <button className="btn" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    ) : null;

    return createPortal(component, portalElement);
};
export default ConfirmModel;