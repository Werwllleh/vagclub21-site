'use client'
import {Modal} from "antd";
import PartnerForm from "@/components/forms/partner-form";
import AuthForm from "@/components/forms/auth-form";

// Модалки баннера партнёрства. Вынесены из partner-banner в отдельный чанк:
// грузятся лениво только после первого клика по кнопке (antd Modal + формы
// не попадают в стартовый бандл публичных страниц)
const PartnerBannerModals = ({
  isCompanyFormModalActive,
  closeCompanyFormModal,
  isAuthModalActive,
  closeAuthModal,
}) => {
  return (
    <>
      <Modal
        className="custom-modal"
        centered={true}
        open={isCompanyFormModalActive}
        onCancel={closeCompanyFormModal}
        footer={false}
        width={'auto'}
      >
        <PartnerForm onClose={closeCompanyFormModal} />
      </Modal>
      <Modal
        className="custom-modal"
        centered={true}
        open={isAuthModalActive}
        onCancel={closeAuthModal}
        footer={false}
      >
        <AuthForm onClose={closeAuthModal} />
      </Modal>
    </>
  );
};

export default PartnerBannerModals;
