import "./module.css"
import { createModalLink } from '@/hooks/useCommon';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ModalType } from "@/types/modal";

const ModalPopUp: React.FC<ModalType> = ({ img, name, modalType }) => {
    const [ modalId, setModalId ] = useState('');
    const t                       = useTranslations('cards');

    function handleClick (): void {
        var modal = document.getElementById(modalId);

        if (modal != null) {
            modal.style.display = "block";
        }
    }

    // When the user clicks on <span> (x), close the modal
    function handleCloseClick (): void {
        var modal = document.getElementById(modalId);

        if (modal != null) {
            modal.style.display = "none";
        }
    }

    document.addEventListener('mousedown', handleCloseClick);

    useEffect(() => {
        setModalId(createModalLink(name, modalType));

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleCloseClick);
        };
    }, []);

    return (
        <section>
            <div className="pointer" onClick={() => handleClick()}>
                <img src={img} className="cardImgUrl" height="27" width="20" />
            </div>
            <div id={createModalLink(name, modalType)} className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close pointer bg-red" onClick={() => handleCloseClick()}>{t("modal.Close")}</span>
                    </div>

                    <div className="modal-body">
                        <img src={img} className="left" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ModalPopUp;