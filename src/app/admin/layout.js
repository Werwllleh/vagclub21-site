import Container from "@/components/container";
import AdminNav from "@/components/admin/admin-nav";
import AdminSection from "@/components/admin/admin-section";

export const metadata = {
  title: 'Админка VAGCLUB21',
  robots: {index: false, follow: false},
};

const AdminLayout = ({children}) => {
  return (
    <AdminSection className="page ppt ppb">
      <Container>
        <AdminNav/>
        {children}
      </Container>
    </AdminSection>
  );
};

export default AdminLayout;
