'use client'

import {Modal} from "antd";
import AuthForm from "@/components/forms/auth-form";
import PartnerAttachInstruction from "@/components/partners/partner-attach-instruction";

// Модалки блока «Прикрепление компании». Вынесены из partner-detail в отдельный
// чанк: грузятся лениво только после первого клика по кнопке (antd Modal + форма
// авторизации не попадают в стартовый бандл страницы партнёра).
const PartnerAttachModals = ({
  isAuthModalActive,
  closeAuthModal,
  isInstructionModalActive,
  closeInstructionModal,
  companyName,
  chatId,
}) => {
  return (
    <>
      <Modal
        className="custom-modal"
        centered={true}
        open={isAuthModalActive}
        onCancel={closeAuthModal}
        footer={false}
      >
        <AuthForm onClose={closeAuthModal} />
      </Modal>
      <Modal
        className="custom-modal"
        centered={true}
        open={isInstructionModalActive}
        onCancel={closeInstructionModal}
        footer={false}
        width={'auto'}
      >
        <PartnerAttachInstruction companyName={companyName} chatId={chatId} />
      </Modal>
    </>
  );
};

export default PartnerAttachModals;
